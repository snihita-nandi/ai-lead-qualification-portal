import { AnalyticsHeader } from '@/components/features/analytics/AnalyticsHeader';
import { ConversionChart } from '@/components/features/analytics/ConversionChart';
import { SourceBreakdown } from '@/components/features/analytics/SourceBreakdown';
import { QualificationTrends } from '@/components/features/analytics/QualificationTrends';

export default function AnalyticsPage() {
  return (
    <div>
      <AnalyticsHeader />
      <ConversionChart />
      <SourceBreakdown />
      <QualificationTrends />
    </div>
  );
}
