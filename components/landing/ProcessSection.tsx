'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    title: 'Submit Enquiry',
    desc: 'You provide your context, challenges, and goals through our consultation portal.',
  },
  {
    num: '02',
    title: 'AI Analysis',
    desc: 'Our Gemini-powered workflow evaluates the request, extracts key data, and generates a profile.',
  },
  {
    num: '03',
    title: 'Strategic Routing',
    desc: 'The qualified profile is instantly routed to the most appropriate AI specialist on our team.',
  },
  {
    num: '04',
    title: 'Consultation',
    desc: 'We meet with you armed with a deep understanding of your business, ready to propose solutions.',
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-24 px-5 sm:px-8 relative bg-card/10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 mb-16 max-w-2xl">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            A frictionless path from enquiry to strategy.
          </h2>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="absolute top-8 left-[3rem] right-[3rem] h-[1px] bg-border hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                className="flex flex-col gap-5 relative"
              >
                <div className="flex size-16 items-center justify-center rounded-2xl bg-card border border-border shadow-sm mx-auto md:mx-0">
                  <span className="font-mono text-sm font-bold text-primary">{step.num}</span>
                </div>
                <div className="flex flex-col gap-2 text-center md:text-left px-4 md:px-0">
                  <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
