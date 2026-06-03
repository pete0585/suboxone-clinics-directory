export type ListingTier = 'free' | 'verified' | 'featured'

export interface SuboxoneListing {
  id: string
  slug: string
  clinic_name: string
  npi_number?: string | null
  address?: string | null
  city: string
  state: string
  zip?: string | null
  phone?: string | null
  website_url?: string | null
  email?: string | null
  email_source?: string | null
  bio?: string | null
  photo_url?: string | null
  is_otp: boolean
  dea_registration?: string | null
  insurances_accepted?: string[] | null
  accepts_medicaid: boolean
  accepts_medicare: boolean
  accepts_self_pay: boolean
  telehealth_available: boolean
  accepting_new_patients?: boolean | null
  walk_in_available: boolean
  sliding_scale: boolean
  services_offered?: string[] | null
  listing_tier: ListingTier
  listing_tier_rank: number
  is_active: boolean
  is_approved: boolean
  stripe_customer_id?: string | null
  stripe_subscription_id?: string | null
  plan_expires_at?: string | null
  claimed: boolean
  claimed_at?: string | null
  outreach_step: number
  outreach_sent_at?: string | null
  created_at: string
  updated_at: string
}

export interface SuboxoneClaim {
  id: string
  listing_id: string
  email: string
  token: string
  verified: boolean
  verified_at?: string | null
  created_at: string
  expires_at: string
  nudge_sent_at?: string | null
}

export interface SuboxonePayment {
  id: string
  listing_id: string
  stripe_session_id?: string | null
  stripe_customer_id?: string | null
  stripe_subscription_id?: string | null
  amount: number
  currency: string
  tier: string
  status: string
  created_at: string
}

export interface BrowseFilters {
  city?: string
  state?: string
  medicaid?: boolean
  medicare?: boolean
  telehealth?: boolean
  accepting?: boolean
  walkin?: boolean
  service?: string
  tier?: string
  q?: string
  page?: number
}
