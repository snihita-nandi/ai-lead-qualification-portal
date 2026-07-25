// Site-wide configuration constants

export const siteConfig = {
  name: 'AI Lead Qualification Portal',
  shortName: 'LeadIQ',
  description:
    'Intelligent lead qualification powered by AI — score, prioritize, and convert your best prospects.',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  version: '1.0.0',
} as const;

export type SiteConfig = typeof siteConfig;
