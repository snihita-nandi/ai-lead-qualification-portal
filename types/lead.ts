// Lead domain type definitions

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'disqualified' | 'converted';

export type LeadSource =
  | 'organic'
  | 'paid'
  | 'referral'
  | 'social'
  | 'email'
  | 'direct'
  | 'other';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  jobTitle: string;
  status: LeadStatus;
  source: LeadSource;
  score: number;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  notes?: string;
}

export interface LeadFilters {
  status?: LeadStatus[];
  source?: LeadSource[];
  scoreMin?: number;
  scoreMax?: number;
  assignedTo?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface LeadSortOptions {
  field: keyof Lead;
  direction: 'asc' | 'desc';
}

export interface LeadActivity {
  id: string;
  leadId: string;
  type: 'note' | 'email' | 'call' | 'status_change' | 'score_update';
  description: string;
  createdAt: string;
  createdBy: string;
}
