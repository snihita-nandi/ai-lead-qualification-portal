'use client';

import { motion, type Variants } from 'framer-motion';
import { Bot, Network, Workflow, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const SERVICES = [
  {
    title: 'AI Sales Bots',
    description: 'Intelligent agents that engage prospects, qualify leads, and schedule meetings autonomously.',
    icon: Bot,
  },
  {
    title: 'Organizational Development',
    description: 'Strategic AI integration to augment your workforce and optimize internal operations.',
    icon: Network,
  },
  {
    title: 'Workflow Automation',
    description: 'Seamless integration of LLMs with your existing tools to eliminate manual repetitive tasks.',
    icon: Workflow,
  },
  {
    title: 'Custom AI Solutions',
    description: 'Tailored machine learning models and AI applications built for your unique business challenges.',
    icon: Code2,
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function ServicesSection() {
  return (
    <section id="services" className="py-24 px-5 sm:px-8 relative">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 mb-16 max-w-2xl">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
            Our Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Transforming operations with applied intelligence.
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {SERVICES.map((svc) => (
            <motion.div
              key={svc.title}
              variants={item}
              className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card/30 p-8 backdrop-blur-sm transition-all hover:bg-card hover:shadow-xl hover:shadow-black/5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-10 flex size-12 items-center justify-center rounded-xl bg-muted/50 border border-border group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors">
                <svc.icon className="size-5 text-foreground group-hover:text-primary transition-colors" />
              </div>
              
              <div className="relative z-10 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-foreground">{svc.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{svc.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
