import { z } from 'zod';

// ─── Step schemas ─────────────────────────────────────────────────────────────

export const aboutYouSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  workEmail: z.string().email('Please enter a valid work email'),
  companyName: z.string().min(1, 'Company name is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
});

export const companySnapshotSchema = z.object({
  industry: z.string().min(1, 'Please select an industry'),
  companySize: z.string().min(1, 'Please select a company size'),
  country: z.string().min(1, 'Please select a country'),
});

export const businessDiscoverySchema = z.object({
  primaryGoal: z.string().min(1, 'Please select a primary goal'),
  biggestChallenge: z
    .string()
    .min(20, 'Please describe your challenge in at least 20 characters'),
  currentTools: z.string().optional(),
});

export const projectDetailsSchema = z.object({
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  isDecisionMaker: z.enum(['yes', 'no', 'shared']).refine(
    (v) => v !== undefined,
    { message: 'Please select an option' }
  ),
});

// ─── Full schema (union of all steps) ────────────────────────────────────────

export const assessmentSchema = aboutYouSchema
  .merge(companySnapshotSchema)
  .merge(businessDiscoverySchema)
  .merge(projectDetailsSchema);

// ─── Inferred types ───────────────────────────────────────────────────────────

export type AboutYouData = z.infer<typeof aboutYouSchema>;
export type CompanySnapshotData = z.infer<typeof companySnapshotSchema>;
export type BusinessDiscoveryData = z.infer<typeof businessDiscoverySchema>;
export type ProjectDetailsData = z.infer<typeof projectDetailsSchema>;
export type AssessmentFormData = z.infer<typeof assessmentSchema>;

// ─── Step configuration ───────────────────────────────────────────────────────

export const TOTAL_STEPS = 5; // 1-indexed, excludes Welcome + Review + Success

export interface StepMeta {
  index: number;       // 1-based step number
  id: string;
  title: string;
  description: string;
}

export const STEP_META: StepMeta[] = [
  { index: 1, id: 'about-you',           title: 'About You',           description: 'Let us know who you are'                    },
  { index: 2, id: 'company-snapshot',    title: 'Company Snapshot',    description: 'Tell us about your organisation'            },
  { index: 3, id: 'business-discovery',  title: 'Business Discovery',  description: 'Describe your goals and current challenges' },
  { index: 4, id: 'project-details',     title: 'Project Details',     description: 'Budget, timeline and decision authority'    },
  { index: 5, id: 'review',              title: 'Review',              description: 'Confirm your submission'                    },
];
