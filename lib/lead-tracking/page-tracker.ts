// Page history tracker.
//
// Rules (per AGENTS.md):
//   - Maximum 5 entries in the journey
//   - Duplicate routes are merged (duration accumulates)
//   - Automatically records visitedAt and durationSeconds
//   - No HTML, no mouse events, no browser internals
//   - Stored in sessionStorage for the duration of the visit

import type { PageVisit } from '@/types/lead-form';

const HISTORY_KEY = 'liq_page_history';
const MAX_ENTRIES = 5;
const CONSENT_VERSION = '1.0';

// ─── Storage helpers ──────────────────────────────────────────────────────────

function readHistory(): PageVisit[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = sessionStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as PageVisit[]) : [];
  } catch {
    return [];
  }
}

function writeHistory(history: PageVisit[]): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // Ignore write failures (private browsing)
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Record a new page visit. If the path already exists in the history,
 * the duration is accumulated instead of adding a new entry.
 *
 * Called by the PageTracker client component on each route change.
 */
export function recordVisit(path: string, title: string): () => void {
  const visitedAt = new Date().toISOString();
  const startTime = Date.now();

  const history = readHistory();
  const existingIndex = history.findIndex((v) => v.path === path);

  if (existingIndex >= 0) {
    // Update visitedAt to the most recent visit timestamp
    history[existingIndex].visitedAt = visitedAt;
    // Duration will be added on cleanup
  } else {
    // New entry — respect the max limit by dropping the oldest
    const newVisit: PageVisit = { path, title, visitedAt, durationSeconds: 0 };
    if (history.length >= MAX_ENTRIES) {
      history.shift(); // drop oldest
    }
    history.push(newVisit);
  }

  writeHistory(history);

  // Return a cleanup function called on route change / unmount
  return function finalizeVisit() {
    const durationSeconds = Math.round((Date.now() - startTime) / 1000);
    const latest = readHistory();
    const idx = latest.findIndex((v) => v.path === path);
    if (idx >= 0) {
      latest[idx].durationSeconds = (latest[idx].durationSeconds || 0) + durationSeconds;
      writeHistory(latest);
    }
  };
}

/**
 * Returns the current page history snapshot.
 * Safe to call at form submission time.
 */
export function getPageHistory(): PageVisit[] {
  return readHistory();
}

/**
 * The consent version string used in the payload.
 */
export { CONSENT_VERSION };
