'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { recordVisit } from '@/lib/lead-tracking/page-tracker';

/**
 * PageTracker — silently records page visits for the journey payload.
 *
 * Lives in the root layout so it captures every route change in the SPA.
 * Renders nothing visible.
 */
export function PageTracker() {
  const pathname = usePathname();
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Clean up the previous visit (record duration)
    if (cleanupRef.current) {
      cleanupRef.current();
    }

    const title = typeof document !== 'undefined' ? document.title : pathname;
    const cleanup = recordVisit(pathname, title);
    cleanupRef.current = cleanup;

    // Also clean up on unmount
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [pathname]);

  return null;
}
