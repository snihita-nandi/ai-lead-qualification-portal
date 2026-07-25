// Payload builder — constructs the clean Phase 1 submission payload.
// No AI fields. No Gemini. No Sheets. No categorization.
// The n8n workflow handles all of that downstream.

import type { LeadFormData, LeadPayload, PageVisit } from '@/types/lead-form';
import { getSessionId, generateRequestId } from '@/lib/lead-tracking/session';
import { getPageHistory, CONSENT_VERSION } from '@/lib/lead-tracking/page-tracker';

// ─── String sanitizer ─────────────────────────────────────────────────────────

function sanitize(value: string | undefined | null): string {
  if (!value) return '';
  return value
    .trim()
    // Strip control characters
    .replace(/[\u0000-\u001F\u007F]/g, '')
    // Collapse internal whitespace
    .replace(/\s+/g, ' ');
}

function sanitizeOptional(value: string | undefined | null): string | undefined {
  const cleaned = sanitize(value);
  return cleaned.length > 0 ? cleaned : undefined;
}

// ─── Public builder ───────────────────────────────────────────────────────────

/**
 * Builds the complete Phase 1 payload.
 * - Generates a fresh requestId on every call
 * - Reads sessionId from sessionStorage
 * - Reads page history from sessionStorage
 * - Sanitizes all string values
 * - No AI fields included
 */
export function buildLeadPayload(formData: LeadFormData): LeadPayload {
  const now = new Date().toISOString();
  const journey: PageVisit[] = getPageHistory();

  const payload: LeadPayload = {
    schemaVersion: '1.0',
    requestId: generateRequestId(),
    submittedAt: now,

    source: {
      url: typeof window !== 'undefined' ? window.location.href : '',
      title: typeof document !== 'undefined' ? document.title : '',
    },

    visitor: {
      fullName: sanitize(formData.fullName),
      workEmail: sanitize(formData.workEmail),
      company: sanitize(formData.company),
      ...(formData.designation ? { designation: sanitizeOptional(formData.designation) } : {}),
      ...(formData.phone ? { phone: sanitizeOptional(formData.phone) } : {}),
      ...(formData.companySize ? { companySize: sanitizeOptional(formData.companySize) } : {}),
    },

    inquiry: {
      message: sanitize(formData.message),
    },

    journey,

    attribution: {
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      sessionId: getSessionId(),
    },

    consent: {
      timestamp: now,
      version: CONSENT_VERSION,
    },
  };

  return payload;
}
