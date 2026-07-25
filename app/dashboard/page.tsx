import { DashboardHeader } from '@/components/features/dashboard/DashboardHeader';
import { StatsGrid } from '@/components/features/dashboard/StatsGrid';
import { LeadFunnelChart } from '@/components/features/dashboard/LeadFunnelChart';
import { RecentActivityFeed } from '@/components/features/dashboard/RecentActivityFeed';

export default function DashboardPage() {
  return (
    <div>
      <DashboardHeader />
      <StatsGrid />
      <LeadFunnelChart />
      <RecentActivityFeed />
    </div>
  );
}
