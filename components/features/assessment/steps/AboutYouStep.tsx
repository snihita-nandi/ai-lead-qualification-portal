'use client';

import { useFormContext } from 'react-hook-form';
import { StepShell, Field, TextInput } from '../ui/primitives';
import type { AssessmentFormData } from '@/types/assessment';

export function AboutYouStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AssessmentFormData>();

  return (
    <StepShell
      title="About You"
      description="We need a few details to personalise your assessment."
    >
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Full Name" htmlFor="fullName" error={errors.fullName?.message} required>
            <TextInput
              id="fullName"
              placeholder="Sarah Chen"
              error={!!errors.fullName}
              autoComplete="name"
              autoFocus
              {...register('fullName')}
            />
          </Field>

          <Field label="Work Email" htmlFor="workEmail" error={errors.workEmail?.message} required>
            <TextInput
              id="workEmail"
              type="email"
              placeholder="sarah@company.com"
              error={!!errors.workEmail}
              autoComplete="email"
              {...register('workEmail')}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Company Name" htmlFor="companyName" error={errors.companyName?.message} required>
            <TextInput
              id="companyName"
              placeholder="Acme Corp"
              error={!!errors.companyName}
              autoComplete="organization"
              {...register('companyName')}
            />
          </Field>

          <Field label="Job Title" htmlFor="jobTitle" error={errors.jobTitle?.message} required>
            <TextInput
              id="jobTitle"
              placeholder="VP of Sales"
              error={!!errors.jobTitle}
              autoComplete="organization-title"
              {...register('jobTitle')}
            />
          </Field>
        </div>
      </div>
    </StepShell>
  );
}
