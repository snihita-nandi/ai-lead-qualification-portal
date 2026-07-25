import type { ReactNode } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Sidebar />
      <div>
        <Topbar />
        <main>{children}</main>
      </div>
    </div>
  );
}
