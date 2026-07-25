'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  error,
  required,
  hint,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-foreground"
      >
        {label}
        {required && (
          <span className="ml-0.5 text-primary" aria-hidden="true">*</span>
        )}
      </label>

      {children}

      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-destructive" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Shared input styles ──────────────────────────────────────────────────────

export const inputStyles = (error?: boolean) =>
  cn(
    'h-10 w-full rounded-lg border bg-card/50 px-3 text-sm text-foreground outline-none transition-all',
    'placeholder:text-muted-foreground',
    'focus:border-primary focus:ring-2 focus:ring-primary/20',
    'disabled:cursor-not-allowed disabled:opacity-50',
    error
      ? 'border-destructive/60 focus:border-destructive focus:ring-destructive/20'
      : 'border-border hover:border-border/80'
  );

export const textareaStyles = (error?: boolean) =>
  cn(
    'w-full rounded-lg border bg-card/50 px-3 py-2.5 text-sm text-foreground outline-none transition-all resize-none',
    'placeholder:text-muted-foreground',
    'focus:border-primary focus:ring-2 focus:ring-primary/20',
    'disabled:cursor-not-allowed disabled:opacity-50',
    error
      ? 'border-destructive/60 focus:border-destructive focus:ring-destructive/20'
      : 'border-border hover:border-border/80'
  );
