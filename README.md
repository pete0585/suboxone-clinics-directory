# Suboxone Clinic Finder

National directory of suboxone clinics and medication-assisted treatment (MAT) providers.

**Domain:** suboxoneclinicfinder.com  
**Stack:** Next.js 15.3.9, TypeScript, Tailwind CSS, Supabase, Stripe, Vercel  
**Supabase project:** fbuqrnzofktepkzyfmhy (Directories)  
**Tables:** `suboxone_listings`, `suboxone_claims`, `suboxone_payments`, `suboxone_leads`

## Revenue Model

- **Verified listing:** $249/yr — priority placement, insurance details, verified badge
- **Featured listing:** $499/yr — top-of-results, newsletter inclusion, featured badge

## Local Setup

```bash
npm install
cp .env.example .env.local
# Fill in all env vars
npm run dev
```

## Supabase Setup

Apply the migration to create all tables:

```bash
# Using Supabase MCP or the CLI:
supabase db push --db-url $DATABASE_URL
# OR apply supabase/migrations/001_initial_schema.sql manually
```

## Vercel Deployment

All env vars are set automatically by the bootstrap agent. If deploying manually:

```bash
# Required env vars (see .env.example):
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_VERIFIED_PRICE_ID    # Verified plan — $249/yr
STRIPE_FEATURED_PRICE_ID    # Featured plan — $499/yr
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
NEXT_PUBLIC_SITE_URL=https://www.suboxoneclinicfinder.com
ADMIN_EMAIL=adam@thestrategicveteran.com
INBOUND_WEBHOOK_SECRET
```

## Data Sources

1. **SAMHSA OTP Directory** — https://dpt2.samhsa.gov/treatment/directory.aspx (~1,800 OTPs)
2. **DataForSEO Maps** — "suboxone clinic" across top 200 US cities
3. **NPPES bulk download** — Addiction medicine taxonomy codes (207LA0401X, 2084A0401X)

See `scripts/seed.ts` for the seed script. Use the `data-seeder` agent for production seeding.

## Stripe Webhook

Set Stripe webhook endpoint to: `https://www.suboxoneclinicfinder.com/api/webhooks/stripe`

Events to enable:
- `checkout.session.completed`
- `customer.subscription.deleted`
- `invoice.payment_failed`

## Inbound Email Webhook

Resend inbound webhook: `https://www.suboxoneclinicfinder.com/api/inbound-email`

**Critical:** Use the www subdomain. Non-www redirects with 307 and Resend doesn't follow redirects.

## URL Structure

- `/` — Homepage with search
- `/suboxone-clinics` — Browse all with filters
- `/suboxone-clinics/[state]` — State hub page (SEO)
- `/suboxone-clinics/[state]/[city]` — City page (primary SEO target)
- `/clinic/[slug]` — Individual clinic detail
- `/submit` — Add your clinic
- `/claim/[id]` — Claim a listing
- `/admin` — Admin panel (protected)
