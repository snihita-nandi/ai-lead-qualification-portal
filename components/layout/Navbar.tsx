'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#process',  label: 'Process'  },
  { href: '#contact',  label: 'Contact'  },
] as const;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: 'smooth' });
      setIsMobileOpen(false);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-xl shadow-sm shadow-black/20'
          : 'bg-transparent'
      )}
      role="banner"
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
          aria-label="AI Consultancy — go to homepage"
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
            <span className="font-mono text-[10px] font-bold text-primary leading-none">AI</span>
          </span>
          <span className="font-semibold tracking-[-0.03em] text-foreground">
            Consult<span className="text-primary">.</span>AI
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex" role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              role="listitem"
              onClick={(e) => handleNavClick(e, href)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>
            <Button
              size="sm"
              id="navbar-cta"
              className="rounded-full px-5 font-semibold shadow-md shadow-primary/20 hover:shadow-primary/30"
            >
              Request Consultation
            </Button>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setIsMobileOpen((v) => !v)}
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
          className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          {isMobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="mt-2"
              >
                <Button
                  size="sm"
                  id="navbar-mobile-cta"
                  className="w-full rounded-full font-semibold"
                >
                  Request Consultation
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
