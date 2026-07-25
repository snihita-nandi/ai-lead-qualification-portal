'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimationFrame, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssessmentDialog } from '@/components/features/assessment/AssessmentDialog';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  type: 'input' | 'process' | 'output' | 'ai';
  score?: number;
  tag?: string;
}

interface Edge {
  from: string;
  to: string;
}

// ─── Static graph topology ────────────────────────────────────────────────────
const NODES: Node[] = [
  { id: 'visitor',      x: 50,  y: 200, label: 'Lead',        type: 'input',   tag: 'inbound' },
  { id: 'assessment',   x: 200, y: 120, label: 'Assessment',  type: 'process', tag: 'form' },
  { id: 'behavior',     x: 200, y: 280, label: 'Behavior',    type: 'process', tag: 'signals' },
  { id: 'ai',           x: 380, y: 200, label: 'Gemini AI',   type: 'ai',      tag: 'LLM' },
  { id: 'score',        x: 530, y: 120, label: 'Score',       type: 'output',  score: 92, tag: '92/100' },
  { id: 'intent',       x: 530, y: 200, label: 'Intent',      type: 'output',  tag: 'high' },
  { id: 'routing',      x: 530, y: 280, label: 'Routing',     type: 'output',  tag: 'AE-tier1' },
  { id: 'sales',        x: 680, y: 200, label: 'Sales',       type: 'output',  tag: 'notified' },
];

const EDGES: Edge[] = [
  { from: 'visitor',    to: 'assessment' },
  { from: 'visitor',    to: 'behavior'   },
  { from: 'assessment', to: 'ai'         },
  { from: 'behavior',   to: 'ai'         },
  { from: 'ai',         to: 'score'      },
  { from: 'ai',         to: 'intent'     },
  { from: 'ai',         to: 'routing'    },
  { from: 'score',      to: 'sales'      },
  { from: 'intent',     to: 'sales'      },
  { from: 'routing',    to: 'sales'      },
];

// ─── Animated signal dot on each edge ────────────────────────────────────────
function SignalDot({
  fromNode,
  toNode,
  delay,
}: {
  fromNode: Node;
  toNode: Node;
  delay: number;
}) {
  const ref = useRef<SVGCircleElement>(null);
  const t = useRef(delay);

  useAnimationFrame((_, delta) => {
    t.current = (t.current + delta * 0.00035) % 1;
    if (ref.current) {
      const x = fromNode.x + (toNode.x - fromNode.x) * t.current;
      const y = fromNode.y + (toNode.y - fromNode.y) * t.current;
      ref.current.setAttribute('cx', x.toFixed(1));
      ref.current.setAttribute('cy', y.toFixed(1));
    }
  });

  return (
    <circle
      ref={ref}
      r={2.5}
      cx={fromNode.x}
      cy={fromNode.y}
      className="fill-primary opacity-80"
    />
  );
}

// ─── Node color by type ───────────────────────────────────────────────────────
function nodeStyles(type: Node['type']) {
  switch (type) {
    case 'ai':      return { ring: 'stroke-primary', fill: 'fill-primary/10', text: 'fill-primary'     };
    case 'input':   return { ring: 'stroke-border',  fill: 'fill-card',       text: 'fill-foreground'  };
    case 'output':  return { ring: 'stroke-border',  fill: 'fill-card',       text: 'fill-foreground'  };
    case 'process': return { ring: 'stroke-border',  fill: 'fill-muted/50',   text: 'fill-foreground'  };
  }
}

