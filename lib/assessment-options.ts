// Assessment option lists — all option data lives here, not inside components.

export const INDUSTRIES = [
  'Advertising & Marketing',
  'Aerospace & Defence',
  'Agriculture',
  'Architecture & Engineering',
  'Automotive',
  'Banking & Financial Services',
  'Biotechnology',
  'Construction',
  'Consulting & Professional Services',
  'Consumer Goods',
  'Education & E-Learning',
  'Energy & Utilities',
  'Entertainment & Media',
  'Government & Public Sector',
  'Healthcare & Life Sciences',
  'Hospitality & Travel',
  'Human Resources & Staffing',
  'Information Technology',
  'Insurance',
  'Legal Services',
  'Logistics & Supply Chain',
  'Manufacturing',
  'Non-Profit',
  'Real Estate',
  'Retail & E-Commerce',
  'Telecommunications',
  'Other',
] as const;

export type Industry = (typeof INDUSTRIES)[number];

export const COMPANY_SIZES = [
  { value: '1-10',       label: '1 – 10',       sublabel: 'Startup'      },
  { value: '11-50',      label: '11 – 50',      sublabel: 'Small'        },
  { value: '51-200',     label: '51 – 200',     sublabel: 'Growing'      },
  { value: '201-500',    label: '201 – 500',    sublabel: 'Mid-market'   },
  { value: '501-1000',   label: '501 – 1,000',  sublabel: 'Scale-up'     },
  { value: '1001-5000',  label: '1,001 – 5,000', sublabel: 'Enterprise'  },
  { value: '5001+',      label: '5,001+',       sublabel: 'Large Ent.'   },
] as const;

export const COUNTRIES = [
  'Australia', 'Brazil', 'Canada', 'China', 'France',
  'Germany', 'India', 'Indonesia', 'Israel', 'Italy',
  'Japan', 'Mexico', 'Netherlands', 'New Zealand', 'Nigeria',
  'Poland', 'Saudi Arabia', 'Singapore', 'South Africa', 'South Korea',
  'Spain', 'Sweden', 'Turkey', 'Ukraine', 'United Arab Emirates',
  'United Kingdom', 'United States', 'Vietnam', 'Other',
] as const;

export type Country = (typeof COUNTRIES)[number];

export const PRIMARY_GOALS = [
  { value: 'increase-revenue',       label: 'Increase Revenue',       description: 'Grow top-line through new channels or customers'     },
  { value: 'reduce-costs',           label: 'Reduce Costs',           description: 'Improve margins through automation or efficiency'    },
  { value: 'improve-operations',     label: 'Improve Operations',     description: 'Streamline processes and reduce manual work'         },
  { value: 'enter-new-market',       label: 'Enter a New Market',     description: 'Expand into new verticals or geographies'           },
  { value: 'improve-customer-exp',   label: 'Improve Customer Experience', description: 'Enhance how customers interact with the business'  },
  { value: 'digital-transformation', label: 'Digital Transformation', description: 'Modernise legacy infrastructure and workflows'       },
] as const;

export type PrimaryGoal = (typeof PRIMARY_GOALS)[number]['value'];

export const BUDGET_RANGES = [
  { value: 'under-10k',    label: 'Under $10k'       },
  { value: '10k-25k',      label: '$10k – $25k'      },
  { value: '25k-50k',      label: '$25k – $50k'      },
  { value: '50k-100k',     label: '$50k – $100k'     },
  { value: '100k-250k',    label: '$100k – $250k'    },
  { value: '250k-500k',    label: '$250k – $500k'    },
  { value: '500k-plus',    label: '$500k+'           },
  { value: 'not-defined',  label: 'Not yet defined'  },
] as const;

export type BudgetRange = (typeof BUDGET_RANGES)[number]['value'];

export const TIMELINES = [
  { value: 'immediate',   label: 'Immediate',    description: 'Within 30 days'     },
  { value: '1-3-months',  label: '1 – 3 months', description: 'Near-term priority' },
  { value: '3-6-months',  label: '3 – 6 months', description: 'Mid-term planning'  },
  { value: '6-12-months', label: '6 – 12 months', description: 'Longer horizon'    },
  { value: '12-plus',     label: '12+ months',   description: 'Exploratory'        },
] as const;

export type Timeline = (typeof TIMELINES)[number]['value'];
