'use client';

import { LeadForm } from '@/components/lead-form';

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-5 sm:px-8 relative bg-card/5">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-start">
        
        {/* Left: Copy */}
        <div className="flex flex-col gap-6 sticky top-32">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            Get Started
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground leading-[1.1]">
            Let&apos;s build the future of your operations.
          </h2>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Fill out the form to request a consultation. Our intelligent workflow will process your request and route it to the right specialist.
          </p>
          
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-sm font-medium text-foreground">Accepting new clients for Q4</span>
            </div>
          </div>
        </div>

        {/* Right: Form Container */}
        <div className="w-full max-w-lg mx-auto lg:ml-auto lg:mr-0 rounded-2xl border border-border bg-card/30 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          <LeadForm />
        </div>
        
      </div>
    </section>
  );
}
