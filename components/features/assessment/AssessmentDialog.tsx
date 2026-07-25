'use client';

import { AnimatePresence } from 'framer-motion';
import { AssessmentSheet } from './AssessmentSheet';

interface AssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * AssessmentDialog — thin wrapper that controls visibility of AssessmentSheet.
 *
 * Kept as the public API so all existing call-sites (Navbar, HeroSection,
 * CtaSection) require zero changes.
 */
export function AssessmentDialog({ open, onOpenChange }: AssessmentDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <AssessmentSheet
          key="assessment-sheet"
          onClose={() => onOpenChange(false)}
        />
      )}
    </AnimatePresence>
  );
}
