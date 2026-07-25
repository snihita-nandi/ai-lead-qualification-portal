'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { StepShell, Field, CardSelect, AssessmentTextarea, TextInput } from '../ui/primitives';
import { PRIMARY_GOALS } from '@/lib/assessment-options';
import type { AssessmentFormData } from '@/types/assessment';

export function BusinessDiscoveryStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<AssessmentFormData>();

  return (
    <StepShell
      title="Business Discovery"
      description="Help us understand your goals and the challenges you're facing."
    >
      <div className="flex flex-col gap-6">
        {/* Primary goal */}
        <Field label="Primary Goal" error={errors.primaryGoal?.message} required>
          <Controller
            name="primaryGoal"
            control={control}
            render={({ field }) => (
              <CardSelect
                options={PRIMARY_GOALS}
                value={field.value ?? ''}
                onChange={field.onChange}
                columns={2}
                error={!!errors.primaryGoal}
              />
            )}
          />
        </Field>

        {/* Biggest challenge */}
        <Field
          label="Biggest Business Challenge"
          htmlFor="biggestChallenge"
          error={errors.biggestChallenge?.message}
          required
        >
          <AssessmentTextarea
            id="biggestChallenge"
            placeholder="Describe the main obstacle or pain point you're trying to solve…"
            error={!!errors.biggestChallenge}
            {...register('biggestChallenge')}
          />
        </Field>

        {/* Current tools */}
        <Field
          label="Current Tools & Software"
          htmlFor="currentTools"
          error={errors.currentTools?.message}
        >
          <TextInput
            id="currentTools"
            placeholder="e.g. Salesforce, HubSpot, SAP… (optional)"
            {...register('currentTools')}
          />
        </Field>
      </div>
    </StepShell>
  );
}
