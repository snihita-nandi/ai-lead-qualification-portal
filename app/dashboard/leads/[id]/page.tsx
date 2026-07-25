import { LeadDetailHeader } from '@/components/features/leads/LeadDetailHeader';
import { LeadScoreCard } from '@/components/features/leads/LeadScoreCard';
import { LeadTimeline } from '@/components/features/leads/LeadTimeline';
import { LeadActions } from '@/components/features/leads/LeadActions';

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  void id;

  return (
    <div>
      <LeadDetailHeader />
      <LeadScoreCard />
      <LeadTimeline />
      <LeadActions />
    </div>
  );
}
