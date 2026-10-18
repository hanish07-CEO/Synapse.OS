import { AnalysisProject, FindingStatus } from '../types/blindspot';
import { DEMO_PROJECTS } from '../data/demoProjects';

const STORAGE_KEY = 'blindspot_ai_projects';
const ACTIVE_ID_KEY = 'blindspot_ai_active_id';

export function getStoredProjects(): AnalysisProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_PROJECTS));
      return DEMO_PROJECTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEMO_PROJECTS;
  } catch (e) {
    console.error('Failed to load projects from storage:', e);
    return DEMO_PROJECTS;
  }
}

export function saveProject(project: AnalysisProject): void {
  const projects = getStoredProjects();
  const existingIdx = projects.findIndex((p) => p.id === project.id);
  if (existingIdx >= 0) {
    projects[existingIdx] = project;
  } else {
    projects.unshift(project);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  setActiveProjectId(project.id);
}

export function deleteProject(id: string): void {
  const projects = getStoredProjects().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  if (getActiveProjectId() === id) {
    localStorage.removeItem(ACTIVE_ID_KEY);
  }
}

export function getActiveProjectId(): string {
  return localStorage.getItem(ACTIVE_ID_KEY) || DEMO_PROJECTS[0].id;
}

export function setActiveProjectId(id: string): void {
  localStorage.setItem(ACTIVE_ID_KEY, id);
}

export function recalculateProjectRisk(project: AnalysisProject): void {
  const activeFindings = project.findings.filter(
    (f) => f.status !== 'Resolved' && f.status !== 'Dismissed'
  );
  if (activeFindings.length === 0) {
    project.overallRiskScore = 15;
    project.riskLevel = 'Low Risk';
  } else {
    const avgScore =
      activeFindings.reduce((sum, f) => sum + f.scores.compositeScore, 0) /
      activeFindings.length;
    const criticalCount = activeFindings.filter((f) => f.priority === 'Critical').length;
    const highCount = activeFindings.filter((f) => f.priority === 'High').length;
    const finalScore = Math.min(
      99,
      Math.max(15, Math.round(avgScore + criticalCount * 4 + highCount * 1.5))
    );
    project.overallRiskScore = finalScore;
    if (finalScore >= 80) project.riskLevel = 'Critical Risk';
    else if (finalScore >= 65) project.riskLevel = 'Elevated Risk';
    else if (finalScore >= 45) project.riskLevel = 'Moderate Risk';
    else project.riskLevel = 'Low Risk';
  }
}

export function updateFindingStatusInProject(
  projectId: string,
  findingId: string,
  status: FindingStatus,
  notes?: string
): AnalysisProject | null {
  const projects = getStoredProjects();
  const project = projects.find((p) => p.id === projectId);
  if (!project) return null;

  const finding = project.findings.find((f) => f.id === findingId);
  if (!finding) return null;

  finding.status = status;
  if (notes !== undefined) {
    finding.userNotes = notes;
  }

  recalculateProjectRisk(project);
  saveProject(project);
  return project;
}

export function resetToDemoProjects(): AnalysisProject[] {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_PROJECTS));
  setActiveProjectId(DEMO_PROJECTS[0].id);
  return DEMO_PROJECTS;
}

export function toggleAdoptSuggestion(
  projectId: string,
  findingId: string,
  suggestionId: string
): AnalysisProject | null {
  const projects = getStoredProjects();
  const project = projects.find((p) => p.id === projectId);
  if (!project) return null;

  const finding = project.findings.find((f) => f.id === findingId);
  if (!finding || !finding.remediationSuggestions) return null;

  const suggestion = finding.remediationSuggestions.find((s) => s.id === suggestionId);
  if (!suggestion) return null;

  suggestion.adopted = !suggestion.adopted;

  if (suggestion.adopted) {
    finding.scores.compositeScore = Math.max(
      15,
      finding.scores.compositeScore - suggestion.estimatedRiskReduction
    );
    if (finding.status === 'Needs Review') {
      finding.status = 'Mitigated';
    }
  } else {
    finding.scores.compositeScore = Math.min(
      99,
      finding.scores.compositeScore + suggestion.estimatedRiskReduction
    );
  }

  recalculateProjectRisk(project);
  saveProject(project);
  return project;
}

export function addSuggestionToFinding(
  projectId: string,
  findingId: string,
  suggestionData: any
): AnalysisProject | null {
  const projects = getStoredProjects();
  const project = projects.find((p) => p.id === projectId);
  if (!project) return null;

  const finding = project.findings.find((f) => f.id === findingId);
  if (!finding) return null;

  if (!finding.remediationSuggestions) {
    finding.remediationSuggestions = [];
  }

  const newSuggestion = {
    id: `sug-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    title: suggestionData.title,
    description: suggestionData.description,
    actionSteps: suggestionData.actionSteps || [],
    type: suggestionData.type || 'Custom Action',
    effort: suggestionData.effort || 'Medium',
    estimatedRiskReduction: Number(suggestionData.estimatedRiskReduction) || 10,
    suggestedOwner: suggestionData.suggestedOwner || 'Assigned Lead',
    adopted: false,
    suggestedBy: suggestionData.suggestedBy || 'User',
  };

  finding.remediationSuggestions.push(newSuggestion);
  saveProject(project);
  return project;
}
