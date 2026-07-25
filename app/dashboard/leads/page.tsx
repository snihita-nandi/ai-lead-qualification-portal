import { LeadsTable } from '@/components/features/leads/LeadsTable';
import { LeadFilters } from '@/components/features/leads/LeadFilters';
import { LeadSearchBar } from '@/components/features/leads/LeadSearchBar';

export default function LeadsPage() {
  return (
    <div>
      <LeadSearchBar />
      <LeadFilters />
      <LeadsTable />
    </div>
  );
}
