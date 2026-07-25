'use client';

import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Signal item ──────────────────────────────────────────────────────────────
interface Signal {
  key: string;
  raw: string;
  extracted: string;
  confidence: number;
  accent: 'primary' | 'signal' | 'amber' | 'rose';
}

const SIGNALS: Signal[] = [
  {
    key: 'intent',
    raw: '"looking to upgrade our legacy dispatch system"',
    extracted: 'Purchase intent — replacement',
    confidence: 97,
    accent: 'signal',
  },
  {
    key: 'budget',
    raw: '"maybe around 80k-100k"',
    extracted: '$80,000 – $100,000 (stated)',
    confidence: 94,
    accent: 'primary',
  },
  {
    key: 'timeline',
    raw: '"before the holiday rush in November"',
    extracted: 'Q4 2026 — high urgency',
    confidence: 91,
    accent: 'amber',
  },
  {
    key: 'authority',
    raw: '"we need something that integrates with SAP"',
    extracted: 'Decision-maker or technical lead',
    confidence: 78,
    accent: 'primary',
  },
  {
    key: 'pain_point',
    raw: '"crashing a lot lately and costing us money"',
    extracted: 'Operational loss — critical pain',
    confidence: 99,
    accent: 'rose',
  },
  {
    key: 'next_action',
    raw: '"Can someone call me next week?"',
    extracted: 'Demo request — immediate follow-up',
    confidence: 100,
    accent: 'signal',
  },
];

function accentClasses(accent: Signal['accent']) {
  switch (accent) {
    case 'primary': return { bar: 'bg-primary',      text: 'text-primary',       bg: 'bg-primary/8 border-primary/20'    };
    case 'signal':  return { bar: 'bg-emerald-500',  text: 'text-emerald-500',   bg: 'bg-emerald-500/8 border-emerald-500/20' };
    case 'amber':   return { bar: 'bg-amber-500',    text: 'text-amber-500',     bg: 'bg-amber-500/8 border-amber-500/20' };
    case 'rose':    return { bar: 'bg-rose-500',      text: 'text-rose-500',      bg: 'bg-rose-500/8 border-rose-500/20'  };
  }
}

// ─── Variants ─────────────────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const rowVariants: Variants = {
  hidden:  { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Signal Row ───────────────────────────────────────────────────────────────
function SignalRow({ signal }: { signal: Signal }) {
  const a = accentClasses(signal.accent);
  return (
    <motion.div
      variants={rowVariants}
      className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-[1fr_1fr_auto]"
    >
      {/* Raw text */}
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          Input
        </span>
        <p className="font-mono text-[0.8rem] italic text-muted-foreground leading-snug">
          {signal.raw}
        </p>
      </div>

      {/* Extracted */}
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          Extracted
        </span>
        <p className={cn('text-[0.875rem] font-semibold leading-snug', a.text)}>
          {signal.extracted}
        </p>
      </div>

      {/* Confidence bar */}
      <div className="flex flex-col items-end justify-center gap-1.5">
        <span className={cn('font-mono text-[11px] font-bold', a.text)}>
          {signal.confidence}%
        </span>
        <div className="h-1 w-16 rounded-full bg-border">
          <motion.div
            className={cn('h-full rounded-full', a.bar)}
            initial={{ width: 0 }}
            whileInView={{ width: `${signal.confidence}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function AiUnderstandingSection() {
  return (
    <section
      id="signals"
      className="border-t border-border bg-muted/20 py-28 px-5 sm:px-8"
      aria-labelledby="signals-heading"
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-3">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
            Signal Extraction
          </span>
          <h2
            id="signals-heading"
            className="max-w-lg text-3xl font-semibold leading-tight tracking-[-0.025em] text-foreground sm:text-4xl"
          >
            AI reads between the lines.
          </h2>
          <p className="max-w-xl text-[0.9375rem] text-muted-foreground leading-relaxed">
            One conversational response contains dozens of qualification signals. Gemini extracts them with high confidence so your reps never have to guess.
          </p>
        </div>

        {/* Signal rows */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col gap-3"
        >
          {SIGNALS.map((signal) => (
            <SignalRow key={signal.key} signal={signal} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
