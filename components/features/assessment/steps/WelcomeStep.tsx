'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeStepProps {
  onStart: () => void;
}

export function WelcomeStep({ onStart }: WelcomeStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-8 py-6 text-center"
    >
      {/* Icon */}
      <div className="flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/8">
        <span className="font-mono text-lg font-bold text-primary">AI</span>
      </div>

      {/* Copy */}
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          AI Business Assessment
        </h2>
        <p className="max-w-sm text-[0.9375rem] leading-relaxed text-muted-foreground">
          Answer a few focused questions and our AI will generate a complete qualification profile for your business requirements.
        </p>
      </div>

      {/* Estimated time */}
      <div className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
        <Clock className="size-3.5" />
        <span>Takes about <strong className="font-semibold text-foreground">2 minutes</strong></span>
      </div>

      {/* CTA */}
      <Button
        size="lg"
        onClick={onStart}
        id="assessment-welcome-start"
        className="h-11 gap-2 rounded-full px-8 text-sm font-semibold shadow-lg shadow-primary/20"
      >
        Start Assessment
        <ArrowRight className="size-4" />
      </Button>

      <p className="text-xs text-muted-foreground">
        Your data is used solely to generate your lead profile.
      </p>
    </motion.div>
  );
}
