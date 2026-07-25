// Analytics domain type definitions

export interface TimeSeries {
  date: string;
  value: number;
}

export interface FunnelStage {
  name: string;
  count: number;
  conversionRate: number;
}

export interface SourceBreakdownItem {
  source: string;
  count: number;
  percentage: number;
}

export interface AnalyticsOverview {
  totalLeads: number;
  qualifiedLeads: number;
  conversionRate: number;
  averageScore: number;
  leadsTrend: TimeSeries[];
  conversionTrend: TimeSeries[];
}

export interface AnalyticsDateRange {
  from: string;
  to: string;
  preset?: '7d' | '30d' | '90d' | '12m' | 'custom';
}
