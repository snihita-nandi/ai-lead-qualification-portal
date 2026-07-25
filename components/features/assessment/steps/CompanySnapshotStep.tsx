'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { StepShell, Field, SearchableSelect, CardSelect } from '../ui/primitives';
import { INDUSTRIES, COMPANY_SIZES, COUNTRIES } from '@/lib/assessment-options';
import type { AssessmentFormData } from '@/types/assessment';

export function CompanySnapshotStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext<AssessmentFormData>();

  return (
    <StepShell
      title="Company Snapshot"
      description="A quick picture of your organisation helps us contextualise your requirements."
    >
      <div className="flex flex-col gap-6">
        {/* Industry */}
        <Field label="Industry" htmlFor="industry" error={errors.industry?.message} required>
          <Controller
            name="industry"
            control={control}
            render={({ field }) => (
              <SearchableSelect
                id="industry"
                value={field.value ?? ''}
                onChange={field.onChange}
                options={INDUSTRIES}
                placeholder="Search industries…"
                error={!!errors.industry}
              />
            )}
          />
        </Field>

        {/* Company size */}
        <Field label="Company Size" error={errors.companySize?.message} required>
          <Controller
            name="companySize"
            control={control}
            render={({ field }) => (
              <CardSelect
                options={COMPANY_SIZES}
                value={field.value ?? ''}
                onChange={field.onChange}
                columns={4}
                error={!!errors.companySize}
              />
            )}
          />
        </Field>

        {/* Country */}
        <Field label="Country" htmlFor="country" error={errors.country?.message} required>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <SearchableSelect
                id="country"
                value={field.value ?? ''}
                onChange={field.onChange}
                options={COUNTRIES}
                placeholder="Search countries…"
                error={!!errors.country}
              />
            )}
          />
        </Field>
      </div>
    </StepShell>
  );
}
