// Application-wide constants

export const PAGINATION_DEFAULTS = {
  page: 1,
  pageSize: 20,
} as const;

export const LEAD_SCORE_THRESHOLDS = {
  high: 80,
  medium: 50,
  low: 0,
} as const;

export const API_ROUTES = {
  leads: '/api/leads',
  qualify: '/api/qualify',
} as const;

export const QUERY_KEYS = {
  leads: 'leads',
  lead: 'lead',
  analytics: 'analytics',
  qualification: 'qualification',
} as const;