// ─── Network Visualization ────────────────────────────────────────────────────
function QualificationNetwork() {
  const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    <div className="relative w-full overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 60 740 320"
        className="w-full"
        role="img"
        aria-label="AI lead qualification network visualization"
      >
        {/* Static edges */}
        {EDGES.map((e) => {
          const a = nodeMap[e.from];
          const b = nodeMap[e.to];
          return (
            <line
              key={`${e.from}-${e.to}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              className="stroke-border"
              strokeWidth={1}
              strokeDasharray="4 6"
            />
          );
        })}

        {/* Animated signals */}
        {EDGES.map((e, i) => (
          <SignalDot
            key={`sig-${e.from}-${e.to}`}
            fromNode={nodeMap[e.from]}
            toNode={nodeMap[e.to]}
            delay={(i * 0.18) % 1}
          />
        ))}

        {/* Nodes */}
        {NODES.map((node) => {
          const s = nodeStyles(node.type);
          const r = node.type === 'ai' ? 32 : 24;
          return (
            <g key={node.id}>
              {/* Outer pulse ring for AI node */}
              {node.type === 'ai' && (
                <motion.circle
                  cx={node.x} cy={node.y} r={r + 10}
                  className="fill-primary/5 stroke-primary/20"
                  strokeWidth={1}
                  animate={{ r: [r + 8, r + 18, r + 8], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}

              {/* Circle background */}
              <circle cx={node.x} cy={node.y} r={r} className={cn(s.fill, s.ring)} strokeWidth={node.type === 'ai' ? 1.5 : 1} />

              {/* Label */}
              <text
                x={node.x}
                y={node.y + 0.5}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={node.type === 'ai' ? 8 : 7}
                fontWeight={node.type === 'ai' ? '600' : '500'}
                className={s.text}
              >
                {node.label}
              </text>

              {/* Tag pill below */}
              <text
                x={node.x}
                y={node.y + r + 12}
                textAnchor="middle"
                fontSize={6}
                className="fill-muted-foreground"
              >
                {node.tag}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Live scoring ticker ──────────────────────────────────────────────────────
const TICKER_ITEMS = [
  { label: 'Intent',    value: 'High',       color: 'text-emerald-500' },
  { label: 'Budget',    value: '$80k–$100k', color: 'text-foreground'  },
  { label: 'Timeline',  value: 'Q3 2026',    color: 'text-amber-500'   },
  { label: 'Score',     value: '92 / 100',   color: 'text-primary'     },
  { label: 'Routing',   value: 'ENT-AE',     color: 'text-emerald-500' },
];

function ScoreTicker() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-2xl border border-border bg-card/60 px-6 py-4 backdrop-blur-sm"
      role="status"
      aria-label="Live qualification preview"
    >
      {TICKER_ITEMS.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 + i * 0.08, duration: 0.35 }}
          className="flex flex-col items-center gap-0.5"
        >
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            {item.label}
          </span>
          <span className={cn('font-mono text-sm font-semibold tabular-nums', item.color)}>
            {item.value}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Hero text variants ───────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const lineVariants: Variants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ─── HeroSection ──────────────────────────────────────────────────────────────
export function HeroSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tick, setTick] = useState(0);

  // Simulate a live "processing" counter
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <section
        id="home"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-14 pb-16 sm:px-8"
        aria-labelledby="hero-heading"
      >
        {/* Radial ambient glow — subtle, single point of light */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/4 rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at center, oklch(0.52 0.26 281 / 0.08) 0%, transparent 65%)',
          }}
        />

        <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">

          {/* Live status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mb-10 inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span>
              Processing lead {String(1042 + tick).padStart(4, '0')} &mdash; score:{' '}
              <span className="font-semibold text-foreground">{88 + (tick % 9)}/100</span>
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-2"
          >
            <motion.h1
              id="hero-heading"
              variants={lineVariants}
              className="text-[2.75rem] font-semibold leading-[1.12] tracking-[-0.03em] text-foreground sm:text-6xl lg:text-[4.25rem]"
            >
              Your leads, qualified
            </motion.h1>
            <motion.h1
              variants={lineVariants}
              className="text-[2.75rem] font-semibold leading-[1.12] tracking-[-0.03em] text-muted-foreground sm:text-6xl lg:text-[4.25rem]"
              aria-hidden
            >
              before the call is booked.
            </motion.h1>
          </motion.div>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground"
          >
            Prospects submit a structured assessment. Gemini AI extracts intent, budget and timeline — then routes a scored lead profile directly to your sales team.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              size="lg"
              onClick={() => setIsDialogOpen(true)}
              id="hero-start-assessment"
              className="h-11 gap-2 rounded-full px-7 text-sm font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30"
            >
              Start Assessment
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              id="hero-learn-more"
              onClick={() =>
                document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="h-11 rounded-full px-7 text-sm font-medium"
            >
              See the pipeline
            </Button>
          </motion.div>

          {/* Network Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 w-full"
          >
            <QualificationNetwork />
          </motion.div>

          {/* Live Score Ticker */}
          <ScoreTicker />
        </div>
      </section>

      <AssessmentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
