'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SubmitButtonProps {
  isSubmitting: boolean;
  disabled?: boolean;
  loadingMessage?: string;
  className?: string;
}

export function SubmitButton({ isSubmitting, disabled, loadingMessage, className }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      id="lead-form-submit"
      disabled={isSubmitting || disabled}
      aria-disabled={isSubmitting || disabled}
      aria-label={isSubmitting ? (loadingMessage || 'Submitting your enquiry…') : 'Request a consultation'}
      className={cn(
        'h-11 w-full gap-2.5 rounded-xl text-sm font-semibold transition-all',
        'shadow-lg shadow-primary/20 hover:shadow-primary/30',
        className
      )}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          <span>{loadingMessage || 'Submitting…'}</span>
        </>
      ) : (
        'Request Consultation'
      )}
    </Button>
  );
}
