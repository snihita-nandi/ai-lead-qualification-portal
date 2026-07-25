'use client';

import { motion, useAnimationFrame } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface NodeProps {
  id: string;
  label: string;
  x: number;
  y: number;
  isAi?: boolean;
}

const NODES: NodeProps[] = [
  { id: 'visitor', label: 'Visitor', x: 40, y: 150 },
  { id: 'website', label: 'Website', x: 200, y: 150 },
  { id: 'ai', label: 'AI Understanding', x: 360, y: 150, isAi: true },
  { id: 'sales', label: 'Sales Team', x: 520, y: 150 },
];

const EDGES = [
  { from: 'visitor', to: 'website' },
  { from: 'website', to: 'ai' },
  { from: 'ai', to: 'sales' },
];

function SignalDot({ from, to, delay }: { from: NodeProps; to: NodeProps; delay: number }) {
  const ref = useRef<SVGCircleElement>(null);
  const t = useRef(delay);

  useAnimationFrame((_, delta) => {
    t.current = (t.current + delta * 0.0004) % 1;
    if (ref.current) {
      const x = from.x + (to.x - from.x) * t.current;
      const y = from.y + (to.y - from.y) * t.current;
      ref.current.setAttribute('cx', x.toFixed(1));
      ref.current.setAttribute('cy', y.toFixed(1));
    }
  });

  return (
    <circle
      ref={ref}
      r={3}
      className="fill-primary"
      style={{ filter: 'drop-shadow(0 0 4px var(--primary))' }}
    />
  );
}

export function HeroVisualization() {
  const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card/30 p-8 shadow-2xl backdrop-blur-md">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      <svg
        viewBox="0 50 560 200"
        className="w-full h-auto overflow-visible"
        aria-label="Workflow visualization: Visitor to Website to AI to Sales"
        role="img"
      >
        {/* Edges */}
        {EDGES.map((e) => (
          <line
            key={`${e.from}-${e.to}`}
            x1={nodeMap[e.from].x}
            y1={nodeMap[e.from].y}
            x2={nodeMap[e.to].x}
            y2={nodeMap[e.to].y}
            className="stroke-border"
            strokeWidth={2}
            strokeDasharray="4 4"
          />
        ))}

        {/* Signals */}
        {EDGES.map((e, i) => (
          <SignalDot
            key={`sig-${e.from}-${e.to}`}
            from={nodeMap[e.from]}
            to={nodeMap[e.to]}
            delay={i * 0.3}
          />
        ))}

        {/* Nodes */}
        {NODES.map((node) => {
          const r = node.isAi ? 32 : 24;
          return (
            <g key={node.id}>
              {node.isAi && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={r + 12}
                  className="fill-primary/10 stroke-primary/30"
                  strokeWidth={1}
                  animate={{ r: [r + 8, r + 16, r + 8], opacity: [0.4, 0.1, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={r}
                className={cn(
                  'stroke-border',
                  node.isAi ? 'fill-primary/20 stroke-primary/50' : 'fill-background'
                )}
                strokeWidth={node.isAi ? 2 : 1.5}
              />
              <text
                x={node.x}
                y={node.y + r + 24}
                textAnchor="middle"
                className={cn(
                  'text-xs font-medium',
                  node.isAi ? 'fill-primary font-semibold' : 'fill-muted-foreground'
                )}
              >
                {node.label}
              </text>
              {/* Optional inner icon/text for node */}
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                className={cn('text-[10px] font-mono', node.isAi ? 'fill-primary' : 'fill-foreground')}
              >
                {node.isAi ? 'AI' : node.id.substring(0, 2).toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
