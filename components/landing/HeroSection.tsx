'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { HeroVisualization } from './HeroVisualization';

export function HeroSection() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 px-5 sm:px-8 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-6 text-left"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary w-fit">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Next-Generation AI Consulting
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.1]">
            AI Solutions that understand your business <span className="text-muted-foreground">before our team does.</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            We build intelligent workflows that qualify, categorize, and route inquiries automatically. Experience a smarter way to connect.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Button size="lg" onClick={scrollToContact} className="rounded-full shadow-lg shadow-primary/20 h-12 px-8">
              Request Consultation
            </Button>
            <Button size="lg" variant="outline" onClick={scrollToServices} className="rounded-full h-12 px-8 border-border bg-card/50 hover:bg-muted/50 backdrop-blur-sm">
              Explore Services
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="flex justify-center lg:justify-end"
        >
          <HeroVisualization />
        </motion.div>
      </div>
    </section>
  );
}
