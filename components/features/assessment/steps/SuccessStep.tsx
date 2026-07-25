'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessStepProps {
  onReturnHome: () => void;
}

export function SuccessStep({ onReturnHome }: SuccessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-7 py-6 text-center"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex size-16 items-center justify-center rounded-full bg-emerald-500/10"
      >
        <CheckCircle className="size-8 text-emerald-500" strokeWidth={1.5} />
      </motion.div>

      {/* Copy */}
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Assessment Complete
        </h2>
        <p className="max-w-sm text-[0.9375rem] leading-relaxed text-muted-foreground">
          Your business profile has been generated. Our AI has started analysing your requirements.
        </p>
      </div>

      {/* Status cards */}
      <div className="flex w-full max-w-sm flex-col gap-2.5">
        {[
          { label: 'Profile generated',         done: true  },
          { label: 'AI analysis initiated',     done: true  },
          { label: 'Confirmation email queued', done: false },
        ].map(({ label, done }) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
          >
            <span className="text-sm text-foreground">{label}</span>
            <span
              className={`font-mono text-xs font-semibold ${done ? 'text-emerald-500' : 'text-muted-foreground'}`}
            >
              {done ? '✓ Done' : 'Pending'}
            </span>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        You&apos;ll receive a confirmation email after processing.
      </p>

      <Button
        variant="outline"
        onClick={onReturnHome}
        id="assessment-success-return-home"
        className="rounded-full px-8"
      >
        Return Home
      </Button>
    </motion.div>
  );
}
