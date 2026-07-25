'use client';

import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AssessmentFormData } from '@/types/assessment';
import {
  COMPANY_SIZES,
  PRIMARY_GOALS,
  BUDGET_RANGES,
  TIMELINES,
} from '@/lib/assessment-options';

interface ReviewStepProps {
  onEditStep: (step: number) => void;
}

interface ReviewCardProps {
  title: string;
  stepIndex: number;
  onEdit: (step: number) => void;
  rows: { label: string; value: string | undefined }[];
}

function ReviewCard({ title, stepIndex, onEdit, rows }: ReviewCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card">
      {/* Card header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <button
          type="button"
          onClick={() => onEdit(stepIndex)}
          className={cn(
            'flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground',
            'transition-colors hover:bg-muted hover:text-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
          )}
          aria-label={`Edit ${title}`}
        >
          <Pencil className="size-3" />
          Edit
        </button>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex justify-between gap-4 px-5 py-3">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {label}
            </span>
            <span className="text-right text-sm text-foreground">
              {value || <span className="italic text-muted-foreground">—</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Label helpers ────────────────────────────────────────────────────────────

function sizeLabel(val: string) {
  return COMPANY_SIZES.find((s) => s.value === val)?.label ?? val;
}

function goalLabel(val: string) {
  return PRIMARY_GOALS.find((g) => g.value === val)?.label ?? val;
}

function budgetLabel(val: string) {
  return BUDGET_RANGES.find((b) => b.value === val)?.label ?? val;
}

function timelineLabel(val: string) {
  return TIMELINES.find((t) => t.value === val)?.label ?? val;
}

function decisionLabel(val: string) {
  const map: Record<string, string> = {
    yes: 'Yes — final decision maker',
    shared: 'Shared decision',
    no: 'No — evaluating options',
  };
  return map[val] ?? val;
}

// ─── ReviewStep ───────────────────────────────────────────────────────────────

export function ReviewStep({ onEditStep }: ReviewStepProps) {
  const { getValues } = useFormContext<AssessmentFormData>();
  const data = getValues();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-4"
      aria-label="Review your assessment"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Review</h2>
        <p className="text-sm text-muted-foreground">
          Confirm everything looks correct before submitting.
        </p>
      </div>

      <ReviewCard
        title="About You"
        stepIndex={1}
        onEdit={onEditStep}
        rows={[
          { label: 'Name',    value: data.fullName    },
          { label: 'Email',   value: data.workEmail   },
          { label: 'Company', value: data.companyName },
          { label: 'Title',   value: data.jobTitle    },
        ]}
      />

      <ReviewCard
        title="Company Snapshot"
        stepIndex={2}
        onEdit={onEditStep}
        rows={[
          { label: 'Industry',      value: data.industry   },
          { label: 'Company size',  value: sizeLabel(data.companySize)  },
          { label: 'Country',       value: data.country    },
        ]}
      />

      <ReviewCard
        title="Business Discovery"
        stepIndex={3}
        onEdit={onEditStep}
        rows={[
          { label: 'Primary goal',  value: goalLabel(data.primaryGoal)      },
          { label: 'Challenge',     value: data.biggestChallenge            },
          { label: 'Tools',         value: data.currentTools || 'Not specified' },
        ]}
      />

      <ReviewCard
        title="Project Details"
        stepIndex={4}
        onEdit={onEditStep}
        rows={[
          { label: 'Budget',           value: budgetLabel(data.budget)            },
          { label: 'Timeline',         value: timelineLabel(data.timeline)        },
          { label: 'Decision maker',   value: decisionLabel(data.isDecisionMaker) },
        ]}
      />
    </motion.div>
  );
}
