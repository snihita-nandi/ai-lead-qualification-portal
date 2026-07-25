'use client';

import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
interface PipelineStep {
  index: number;
  phase: string;
  heading: string;
  body: string;
  tags: string[];
  isCore?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STEPS: PipelineStep[] = [
  {
    index: 0,
    phase: '01 — Intake',
    heading: 'Structured assessment',
    body: 'The prospect completes a purposeful form. No generic fields. Every question is designed to surface budget, urgency, authority, and technical fit.',
    tags: ['BANT framework', 'Use case mapping', 'Intent signals'],
  },
  {
    index: 1,
    phase: '02 — Intelligence',
    heading: 'Gemini extracts meaning',
    body: 'Raw answers pass through a Gemini AI pipeline. The model identifies intent, parses company context, extracts numeric signals, and scores the lead against qualification criteria.',
    tags: ['LLM entity extraction', 'Lead scoring matrix', 'Budget inference'],
    isCore: true,
  },
  {
    index: 2,
    phase: '03 — Delivery',
    heading: 'Sales team receives a profile',
    body: 'A structured lead profile is logged to Google Sheets and delivered via Gmail. The account executive opens a pre-scored, pre-routed brief — not a raw form submission.',
    tags: ['Google Sheets sync', 'Gmail notification', 'AE routing'],
  },
];

// ─── Framer Motion ────────────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const stepVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Single step card ─────────────────────────────────────────────────────────
function PipelineCard({ step }: { step: PipelineStep }) {
  return (
    <motion.article
      variants={stepVariants}
      className={cn(
        'relative flex flex-col gap-5 rounded-2xl border p-7 transition-colors',
        step.isCore
          ? 'border-primary/25 bg-primary/[0.04] shadow-[0_0_0_1px_oklch(0.52_0.26_281_/_0.12),0_8px_32px_oklch(0.52_0.26_281_/_0.08)]'
          : 'border-border bg-card shadow-sm hover:border-border/80'
      )}
      aria-label={step.heading}
    >
      {/* Phase label */}
      <span
        className={cn(
          'font-mono text-[11px] font-semibold uppercase tracking-[0.12em]',
          step.isCore ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        {step.phase}
      </span>

      {/* Content */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground">
          {step.heading}
        </h3>
        <p className="text-[0.9rem] leading-relaxed text-muted-foreground">
          {step.body}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {step.tags.map((tag) => (
          <span
            key={tag}
            className={cn(
              'inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium',
              step.isCore
                ? 'border-primary/20 bg-primary/8 text-primary'
                : 'border-border bg-muted/50 text-muted-foreground'
            )}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Core marker */}
      {step.isCore && (
        <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          <span className="font-mono text-[10px] font-semibold text-primary">AI</span>
        </div>
      )}
    </motion.article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="border-t border-border py-28 px-5 sm:px-8"
      aria-labelledby="workflow-heading"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-3">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
            The Pipeline
          </span>
          <h2
            id="workflow-heading"
            className="max-w-lg text-3xl font-semibold leading-tight tracking-[-0.025em] text-foreground sm:text-4xl"
          >
            From raw form to qualified brief in under 60 seconds.
          </h2>
        </div>

        {/* Steps grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {STEPS.map((step) => (
            <PipelineCard key={step.index} step={step} />
          ))}
        </motion.div>

        {/* Tech stack footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 text-center text-xs text-muted-foreground"
        >
          Powered by{' '}
          <span className="font-medium text-foreground">n8n</span> ·{' '}
          <span className="font-medium text-foreground">Google Gemini</span> ·{' '}
          <span className="font-medium text-foreground">Google Sheets</span> ·{' '}
          <span className="font-medium text-foreground">Gmail</span>
        </motion.p>
      </div>
    </section>
  );
}
