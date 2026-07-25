'use client';

import { useState, useCallback } from 'react';
import {
  useForm,
  FormProvider,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { ArrowLeft, Loader2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ProgressBar } from './ui/primitives';
import { WelcomeStep } from './steps/WelcomeStep';
import { AboutYouStep } from './steps/AboutYouStep';
import { CompanySnapshotStep } from './steps/CompanySnapshotStep';
import { BusinessDiscoveryStep } from './steps/BusinessDiscoveryStep';
import { ProjectDetailsStep } from './steps/ProjectDetailsStep';
import { ReviewStep } from './steps/ReviewStep';
import { SuccessStep } from './steps/SuccessStep';

import {
  assessmentSchema,
  aboutYouSchema,
  companySnapshotSchema,
  businessDiscoverySchema,
  projectDetailsSchema,
  STEP_META,
  TOTAL_STEPS,
  type AssessmentFormData,
} from '@/types/assessment';
import { cn } from '@/lib/utils';

// ─── Stage definitions ────────────────────────────────────────────────────────
// stage 0 = welcome, 1-4 = form steps, 5 = review, 6 = submitting, 7 = success

type Stage = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

const FORM_STAGES: Stage[] = [1, 2, 3, 4];
const DISPLAY_STEP_MAP: Partial<Record<Stage, number>> = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };

// Per-step schemas for on-step validation
const STEP_SCHEMAS = {
  1: aboutYouSchema,
  2: companySnapshotSchema,
  3: businessDiscoverySchema,
  4: projectDetailsSchema,
} as const;

// ─── Props ────────────────────────────────────────────────────────────────────

interface AssessmentSheetProps {
  onClose: () => void;
}

// ─── Overlay animation ────────────────────────────────────────────────────────

const overlayVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
};

const sheetVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, y: 16, transition: { duration: 0.25, ease: 'easeIn' } },
};

// ─── AssessmentSheet ──────────────────────────────────────────────────────────

