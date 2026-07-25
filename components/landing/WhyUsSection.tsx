'use client';

import { motion } from 'framer-motion';

const BENEFITS = [
  {
    title: 'Built for Scale',
    desc: 'Our architectures are designed to handle millions of interactions seamlessly without sacrificing response quality.',
  },
  {
    title: 'Model Agnostic',
    desc: 'We deploy the right LLM for the right task, utilizing Gemini, OpenAI, and open-source models based on your constraints.',
  },
  {
    title: 'Privacy First',
    desc: 'Strict data boundaries ensure your proprietary business information never trains public models.',
  },
];

export function WhyUsSection() {
  return (
    <section className="py-24 px-5 sm:px-8 relative border-t border-border/50">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          <div className="flex flex-col gap-4 lg:col-span-1">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              Why partner with us.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              We move beyond prompt engineering to build robust, scalable AI infrastructure tailored to your operational reality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:col-span-2">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                className="flex flex-col gap-3"
              >
                <h3 className="font-semibold text-foreground">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
