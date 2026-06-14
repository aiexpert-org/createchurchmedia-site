export const siteConfig = {
  brand: 'Create Church Media',
  shortBrand: 'CCM',
  domain: 'createchurchmedia.com',
  url: 'https://createchurchmedia.com',
  email: 'emily@createchurchmedia.com',
  phone: '317-502-7443',
  phoneTel: '+13175027443',
  city: 'Indianapolis',
  state: 'IN',
  designer: 'Emily Farmer',
  description:
    'Unlimited graphic design for churches on a monthly subscription. Designer Emily Farmer based in Indianapolis, IN.',
  pricing: {
    monthly: 997,
    annual: 9997,
  },
  bookingUrl: 'mailto:emily@createchurchmedia.com?subject=Booking%20a%20call%20with%20Emily',
} as const

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/subscription', label: 'Subscription' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/resources', label: 'Resources' },
] as const
