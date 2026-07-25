// Session management — generates and persists identifiers across the visit.
// All values are stored in sessionStorage (cleared on tab close).

const SESSION_KEY = 'liq_session_id';

/**
 * Returns the current session ID, generating one if it doesn't exist.
 * Safe to call on every component mount — idempotent.
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr';

  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) return stored;

    const id = generateId('ses');
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    // Private browsing may deny sessionStorage writes
    return generateId('ses');
  }
}

/**
 * Generates a unique request ID for each form submission.
 * Not persisted — called once at submission time.
 */
export function generateRequestId(): string {
  return generateId('req');
}

// ─── Internal ─────────────────────────────────────────────────────────────────

function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 9);
  return `${prefix}_${timestamp}_${random}`;
}
