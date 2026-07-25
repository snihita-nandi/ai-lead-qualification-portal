'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface SuccessStateProps {
  onReset: () => void;
}

const STATUS_ITEMS = [
  { label: 'Enquiry received',             done: true  },
  { label: 'Profile being generated',       done: true  },
  { label: 'Sales team notification queued', done: false },
] as const;

export function SuccessState({ onReset }: SuccessStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-7 py-8 text-center"
      role="status"
      aria-live="polite"
      aria-label="Submission successful"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex size-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10"
        aria-hidden="true"
      >
        <CheckCircle className="size-8 text-emerald-500" strokeWidth={1.5} />
      </motion.div>

      {/* Copy */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          Thank you — we&apos;re on it.
        </h3>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          Your enquiry has been submitted. Our team will be in touch shortly after reviewing your profile.
        </p>
      </div>

      {/* Status items */}
      <div className="flex w-full max-w-xs flex-col gap-2">
        {STATUS_ITEMS.map(({ label, done }) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-lg border border-border bg-card/50 px-4 py-2.5"
          >
            <span className="text-sm text-foreground">{label}</span>
            <span
              className={`font-mono text-xs font-semibold ${done ? 'text-emerald-500' : 'text-muted-foreground'}`}
            >
              {done ? '✓' : 'Pending'}
            </span>
          </div>
        ))}
      </div>

      {/* Reset */}
      <button
        type="button"
        onClick={onReset}
        className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
      >
        Submit another enquiry
        <ArrowRight className="size-3.5" />
      </button>
    </motion.div>
  );
}
