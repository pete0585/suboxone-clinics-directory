'use client'

import { Phone } from 'lucide-react'
import { formatPhone } from '@/lib/utils'

export function PhoneButton({ phone }: { phone: string }) {
  return (
    <a
      href={`tel:${phone}`}
      onClick={(e) => e.stopPropagation()}
      className="inline-flex items-center gap-2 px-4 py-2 bg-brand-teal text-white text-sm font-semibold rounded-lg hover:bg-brand-teal-dark transition-colors"
    >
      <Phone className="w-4 h-4" aria-label="Call" />
      {formatPhone(phone)}
    </a>
  )
}
