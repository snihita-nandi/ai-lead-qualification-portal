// ─── Shared assessment UI primitives ─────────────────────────────────────────
// Small, single-responsibility components used across multiple steps.

'use client';

import * as React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Progress bar ─────────────────────────────────────────────────────────────

interface ProgressBarProps {
  currentStep: number; // 1-indexed
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const pct = Math.min((currentStep / totalSteps) * 100, 100);

  return (
    <div className="w-full" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
      <div className="h-[2px] w-full rounded-full bg-border">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

// ─── Step shell (consistent padding / layout per step) ───────────────────────

interface StepShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const shellVariants: Variants = {
  enter:  { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0  },
  exit:   { opacity: 0, y: -8 },
};

export function StepShell({ title, description, children }: StepShellProps) {
  return (
    <motion.div
      key={title}
      variants={shellVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-8"
    >
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </motion.div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function Field({ label, htmlFor, error, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="ml-0.5 text-primary" aria-hidden>*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Text input ───────────────────────────────────────────────────────────────

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, error, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none transition-colors',
        'placeholder:text-muted-foreground',
        'focus:border-primary focus:ring-2 focus:ring-primary/20',
        error
          ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
          : 'border-border',
        className
      )}
      {...props}
    />
  )
);
TextInput.displayName = 'TextInput';

// ─── Textarea ─────────────────────────────────────────────────────────────────

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};

export const AssessmentTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={4}
      className={cn(
        'w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors resize-none',
        'placeholder:text-muted-foreground',
        'focus:border-primary focus:ring-2 focus:ring-primary/20',
        error
          ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
          : 'border-border',
        className
      )}
      {...props}
    />
  )
);
AssessmentTextarea.displayName = 'AssessmentTextarea';

// ─── Searchable select ────────────────────────────────────────────────────────

interface SearchableSelectProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  error?: boolean;
}

export function SearchableSelect({
  id,
  value,
  onChange,
  options,
  placeholder = 'Search…',
  error,
}: SearchableSelectProps) {
  const [query, setQuery] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const filtered = query.length > 0
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
    : options;

  // Close on outside click
  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        if (!value) setQuery('');
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [value]);

  function handleSelect(opt: string) {
    onChange(opt);
    setQuery(opt);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <input
        id={id}
        type="text"
        autoComplete="off"
        value={open ? query : (value || query)}
        placeholder={placeholder}
        onFocus={() => {
          setOpen(true);
          setQuery('');
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn(
          'h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none transition-colors',
          'placeholder:text-muted-foreground',
          'focus:border-primary focus:ring-2 focus:ring-primary/20',
          error ? 'border-destructive' : 'border-border'
        )}
      />
      {open && filtered.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-lg border border-border bg-card py-1 shadow-xl shadow-black/10"
        >
          {filtered.map((opt) => (
            <li
              key={opt}
              role="option"
              aria-selected={opt === value}
              onMouseDown={() => handleSelect(opt)}
              className={cn(
                'cursor-pointer px-3 py-2 text-sm transition-colors hover:bg-muted',
                opt === value ? 'bg-primary/8 font-medium text-primary' : 'text-foreground'
              )}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Card Select (grid of tappable cards) ────────────────────────────────────

interface CardOption {
  value: string;
  label: string;
  description?: string;
  sublabel?: string;
}

interface CardSelectProps {
  options: readonly CardOption[];
  value: string;
  onChange: (value: string) => void;
  columns?: 2 | 3 | 4;
  error?: boolean;
}

export function CardSelect({
  options,
  value,
  onChange,
  columns = 3,
  error,
}: CardSelectProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
  }[columns];

  return (
    <div
      className={cn('grid gap-2.5', gridCols, error && 'ring-2 ring-destructive/20 rounded-xl p-1')}
      role="radiogroup"
    >
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(opt.value)}
            className={cn(
              'relative flex flex-col gap-1 rounded-xl border p-4 text-left transition-all',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
              isSelected
                ? 'border-primary bg-primary/5 shadow-sm shadow-primary/10'
                : 'border-border bg-card hover:border-border/60 hover:bg-muted/30'
            )}
          >
            {isSelected && (
              <span className="absolute right-3 top-3 flex size-4 items-center justify-center rounded-full bg-primary">
                <Check className="size-2.5 text-primary-foreground" strokeWidth={3} />
              </span>
            )}
            <span className={cn(
              'text-sm font-semibold leading-tight',
              isSelected ? 'text-primary' : 'text-foreground'
            )}>
              {opt.label}
            </span>
            {opt.sublabel && (
              <span className="text-xs text-muted-foreground">{opt.sublabel}</span>
            )}
            {opt.description && (
              <span className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                {opt.description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Radio group ──────────────────────────────────────────────────────────────

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  options: readonly RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  error?: boolean;
}

export function RadioGroup({ options, value, onChange, name, error }: RadioGroupProps) {
  return (
    <div className={cn('flex flex-col gap-2', error && 'ring-2 ring-destructive/20 rounded-xl p-1')} role="radiogroup">
      {options.map((opt) => {
        const id = `${name}-${opt.value}`;
        const isSelected = opt.value === value;
        return (
          <label
            key={opt.value}
            htmlFor={id}
            className={cn(
              'flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all',
              isSelected
                ? 'border-primary bg-primary/5'
                : 'border-border bg-card hover:border-border/60 hover:bg-muted/30'
            )}
          >
            <input
              id={id}
              type="radio"
              name={name}
              value={opt.value}
              checked={isSelected}
              onChange={() => onChange(opt.value)}
              className="mt-0.5 size-4 accent-primary"
            />
            <div className="flex flex-col gap-0.5">
              <span className={cn('text-sm font-medium', isSelected ? 'text-primary' : 'text-foreground')}>
                {opt.label}
              </span>
              {opt.description && (
                <span className="text-xs text-muted-foreground">{opt.description}</span>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}
