import { AnalysisProject } from '../types/blindspot';

export async function analyzeProjectDocument(payload: {
  content: string;
  analysisType: string;
  context: any;
  title?: string;
  fileName?: string;
  fileType?: string;
}): Promise<AnalysisProject> {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to analyze project document.');
  }

  const data = await res.json();
  return data.project;
}

export async function reanalyzeWithAnswer(payload: {
  project: AnalysisProject;
  questionId: string;
  selectedAnswer: string;
  userCustomAnswer?: string;
}): Promise<AnalysisProject> {
  const res = await fetch('/api/reanalyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to reanalyze with answer.');
  }

  const data = await res.json();
  return data.project;
}

export async function generateRemediationSuggestions(finding: any) {
  const res = await fetch('/api/suggestions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ finding }),
  });

  if (!res.ok) {
    throw new Error('Failed to generate suggestions.');
  }

  const data = await res.json();
  return data.suggestions || [];
}

export async function fetchSystemStatus() {
  const res = await fetch('/api/status');
  if (!res.ok) throw new Error('Status check failed');
  return res.json();
}
