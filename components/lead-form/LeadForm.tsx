'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';

import { leadFormSchema, COMPANY_SIZE_OPTIONS, type LeadFormData } from '@/types/lead-form';
import { buildLeadPayload } from '@/lib/payload-builder';
import { FormField, inputStyles, textareaStyles } from './FormField';
import { HoneypotField } from './HoneypotField';
import { SubmitButton } from './SubmitButton';
import { SuccessState } from './SuccessState';
import { cn } from '@/lib/utils';

// ─── Submission lock (prevents double submit) ─────────────────────────────────
let submissionLock = false;

// ─── LeadForm ─────────────────────────────────────────────────────────────────

export function LeadForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Submitting…');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    mode: 'onTouched',
  });

  // ─── Submission handler ─────────────────────────────────────────────────────

  const onSubmit = async (data: LeadFormData) => {
    // Honeypot check — bot filled the hidden field
    if (data._hp && data._hp.length > 0) {
      setIsSuccess(true);
      return;
    }

    if (submissionLock) return;
    submissionLock = true;

    try {
      setLoadingMessage('Validating input…');
      const payload = buildLeadPayload(data);
      
      const messages = ['Securely transmitting…', 'Awaiting workflow…', 'Finalizing…'];
      let msgIndex = 0;
      const progressInterval = setInterval(() => {
        if (msgIndex < messages.length) {
          setLoadingMessage(messages[msgIndex]);
          msgIndex++;
        }
      }, 1500);

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      clearInterval(progressInterval);

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || 'Submission failed');
      }

      setIsSuccess(true);
    } catch (err) {
      console.error('[LeadForm] Submission error:', err);
      alert(err instanceof Error ? err.message : 'Something went wrong. Please try again or contact us directly.');
    } finally {
      submissionLock = false;
      setLoadingMessage('Submitting…');
    }
  };

  // ─── Validation error — focus first invalid field ──────────────────────────
  const onError = () => {
    const firstError = Object.keys(errors)[0] as keyof LeadFormData | undefined;
    if (firstError) setFocus(firstError);
  };

  const handleReset = () => {
    reset();
    setIsSuccess(false);
  };

  // ─── Success state ──────────────────────────────────────────────────────────
  if (isSuccess) {
    return <SuccessState onReset={handleReset} />;
  }

  // ─── Form ───────────────────────────────────────────────────────────────────
  return (
    <AnimatePresence mode="wait">
      <motion.form
        key="lead-form"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
        aria-label="Consultation request form"
        className="flex flex-col gap-5"
      >
        {/* Honeypot */}
        <HoneypotField {...register('_hp')} />

        {/* ── Row 1: Name + Email ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            label="Full Name"
            htmlFor="fullName"
            error={errors.fullName?.message}
            required
          >
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              placeholder="Sarah Chen"
              aria-required="true"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              className={inputStyles(!!errors.fullName)}
              {...register('fullName')}
            />
          </FormField>

          <FormField
            label="Work Email"
            htmlFor="workEmail"
            error={errors.workEmail?.message}
            required
          >
            <input
              id="workEmail"
              type="email"
              autoComplete="email"
              placeholder="sarah@company.com"
              aria-required="true"
              aria-invalid={!!errors.workEmail}
              className={inputStyles(!!errors.workEmail)}
              {...register('workEmail')}
            />
          </FormField>
        </div>

        {/* ── Row 2: Company + Designation ───────────────────────────────── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            label="Company"
            htmlFor="company"
            error={errors.company?.message}
            required
          >
            <input
              id="company"
              type="text"
              autoComplete="organization"
              placeholder="Acme Corp"
              aria-required="true"
              aria-invalid={!!errors.company}
              className={inputStyles(!!errors.company)}
              {...register('company')}
            />
          </FormField>

          <FormField
            label="Designation"
            htmlFor="designation"
            error={errors.designation?.message}
            hint="Optional"
          >
            <input
              id="designation"
              type="text"
              autoComplete="organization-title"
              placeholder="VP of Operations"
              className={inputStyles(!!errors.designation)}
              {...register('designation')}
            />
          </FormField>
        </div>

        {/* ── Row 3: Phone + Company Size ────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            label="Phone Number"
            htmlFor="phone"
            error={errors.phone?.message}
            hint="Optional — include country code"
          >
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+1 555 000 0000"
              aria-invalid={!!errors.phone}
              className={inputStyles(!!errors.phone)}
              {...register('phone')}
            />
          </FormField>

          <FormField
            label="Company Size"
            htmlFor="companySize"
            error={errors.companySize?.message}
            hint="Optional"
          >
            <select
              id="companySize"
              aria-invalid={!!errors.companySize}
              className={cn(inputStyles(!!errors.companySize), 'cursor-pointer')}
              {...register('companySize')}
            >
              <option value="">Select size…</option>
              {COMPANY_SIZE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        {/* ── Message ────────────────────────────────────────────────────── */}
        <FormField
          label="How can we help?"
          htmlFor="message"
          error={errors.message?.message}
          required
          hint="Describe your challenge or what you are looking to achieve."
        >
          <textarea
            id="message"
            rows={5}
            placeholder="We are looking to automate our lead qualification process and integrate AI into our existing sales workflow…"
            aria-required="true"
            aria-invalid={!!errors.message}
            className={textareaStyles(!!errors.message)}
            {...register('message')}
          />
        </FormField>

        {/* ── Consent ────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="consent"
            className={cn(
              'flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors',
              errors.consent
                ? 'border-destructive/40 bg-destructive/5'
                : 'border-border bg-card/30 hover:border-border/60'
            )}
          >
            <input
              id="consent"
              type="checkbox"
              aria-required="true"
              aria-invalid={!!errors.consent}
              className="mt-0.5 size-4 accent-primary cursor-pointer"
              {...register('consent')}
            />
            <span className="text-sm text-muted-foreground leading-relaxed">
              I agree to the processing of my data for the purpose of this consultation request.
              My information will only be used to respond to my enquiry.
            </span>
          </label>
          {errors.consent && (
            <p className="text-xs text-destructive" role="alert" aria-live="polite">
              {errors.consent.message}
            </p>
          )}
        </div>

        {/* ── Submit ─────────────────────────────────────────────────────── */}
        <SubmitButton isSubmitting={isSubmitting} loadingMessage={loadingMessage} />
      </motion.form>
    </AnimatePresence>
  );
}
