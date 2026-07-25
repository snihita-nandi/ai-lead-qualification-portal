// Qualification domain type definitions

export type QualificationCriterionStatus = 'met' | 'not_met' | 'partial' | 'unknown';

export interface QualificationCriterion {
  id: string;
  label: string;
  weight: number;
  status: QualificationCriterionStatus;
  evidence?: string;
}

export interface QualificationResult {
  leadId: string;
  score: number;
  recommendation: 'qualify' | 'disqualify' | 'review';
  criteria: QualificationCriterion[];
  reasoning: string;
  confidence: number;
  generatedAt: string;
}

export interface QualificationWizardStep {
  id: string;
  title: string;
  description: string;
  isComplete: boolean;
}

export interface QualificationRequest {
  leadId: string;
  additionalContext?: string;
}
