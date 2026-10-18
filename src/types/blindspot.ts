export type FindingCategory =
  | 'Missing Assumptions'
  | 'Ambiguous Requirements'
  | 'Overlooked Constraints'
  | 'Unvalidated Dependencies'
  | 'Data & Quality Risks'
  | 'Security, Privacy & Compliance'
  | 'Operational & Financial Risks'
  | 'Timeline & Technical Risks';

export type EvidenceType = 'Direct Quote' | 'Inferred' | 'Needs Validation';
export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type FindingStatus = 'Needs Review' | 'Accepted' | 'Mitigated' | 'Resolved' | 'Dismissed';

export interface MultiFactorScores {
  businessImpact: number; // 1-10
  probabilityFailure: number; // 1-10
  urgency: number; // 1-10
  costOfCorrectingLater: number; // 1-10
  confidenceScore: number; // 1-10
  compositeScore: number; // 0-100
}

export interface RemediationSuggestion {
  id: string;
  title: string;
  description: string;
  actionSteps: string[];
  type: string;
  effort: 'Low' | 'Medium' | 'High';
  estimatedRiskReduction: number;
  suggestedOwner: string;
  adopted?: boolean;
  suggestedBy?: string;
}

export interface BlindSpotFinding {
  id: string;
  title: string;
  category: FindingCategory;
  evidence: string;
  evidenceType: EvidenceType;
  locationRef: string;
  whyItMatters: string;
  potentialImpact: string;
  recommendedAction: string;
  suggestedOwner: string;
  confidenceLevel: 'High' | 'Medium' | 'Low';
  confidenceReason: string;
  status: FindingStatus;
  priority: PriorityLevel;
  scores: MultiFactorScores;
  priorityReasoning: string;
  remediationSuggestions?: RemediationSuggestion[];
  userNotes?: string;
}

export interface ProjectQuestion {
  id: string;
  question: string;
  targetStakeholder: string;
  addressedFindingIds: string[];
  context: string;
  suggestedOptions?: string[];
  answered?: boolean;
  selectedAnswer?: string;
  userCustomAnswer?: string;
}

export interface AnalysisProject {
  id: string;
  title: string;
  createdAt: string;
  updatedAt?: string;
  iterationsCount?: number;
  analysisType: string;
  summary: string;
  overallRiskScore: number; // 0-100
  riskLevel: 'Low Risk' | 'Moderate Risk' | 'Elevated Risk' | 'Critical Risk';
  findings: BlindSpotFinding[];
  questions: ProjectQuestion[];
  rawContent?: string;
  rawInput?: string;
  fileName?: string;
  fileType?: string;
  context?: {
    timelineWeeks?: number;
    teamSize?: number;
    budgetUsd?: number;
    industry?: string;
    knownConstraints?: string;
  };
}
