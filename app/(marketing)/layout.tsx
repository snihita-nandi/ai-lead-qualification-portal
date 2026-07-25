import type { ReactNode } from 'react';

// Navbar and Footer are rendered by the root layout (app/layout.tsx).
// This layout exists as a route group organisational shell.
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
