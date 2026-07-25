import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/10" role="contentinfo">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Brand */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded w-fit"
            >
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
                <span className="font-mono text-[10px] font-bold text-primary leading-none">AI</span>
              </span>
              <span className="font-semibold tracking-[-0.03em] text-foreground">
                Consult<span className="text-primary">.</span>AI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Intelligent workflows and custom AI solutions that understand your business before our team does.
            </p>
          </div>

          {/* Legal / Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-foreground">Connect</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit">LinkedIn</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit">Twitter</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit">GitHub</a>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit">Terms of Service</a>
            </div>
          </div>
          
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Consult.AI. All rights reserved.
          </p>
          <p className="text-xs font-mono text-muted-foreground/50">
            Powered by n8n &amp; Gemini
          </p>
        </div>
      </div>
    </footer>
  );
}