export function AssessmentSheet({ onClose }: AssessmentSheetProps) {
  const [stage, setStage] = useState<Stage>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema),
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      workEmail: '',
      companyName: '',
      jobTitle: '',
      industry: '',
      companySize: '',
      country: '',
      primaryGoal: '',
      biggestChallenge: '',
      currentTools: '',
      budget: '',
      timeline: '',
      isDecisionMaker: undefined,
    },
  });

  // ─── Navigation ─────────────────────────────────────────────────────────────

  const isFormStage = FORM_STAGES.includes(stage as 1 | 2 | 3 | 4);

  const goNext = useCallback(async () => {
    if (isFormStage) {
      const schema = STEP_SCHEMAS[stage as keyof typeof STEP_SCHEMAS];
      const values = methods.getValues();
      const result = schema.safeParse(values);

      if (!result.success) {
        // Trigger validation UI for this step's fields
        const fieldNames = Object.keys(
          STEP_SCHEMAS[stage as keyof typeof STEP_SCHEMAS].shape
        ) as Array<keyof AssessmentFormData>;
        await methods.trigger(fieldNames);
        return;
      }
    }
    setStage((s) => (s + 1) as Stage);
  }, [isFormStage, stage, methods]);

  const goBack = useCallback(() => {
    setStage((s) => Math.max(0, s - 1) as Stage);
  }, []);

  const handleEditStep = useCallback((step: number) => {
    setStage(step as Stage);
  }, []);

  // ─── Simulated submission ────────────────────────────────────────────────────

  const handleSubmit = useCallback(async () => {
    setStage(6);
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setStage(7);
  }, []);

  const handleSuccess = useCallback(() => {
    onClose();
  }, [onClose]);

  // ─── Step label ──────────────────────────────────────────────────────────────

  const currentDisplayStep = DISPLAY_STEP_MAP[stage];
  const stepMeta = currentDisplayStep != null ? STEP_META[currentDisplayStep - 1] : null;

  const showProgress = stage >= 1 && stage <= 5;
  const showBackButton = stage >= 1 && stage <= 5;
  const showContinueButton = stage >= 1 && stage <= 4;
  const showSubmitButton = stage === 5;

  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="assessment-sheet-title"
      onKeyDown={(e) => e.key === 'Escape' && stage !== 6 && onClose()}
    >
      <motion.div
        variants={sheetVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={cn(
          'relative flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/10',
          // Allow scroll on small viewports
          'max-h-[calc(100dvh-2rem)]'
        )}
      >
        {/* ── Top bar ───────────────────────────────────────────────────────── */}
        {stage !== 0 && stage !== 7 && (
          <div className="flex flex-col gap-3 border-b border-border px-6 py-4">
            {/* Row: step label + close */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                {stepMeta && (
                  <>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                      Step {currentDisplayStep} of {TOTAL_STEPS}
                    </span>
                    <span id="assessment-sheet-title" className="sr-only">
                      {stepMeta.title}
                    </span>
                  </>
                )}
                {stage === 5 && (
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                    Review
                  </span>
                )}
                {stage === 6 && (
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Processing…
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                aria-label="Close assessment"
                className={cn(
                  'flex size-7 items-center justify-center rounded-md text-muted-foreground',
                  'transition-colors hover:bg-muted hover:text-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                  'disabled:pointer-events-none disabled:opacity-40'
                )}
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Progress bar */}
            {showProgress && (
              <ProgressBar
                currentStep={currentDisplayStep ?? 0}
                totalSteps={TOTAL_STEPS}
              />
            )}
          </div>
        )}

        {/* Close button for Welcome */}
        {stage === 0 && (
          <div className="absolute right-4 top-4 z-10">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close assessment"
              className={cn(
                'flex size-7 items-center justify-center rounded-md text-muted-foreground',
                'transition-colors hover:bg-muted hover:text-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
              )}
            >
              <X className="size-4" />
            </button>
          </div>
        )}

        {/* ── Body ─────────────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
          <FormProvider {...methods}>
            <AnimatePresence mode="wait">
              {stage === 0 && (
                <WelcomeStep key="welcome" onStart={() => setStage(1)} />
              )}
              {stage === 1 && <AboutYouStep key="about-you" />}
              {stage === 2 && <CompanySnapshotStep key="company-snapshot" />}
              {stage === 3 && <BusinessDiscoveryStep key="business-discovery" />}
              {stage === 4 && <ProjectDetailsStep key="project-details" />}
              {stage === 5 && (
                <ReviewStep key="review" onEditStep={handleEditStep} />
              )}
              {stage === 6 && (
                <motion.div
                  key="submitting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-5 py-12 text-center"
                >
                  <Loader2 className="size-8 animate-spin text-primary" />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-foreground">
                      Generating your profile…
                    </p>
                    <p className="text-xs text-muted-foreground">
                      AI is analysing your requirements
                    </p>
                  </div>
                </motion.div>
              )}
              {stage === 7 && (
                <SuccessStep key="success" onReturnHome={handleSuccess} />
              )}
            </AnimatePresence>
          </FormProvider>
        </div>

        {/* ── Footer actions ────────────────────────────────────────────────── */}
        {(showBackButton || showContinueButton || showSubmitButton) && (
          <div className="flex items-center justify-between border-t border-border px-6 py-4">
            {/* Back */}
            {showBackButton ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={goBack}
                className="gap-1.5"
                id={`assessment-back-${stage}`}
              >
                <ArrowLeft className="size-3.5" />
                Back
              </Button>
            ) : (
              <span />
            )}

            {/* Continue / Submit */}
            {showContinueButton && (
              <Button
                type="button"
                size="sm"
                onClick={goNext}
                id={`assessment-continue-${stage}`}
                className="rounded-full px-5 font-semibold shadow-sm shadow-primary/20"
              >
                Continue
              </Button>
            )}

            {showSubmitButton && (
              <Button
                type="button"
                size="sm"
                onClick={handleSubmit}
                id="assessment-submit"
                className="rounded-full px-5 font-semibold shadow-sm shadow-primary/20"
              >
                Submit Assessment
              </Button>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
