export const BLINDSPOT_SYSTEM_INSTRUCTION = `
You are SYNAPSE, an elite Autonomous Pre-Mortem Risk & Assumption Discovery Engine.
Your job is to thoroughly stress-test project plans, product requirements documents (PRDs), architectural specs, and workflow briefs.
You uncover what teams never thought to question:
1. Missing Assumptions: Unstated dependencies, naive scale assumptions.
2. Ambiguous Requirements: Vague acceptance criteria, undefined edge cases.
3. Overlooked Constraints: Regulatory compliance (HIPAA, BIPA, GDPR, NYC Local Law 144), rate quotas, SLAs.
4. Unvalidated Dependencies: Third-party APIs, vendor availability, unbuffered networks.
5. Data & Quality Risks: Drift, sampling bias, prompt injection, missing validation.
6. Security, Privacy & Compliance: PII leakage, lack of audit trails, compliance boundaries.
7. Operational & Financial Risks: Alarm fatigue, manual overhead, sudden cloud egress costs.
8. Timeline & Technical Risks: Single points of failure, unrealistic milestones.

Respond ONLY with valid JSON conforming to the requested schema.
`;

export function buildAnalysisPrompt(content: string, analysisType: string, context: any) {
  return `
Perform an exhaustive pre-mortem analysis on this ${analysisType} brief:

${content}

Context Parameters:
- Timeline: ${context?.timelineWeeks || 'Not specified'} weeks
- Team Size: ${context?.teamSize || 'Not specified'}
- Budget: $${context?.budgetUsd || 'Not specified'}
- Industry: ${context?.industry || 'Technology'}
- Known Constraints: ${context?.knownConstraints || 'None specified'}

Output a strict JSON object with:
{
  "summary": "Executive pre-mortem summary (2-3 sentences)",
  "findings": [
    {
      "title": "Clear concise risk title",
      "category": "One of: Missing Assumptions, Ambiguous Requirements, Overlooked Constraints, Unvalidated Dependencies, Data & Quality Risks, Security, Privacy & Compliance, Operational & Financial Risks, Timeline & Technical Risks",
      "evidence": "Direct quote or explicit inferred text from document",
      "evidenceType": "Direct Quote | Inferred | Needs Validation",
      "locationRef": "Section or paragraph reference",
      "whyItMatters": "Why this creates systemic vulnerability",
      "potentialImpact": "Concrete fallout if unaddressed",
      "recommendedAction": "Actionable de-risking step",
      "suggestedOwner": "Specific organizational role",
      "confidenceLevel": "High | Medium | Low",
      "confidenceReason": "Justification for confidence rating",
      "scores": {
        "businessImpact": 8, // 1-10
        "probabilityFailure": 7, // 1-10
        "urgency": 8, // 1-10
        "costOfCorrectingLater": 9, // 1-10
        "confidenceScore": 8 // 1-10
      },
      "priorityReasoning": "Why this priority level was computed"
    }
  ],
  "questions": [
    {
      "question": "Probing architectural or operational question for stakeholders",
      "targetStakeholder": "Target role (e.g. Compliance Officer, Lead SRE)",
      "context": "Why answering this eliminates ambiguity",
      "suggestedOptions": ["Option A", "Option B", "Option C"]
    }
  ]
}
`;
}

export function buildReanalysisPrompt(projectData: any, answeredQuestion: any) {
  return `
A stakeholder has answered a critical pre-mortem question:
Question: ${answeredQuestion.question}
Answer: ${answeredQuestion.selectedAnswer || answeredQuestion.userCustomAnswer}
Target Finding IDs: ${JSON.stringify(answeredQuestion.addressedFindingIds)}

Recalculate residual risk and provide updated findings in JSON format.
`;
}
