import { z } from 'zod';

// ─── Page visit ───────────────────────────────────────────────────────────────

export const pageVisitSchema = z.object({
  path: z.string(),
  title: z.string(),
  visitedAt: z.string().datetime(), // ISO 8601
  durationSeconds: z.number().min(0),
});

export type PageVisit = z.infer<typeof pageVisitSchema>;

// ─── Payload specification (Phase 1) ─────────────────────────────────────────

export const leadPayloadSchema = z.object({
  schemaVersion: z.literal('1.0'),
  requestId: z.string(),
  submittedAt: z.string().datetime(),
  source: z.object({
    url: z.string(),
    title: z.string(),
  }),
  visitor: z.object({
    fullName: z.string().min(2).max(80),
    workEmail: z.string().email(),
    company: z.string().min(2).max(120),
    designation: z.string().max(80).optional(),
    phone: z.string().max(40).optional(),
    companySize: z.string().optional(),
  }),
  inquiry: z.object({
    message: z.string().min(20).max(1500),
  }),
  journey: z.array(pageVisitSchema).max(10), // Limit to a reasonable max array size
  attribution: z.object({
    referrer: z.string(),
    userAgent: z.string(),
    sessionId: z.string(),
  }),
  consent: z.object({
    timestamp: z.string().datetime(),
    version: z.string(),
  }),
});

export type LeadPayload = z.infer<typeof leadPayloadSchema>;

// ─── Company size options ─────────────────────────────────────────────────────

export const COMPANY_SIZE_OPTIONS = [
  { value: '1-10',    label: '1 – 10'       },
  { value: '11-50',   label: '11 – 50'      },
  { value: '51-200',  label: '51 – 200'     },
  { value: '201-500', label: '201 – 500'    },
  { value: '501-1000',label: '501 – 1,000'  },
  { value: '1000+',   label: '1,000+'       },
] as const;

// ─── Zod validation schema ────────────────────────────────────────────────────

export const leadFormSchema = z.object({
  // Required
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name must be under 80 characters')
    .transform((v) => v.trim()),

  workEmail: z
    .string()
    .email('Please enter a valid work email')
    .transform((v) => v.trim().toLowerCase()),

  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(120, 'Company name must be under 120 characters')
    .transform((v) => v.trim()),

  message: z
    .string()
    .min(20, 'Please describe your enquiry in at least 20 characters')
    .max(1500, 'Message must be under 1,500 characters')
    .transform((v) => v.trim()),

  consent: z.literal(true, {
    message: 'You must agree to continue',
  }),

  // Optional
  designation: z
    .string()
    .max(80, 'Designation must be under 80 characters')
    .transform((v) => v.trim())
    .optional()
    .or(z.literal('')),

  phone: z
    .string()
    .regex(
      /^\+?[\d\s\-().]{7,20}$/,
      'Please enter a valid phone number'
    )
    .optional()
    .or(z.literal('')),

  companySize: z.string().optional().or(z.literal('')),

  // Honeypot — must be empty
  _hp: z.string().max(0).optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
