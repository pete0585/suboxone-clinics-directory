-- Suboxone Clinic Finder — Initial Schema
-- All tables in the shared Directories Supabase project (fbuqrnzofktepkzyfmhy)

-- Drop bootstrap-generated tables if they exist (bootstrap creates generic schema)
DROP TABLE IF EXISTS suboxone_clinics_reviews CASCADE;
DROP TABLE IF EXISTS suboxone_clinics_payments CASCADE;
DROP TABLE IF EXISTS suboxone_clinics_claims CASCADE;
DROP TABLE IF EXISTS suboxone_clinics_listings CASCADE;

-- ============================================================
-- suboxone_listings
-- ============================================================
CREATE TABLE IF NOT EXISTS suboxone_listings (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  npi_number            varchar,
  clinic_name           varchar NOT NULL,
  slug                  varchar UNIQUE NOT NULL,
  address               varchar,
  city                  varchar NOT NULL,
  state                 varchar(2) NOT NULL,
  zip                   varchar,
  phone                 varchar,
  website_url           varchar,
  email                 varchar,
  email_source          varchar,           -- 'samhsa', 'dataforseo', 'manual', 'self'
  bio                   text,
  photo_url             varchar,
  is_otp                boolean NOT NULL DEFAULT false,
  dea_registration      varchar,
  insurances_accepted   text[],
  accepts_medicaid      boolean NOT NULL DEFAULT false,
  accepts_medicare      boolean NOT NULL DEFAULT false,
  accepts_self_pay      boolean NOT NULL DEFAULT false,
  telehealth_available  boolean NOT NULL DEFAULT false,
  accepting_new_patients boolean,          -- null = unknown
  walk_in_available     boolean NOT NULL DEFAULT false,
  sliding_scale         boolean NOT NULL DEFAULT false,
  services_offered      text[],
  listing_tier          varchar NOT NULL DEFAULT 'free',
  listing_tier_rank     integer NOT NULL DEFAULT 0,
  is_active             boolean NOT NULL DEFAULT true,
  is_approved           boolean NOT NULL DEFAULT true,
  do_not_email          boolean NOT NULL DEFAULT false,
  stripe_customer_id    varchar,
  stripe_subscription_id varchar,
  plan_expires_at       timestamptz,
  claimed               boolean NOT NULL DEFAULT false,
  claimed_at            timestamptz,
  outreach_step         integer NOT NULL DEFAULT 0,
  outreach_sent_at      timestamptz,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS suboxone_listings_city ON suboxone_listings(city);
CREATE INDEX IF NOT EXISTS suboxone_listings_state ON suboxone_listings(state);
CREATE INDEX IF NOT EXISTS suboxone_listings_slug ON suboxone_listings(slug);
CREATE INDEX IF NOT EXISTS suboxone_listings_tier ON suboxone_listings(listing_tier);
CREATE INDEX IF NOT EXISTS suboxone_listings_medicaid ON suboxone_listings(accepts_medicaid) WHERE accepts_medicaid = true;
CREATE INDEX IF NOT EXISTS suboxone_listings_telehealth ON suboxone_listings(telehealth_available) WHERE telehealth_available = true;
CREATE INDEX IF NOT EXISTS suboxone_listings_accepting ON suboxone_listings(accepting_new_patients) WHERE accepting_new_patients = true;
CREATE INDEX IF NOT EXISTS suboxone_listings_city_state ON suboxone_listings(city, state);
CREATE INDEX IF NOT EXISTS suboxone_listings_outreach ON suboxone_listings(outreach_step, outreach_sent_at) WHERE claimed = false AND do_not_email = false;

-- Full text search
ALTER TABLE suboxone_listings ADD COLUMN IF NOT EXISTS search_vector tsvector;
CREATE INDEX IF NOT EXISTS suboxone_listings_search ON suboxone_listings USING GIN(search_vector);

CREATE OR REPLACE FUNCTION suboxone_listings_tsvector_trigger()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.clinic_name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.city, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.state, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.bio, '')), 'C');
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS suboxone_listings_tsvector ON suboxone_listings;
CREATE TRIGGER suboxone_listings_tsvector
  BEFORE INSERT OR UPDATE ON suboxone_listings
  FOR EACH ROW EXECUTE FUNCTION suboxone_listings_tsvector_trigger();

CREATE OR REPLACE FUNCTION update_suboxone_listings_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS suboxone_listings_updated_at ON suboxone_listings;
CREATE TRIGGER suboxone_listings_updated_at
  BEFORE UPDATE ON suboxone_listings
  FOR EACH ROW EXECUTE FUNCTION update_suboxone_listings_updated_at();

-- ============================================================
-- suboxone_claims
-- ============================================================
CREATE TABLE IF NOT EXISTS suboxone_claims (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id    uuid NOT NULL REFERENCES suboxone_listings(id) ON DELETE CASCADE,
  email         text NOT NULL,
  token         text UNIQUE NOT NULL,
  verified      boolean NOT NULL DEFAULT false,
  verified_at   timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now(),
  expires_at    timestamptz NOT NULL,
  nudge_sent_at timestamptz
);

CREATE INDEX IF NOT EXISTS suboxone_claims_listing ON suboxone_claims(listing_id);
CREATE INDEX IF NOT EXISTS suboxone_claims_token ON suboxone_claims(token);

-- ============================================================
-- suboxone_payments
-- ============================================================
CREATE TABLE IF NOT EXISTS suboxone_payments (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id              uuid NOT NULL REFERENCES suboxone_listings(id) ON DELETE CASCADE,
  stripe_session_id       varchar,
  stripe_customer_id      varchar,
  stripe_subscription_id  varchar,
  amount                  integer NOT NULL DEFAULT 0,
  currency                varchar NOT NULL DEFAULT 'usd',
  tier                    varchar NOT NULL,
  status                  varchar NOT NULL,
  created_at              timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS suboxone_payments_listing ON suboxone_payments(listing_id);

-- ============================================================
-- suboxone_leads (for lead gen partnerships with telehealth companies)
-- ============================================================
CREATE TABLE IF NOT EXISTS suboxone_leads (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id   uuid REFERENCES suboxone_listings(id) ON DELETE SET NULL,
  directory    varchar NOT NULL DEFAULT 'suboxone-clinics',
  from_page    varchar,
  name         varchar,
  email        varchar,
  phone        varchar,
  message      text,
  state        varchar(2),
  source       varchar,
  processed    boolean NOT NULL DEFAULT false,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- RLS Policies
-- ============================================================
ALTER TABLE suboxone_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE suboxone_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE suboxone_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE suboxone_leads ENABLE ROW LEVEL SECURITY;

-- Public read for active, approved listings
CREATE POLICY "suboxone_listings_public_read"
  ON suboxone_listings FOR SELECT
  USING (is_active = true AND is_approved = true);

-- Service role can do everything
CREATE POLICY "suboxone_listings_service_write"
  ON suboxone_listings FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "suboxone_claims_service"
  ON suboxone_claims FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "suboxone_payments_service"
  ON suboxone_payments FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "suboxone_leads_service"
  ON suboxone_leads FOR ALL
  USING (true)
  WITH CHECK (true);

-- Grants
GRANT ALL ON suboxone_listings TO service_role, anon, authenticated;
GRANT ALL ON suboxone_claims TO service_role, anon, authenticated;
GRANT ALL ON suboxone_payments TO service_role, anon, authenticated;
GRANT ALL ON suboxone_leads TO service_role, anon, authenticated;
