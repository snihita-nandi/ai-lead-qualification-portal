'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { StepShell, Field, CardSelect, RadioGroup } from '../ui/primitives';
import { BUDGET_RANGES, TIMELINES } from '@/lib/assessment-options';
import type { AssessmentFormData } from '@/types/assessment';

const DECISION_OPTIONS = [
  {
    value: 'yes',
    label: 'Yes, I make the final call',
    description: 'I have full authority to approve this project',
  },
  {
    value: 'shared',
    label: 'Shared decision',
    description: 'I influence the decision alongside others',
  },
  {
    value: 'no',
    label: 'No, I am evaluating options',
    description: 'Someone else makes the final approval',
  },
] as const;

export function ProjectDetailsStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<AssessmentFormData>();

  return (
    <StepShell
      title="Project Details"
      description="Understanding your budget, timeline and decision authority helps us route your profile correctly."
    >
      <div className="flex flex-col gap-7">
        {/* Budget */}
        <Field label="Budget Range" error={errors.budget?.message} required>
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <CardSelect
                options={BUDGET_RANGES}
                value={field.value ?? ''}
                onChange={field.onChange}
                columns={4}
                error={!!errors.budget}
              />
            )}
          />
        </Field>

        {/* Timeline */}
        <Field label="Implementation Timeline" error={errors.timeline?.message} required>
          <Controller
            name="timeline"
            control={control}
            render={({ field }) => (
              <CardSelect
                options={TIMELINES}
                value={field.value ?? ''}
                onChange={field.onChange}
                columns={3}
                error={!!errors.timeline}
              />
            )}
          />
        </Field>

        {/* Decision maker */}
        <Field label="Are you the decision maker?" error={errors.isDecisionMaker?.message} required>
          <Controller
            name="isDecisionMaker"
            control={control}
            render={({ field }) => (
              <RadioGroup
                name="isDecisionMaker"
                options={DECISION_OPTIONS}
                value={field.value ?? ''}
                onChange={field.onChange}
                error={!!errors.isDecisionMaker}
              />
            )}
          />
        </Field>
      </div>
    </StepShell>
  );
}
