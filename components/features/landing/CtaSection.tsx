'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssessmentDialog } from '@/components/features/assessment/AssessmentDialog';

export function CtaSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <section
        id="cta"
        className="border-t border-border py-28 px-5 sm:px-8"
        aria-labelledby="cta-heading"
      >
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
            {/* Left — editorial copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4"
            >
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                Get started
              </span>
              <h2
                id="cta-heading"
                className="max-w-lg text-4xl font-semibold leading-tight tracking-[-0.03em] text-foreground sm:text-5xl"
              >
                Stop guessing.
                <br />
                Start qualifying.
              </h2>
              <p className="max-w-md text-[0.9375rem] text-muted-foreground leading-relaxed">
                Submit the assessment. The AI handles everything else. Your sales team opens a scored brief, not a raw form.
              </p>
            </motion.div>

            {/* Right — single CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0"
            >
              <Button
                size="lg"
                onClick={() => setIsDialogOpen(true)}
                id="cta-start-assessment"
                className="h-12 gap-2.5 rounded-full px-8 text-sm font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30"
              >
                Start the Assessment
                <ArrowRight className="size-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <AssessmentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
