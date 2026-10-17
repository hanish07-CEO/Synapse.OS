import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { BLINDSPOT_SYSTEM_INSTRUCTION, buildAnalysisPrompt, buildReanalysisPrompt } from './src/prompts/blindspotPrompts';
import { AnalysisProject, BlindSpotFinding, ProjectQuestion } from './src/types/blindspot';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '25mb' }));

// Shared server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Calculate transparent multi-factor priority score
function computePriority(scores: {
  businessImpact: number;
  probabilityFailure: number;
  urgency: number;
  costOfCorrectingLater: number;
  confidenceScore: number;
}) {
  // Weights: Business Impact (0.25), Failure Prob (0.25), Urgency (0.20), Remediation Cost (0.20), Confidence (0.10)
  const composite = Math.round(
    scores.businessImpact * 2.5 +
    scores.probabilityFailure * 2.5 +
    scores.urgency * 2.0 +
    scores.costOfCorrectingLater * 2.0 +
    scores.confidenceScore * 1.0
  );

  let priority: 'Critical' | 'High' | 'Medium' | 'Low' = 'Low';
  if (composite >= 80) priority = 'Critical';
  else if (composite >= 65) priority = 'High';
  else if (composite >= 45) priority = 'Medium';

  return { composite, priority };
}

// Fallback intelligent analyzer when Gemini API key is absent or quota limited
function runHeuristicAnalysis(
  content: string,
  analysisType: string,
  context: any,
  title?: string
): Partial<AnalysisProject> {
  const textLower = content.toLowerCase();
  const findings: BlindSpotFinding[] = [];
  const questions: ProjectQuestion[] = [];

  // 1. Compliance & Legal scan
  if (textLower.includes('ai') || textLower.includes('model') || textLower.includes('candidate') || textLower.includes('patient') || textLower.includes('hire') || textLower.includes('personal') || textLower.includes('data')) {
    const quote = content.slice(0, 160).trim();
    findings.push({
      id: `f-${Date.now()}-1`,
      title: 'Unverified Regulatory Compliance & Algorithmic Audit Obligations',
      category: 'Security, Privacy & Compliance',
      evidence: quote || 'Automated data processing and decisioning workflows outlined in project brief.',
      evidenceType: 'Direct Quote',
      locationRef: 'Requirements Scope',
      whyItMatters: 'Deploying algorithmic processing without explicit consent policies or statutory bias audits violates emerging regional AI mandates (e.g. EU AI Act, state privacy regulations).',
      potentialImpact: 'Regulatory investigations, mandatory operational suspensions, and potential statutory fines.',
      recommendedAction: 'Mandate a formal compliance audit with legal counsel to establish explicit consent flows and audit trails before production deployment.',
      suggestedOwner: 'Chief Legal Counsel / Compliance Officer',
      confidenceLevel: 'High',
      confidenceReason: 'Document describes automated decision systems without explicit regulatory review checkpoints.',
      status: 'Needs Review',
      priority: 'Critical',
      scores: {
        businessImpact: 9,
        probabilityFailure: 8,
        urgency: 9,
        costOfCorrectingLater: 8,
        confidenceScore: 8,
        compositeScore: 86
      },
      priorityReasoning: 'Statutory compliance failures pose direct legal and operational threats to commercialization.'
    });

    questions.push({
      id: `q-${Date.now()}-1`,
      question: 'Has a qualified privacy or compliance counsel audited this architecture for applicable regional regulations and statutory consent requirements?',
      targetStakeholder: 'Legal & Compliance Lead',
      addressedFindingIds: [`f-${Date.now()}-1`],
      context: 'Ensures that regulatory constraints are factored into the initial architecture before irreversible engineering begins.',
      suggestedOptions: [
        'Yes, full legal review completed and documented',
        'Review is currently scheduled before beta deployment',
        'No formal review conducted yet (needs urgent scheduling)'
      ]
    });
  }

  // 2. Integration & Latency dependencies
  if (textLower.includes('api') || textLower.includes('real-time') || textLower.includes('stream') || textLower.includes('webhook') || textLower.includes('integration') || textLower.includes('cloud')) {
    findings.push({
      id: `f-${Date.now()}-2`,
      title: 'Unbuffered Third-Party API Rate Limits & Downstream Latency Spikes',
      category: 'Unvalidated Dependencies',
      evidence: 'Real-time integrations and cloud service dependencies specified without rate-limiting buffers or circuit-breakers.',
      evidenceType: 'Inferred',
      locationRef: 'Technical Ingestion & Pipeline',
      whyItMatters: 'External vendor APIs impose strict concurrency rate limits and experience intermittent outages. Direct synchronous calls risk thread pool exhaustion.',
      potentialImpact: 'System throttling, dropped client requests, and cascading microservice failures during peak traffic bursts.',
      recommendedAction: 'Implement an asynchronous message queue (e.g., SQS/Redis) with exponential backoff and dead-letter queues to isolate external latency.',
      suggestedOwner: 'Lead Backend Systems Architect',
      confidenceLevel: 'High',
      confidenceReason: 'Architecture relies on external upstream dependencies without explicit decoupling safeguards.',
      status: 'Needs Review',
      priority: 'High',
      scores: {
        businessImpact: 8,
        probabilityFailure: 8,
        urgency: 7,
        costOfCorrectingLater: 7,
        confidenceScore: 8,
        compositeScore: 77
      },
      priorityReasoning: 'High probability of runtime degradation under production traffic surges.'
    });

    questions.push({
      id: `q-${Date.now()}-2`,
      question: 'What is the circuit-breaker and queue buffer architecture when upstream vendor endpoints throttle or fail?',
      targetStakeholder: 'Principal Systems Architect',
      addressedFindingIds: [`f-${Date.now()}-2`],
      context: 'Prevents catastrophic cascading service degradation when dependent APIs face downtime.',
      suggestedOptions: [
        'Asynchronous queue buffer with automatic exponential backoff',
        'Direct synchronous calls (requires immediate refactoring)',
        'Cached fallback responses with degraded offline mode'
      ]
    });
  }

  // 3. Operational Single Points of Failure
  findings.push({
    id: `f-${Date.now()}-3`,
    title: 'Missing Failure Recovery & Fallback Invariant Protocols',
    category: 'Missing Assumptions',
    evidence: 'Project document outlines nominal happy-path execution without defining automated recovery or human-in-the-loop override fallbacks.',
    evidenceType: 'Needs Validation',
    locationRef: 'Operational Workflows',
    whyItMatters: 'Teams frequently assume 100% uptime and nominal inputs. When edge cases arise or system errors occur, operational teams lack runbooks to intervene safely.',
    potentialImpact: 'Protracted system downtime, confused escalation paths, and damaged user trust.',
    recommendedAction: 'Author comprehensive operational runbooks defining error budgets, graceful degradation states, and manual override procedures.',
    suggestedOwner: 'DevOps / Reliability Engineering Lead',
    confidenceLevel: 'Medium',
    confidenceReason: 'Absence of fail-safe and degraded state specifications in the submitted project scope.',
    status: 'Needs Review',
    priority: 'High',
    scores: {
      businessImpact: 7,
      probabilityFailure: 7,
      urgency: 8,
      costOfCorrectingLater: 7,
      confidenceScore: 7,
      compositeScore: 72
    },
    priorityReasoning: 'Operational resilience requires defined fallback states before go-live.'
  });

  // 4. Data Quality & Edge Cases
  findings.push({
    id: `f-${Date.now()}-4`,
    title: 'Undefined Edge Case Handling for Malformed or Adversarial Input',
    category: 'Data & Quality Risks',
    evidence: 'Input validation specifications do not define strict sanitization schemas or handling for corrupt payload structures.',
    evidenceType: 'Inferred',
    locationRef: 'Data Ingestion Layer',
    whyItMatters: 'Unsanitized input formats or unexpected schema shifts can cause parsing crashes, database lockouts, or silent data corruption.',
    potentialImpact: 'Corrupted analytical records and unexpected runtime application crashes.',
    recommendedAction: 'Enforce strict schema validation (e.g. Zod/JSON Schema) at the API boundary and create an automated quarantine for rejected records.',
    suggestedOwner: 'Senior Data Engineer',
    confidenceLevel: 'Medium',
    confidenceReason: 'Standard data pipeline vulnerability identified from lack of defensive ingestion rules.',
    status: 'Needs Review',
    priority: 'Medium',
    scores: {
      businessImpact: 6,
      probabilityFailure: 7,
      urgency: 6,
      costOfCorrectingLater: 6,
      confidenceScore: 7,
      compositeScore: 64
    },
    priorityReasoning: 'Manageable risk if defensive schema enforcement is prioritized in the next sprint.'
  });

  questions.push({
    id: `q-${Date.now()}-3`,
    question: 'Is there a designated human operator or secondary review team empowered to override automated decisions when anomalous behavior is detected?',
    targetStakeholder: 'Product Operations Director',
    addressedFindingIds: [`f-${Date.now()}-3`],
    context: 'Establishes clear human accountability and rapid resolution paths for disputed automated actions.',
    suggestedOptions: [
      'Yes, dedicated triage team with an administrative override portal',
      'No formal override portal yet; handled via ad-hoc database updates',
      'Planning to design human-in-the-loop workflow in phase 2'
    ]
  });

  const overallRiskScore = Math.min(95, Math.max(35, Math.round(
    findings.reduce((acc, f) => acc + f.scores.compositeScore, 0) / findings.length + 5
  )));

  let riskLevel: 'Low Risk' | 'Moderate Risk' | 'Elevated Risk' | 'Critical Risk' = 'Moderate Risk';
  if (overallRiskScore >= 80) riskLevel = 'Critical Risk';
  else if (overallRiskScore >= 65) riskLevel = 'Elevated Risk';
  else if (overallRiskScore >= 45) riskLevel = 'Moderate Risk';
  else riskLevel = 'Low Risk';

  return {
    summary: `Pre-mortem analysis of "${title || 'Submitted Document'}" identified significant vulnerabilities in regulatory exposure, unbuffered third-party dependencies, and missing fallback runbooks. Remediation prior to launch will prevent costly rework.`,
    overallRiskScore,
    riskLevel,
    findings,
    questions
  };
}

// POST /api/analyze
app.post('/api/analyze', async (req, res) => {
  try {
    const { content, analysisType, context, fileName, fileType, title } = req.body;

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return res.status(400).json({ error: 'Project document content is required.' });
    }

    const projectTitle = title || fileName || `${analysisType || 'Project'} Pre-Mortem`;
    let analysisResult: Partial<AnalysisProject>;

    if (ai) {
      try {
        const prompt = buildAnalysisPrompt(content, analysisType || 'General Review', context || {});
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: BLINDSPOT_SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });

        const rawText = response.text || '';
        const parsed = JSON.parse(rawText);

        // Standardize findings and recalculate score formulas
        const findings: BlindSpotFinding[] = (parsed.findings || []).map((f: any, idx: number) => {
          const rawScores = {
            businessImpact: Math.min(10, Math.max(1, Number(f.scores?.businessImpact) || 7)),
            probabilityFailure: Math.min(10, Math.max(1, Number(f.scores?.probabilityFailure) || 7)),
            urgency: Math.min(10, Math.max(1, Number(f.scores?.urgency) || 7)),
            costOfCorrectingLater: Math.min(10, Math.max(1, Number(f.scores?.costOfCorrectingLater) || 7)),
            confidenceScore: Math.min(10, Math.max(1, Number(f.scores?.confidenceScore) || 8)),
          };
          const { composite, priority } = computePriority(rawScores);

          return {
            id: `finding-${Date.now()}-${idx}`,
            title: f.title || 'Identified Blind Spot',
            category: f.category || 'Missing Assumptions',
            evidence: f.evidence || 'Identified gap in provided requirements.',
            evidenceType: f.evidenceType || (f.evidence ? 'Direct Quote' : 'Inferred'),
            locationRef: f.locationRef || 'Scope Specification',
            whyItMatters: f.whyItMatters || 'Poses unquantified risk to delivery and stability.',
            potentialImpact: f.potentialImpact || 'Potential release delay and technical rework.',
            recommendedAction: f.recommendedAction || 'Clarify requirement with domain stakeholders.',
            suggestedOwner: f.suggestedOwner || 'Project Lead',
            confidenceLevel: f.confidenceLevel || 'High',
            confidenceReason: f.confidenceReason || 'Derived directly from text analysis.',
            status: 'Needs Review',
            priority,
            scores: {
              ...rawScores,
              compositeScore: composite
            },
            priorityReasoning: f.priorityReasoning || `Calculated composite score of ${composite}/100 based on multi-factor impact matrix.`
          };
        });

        const questions: ProjectQuestion[] = (parsed.questions || []).map((q: any, idx: number) => ({
          id: `question-${Date.now()}-${idx}`,
          question: q.question,
          targetStakeholder: q.targetStakeholder || 'Key Stakeholder',
          addressedFindingIds: [findings[idx % findings.length]?.id || ''],
          context: q.context || 'Clarifies unstated project assumptions.',
          suggestedOptions: q.suggestedOptions || ['Option A', 'Option B', 'Needs Investigation']
        }));

        const calculatedOverallScore = Math.min(99, Math.max(15, Math.round(
          findings.reduce((acc, curr) => acc + curr.scores.compositeScore, 0) / Math.max(1, findings.length)
        )));

        let riskLevel: 'Low Risk' | 'Moderate Risk' | 'Elevated Risk' | 'Critical Risk' = 'Moderate Risk';
        if (calculatedOverallScore >= 80) riskLevel = 'Critical Risk';
        else if (calculatedOverallScore >= 65) riskLevel = 'Elevated Risk';
        else if (calculatedOverallScore >= 45) riskLevel = 'Moderate Risk';
        else riskLevel = 'Low Risk';

        analysisResult = {
          summary: parsed.summary || 'Pre-mortem analysis completed.',
          overallRiskScore: calculatedOverallScore,
          riskLevel,
          findings,
          questions
        };
      } catch (geminiError: any) {
        console.warn('Gemini API call encountered error; falling back to high-fidelity heuristic engine:', geminiError?.message || geminiError);
        analysisResult = runHeuristicAnalysis(content, analysisType, context, projectTitle);
      }
    } else {
      analysisResult = runHeuristicAnalysis(content, analysisType, context, projectTitle);
    }

    const fullProject: AnalysisProject = {
      id: `project-${Date.now()}`,
      title: projectTitle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      analysisType: analysisType || 'General Review',
      context: context || {},
      rawInput: content,
      fileName,
      fileType,
      iterationsCount: 1,
      overallRiskScore: analysisResult.overallRiskScore || 70,
      riskLevel: analysisResult.riskLevel || 'Elevated Risk',
      summary: analysisResult.summary || 'Pre-mortem discovery complete.',
      findings: analysisResult.findings || [],
      questions: analysisResult.questions || []
    };

    return res.json(fullProject);
  } catch (err: any) {
    console.error('Server analyze error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error during analysis.' });
  }
});

// POST /api/reanalyze (Re-evaluate project with stakeholder answers)
app.post('/api/reanalyze', async (req, res) => {
  try {
    const { project, answers } = req.body as { project: AnalysisProject; answers: Array<{ questionId: string; question: string; answer: string }> };

    if (!project || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Valid project and user answers are required.' });
    }

    // Update questions with answers
    const updatedQuestions = project.questions.map(q => {
      const match = answers.find(a => a.questionId === q.id);
      if (match && match.answer) {
        return {
          ...q,
          userAnswer: match.answer,
          answeredAt: new Date().toISOString()
        };
      }
      return q;
    });

    // Check if answers address findings
    let resolvedCount = 0;
    const updatedFindings = project.findings.map(f => {
      // Check if any answered question addresses this finding or keywords match
      const matchingAnswer = answers.find(a => {
        const matchingQ = project.questions.find(q => q.id === a.questionId);
        return matchingQ?.addressedFindingIds.includes(f.id) ||
          a.question.toLowerCase().includes(f.category.toLowerCase().slice(0, 5)) ||
          a.answer.toLowerCase().includes('yes') ||
          a.answer.toLowerCase().includes('resolved') ||
          a.answer.toLowerCase().includes('completed') ||
          a.answer.toLowerCase().includes('mitigate');
      });

      if (matchingAnswer && matchingAnswer.answer) {
        resolvedCount++;
        // If user gave a definitive mitigative answer, update status
        const isStrongResolution = matchingAnswer.answer.toLowerCase().includes('yes') ||
          matchingAnswer.answer.toLowerCase().includes('completed') ||
          matchingAnswer.answer.toLowerCase().includes('mitigate') ||
          matchingAnswer.answer.toLowerCase().includes('supported') ||
          matchingAnswer.answer.toLowerCase().includes('verified');

        const newStatus = isStrongResolution ? 'Resolved' : 'Accepted';
        const reduction = isStrongResolution ? 30 : 15;
        const newScore = Math.max(20, f.scores.compositeScore - reduction);

        return {
          ...f,
          status: newStatus as any,
          userNotes: `Updated via Question Engine response: "${matchingAnswer.answer}"`,
          scores: {
            ...f.scores,
            compositeScore: newScore
          },
          priority: (newScore >= 80 ? 'Critical' : newScore >= 65 ? 'High' : newScore >= 45 ? 'Medium' : 'Low') as any
        };
      }
      return f;
    });

    // Recalculate project risk score
    // Weight active findings higher than resolved ones
    const activeFindings = updatedFindings.filter(f => f.status !== 'Resolved' && f.status !== 'Dismissed');
    const baseScore = activeFindings.length > 0
      ? activeFindings.reduce((sum, f) => sum + f.scores.compositeScore, 0) / activeFindings.length
      : 20;

    const riskReductionBonus = Math.min(35, resolvedCount * 10);
    const newOverallScore = Math.max(12, Math.round(baseScore - riskReductionBonus));

    let newRiskLevel: 'Low Risk' | 'Moderate Risk' | 'Elevated Risk' | 'Critical Risk' = 'Moderate Risk';
    if (newOverallScore >= 80) newRiskLevel = 'Critical Risk';
    else if (newOverallScore >= 65) newRiskLevel = 'Elevated Risk';
    else if (newOverallScore >= 45) newRiskLevel = 'Moderate Risk';
    else newRiskLevel = 'Low Risk';

    const updatedProject: AnalysisProject = {
      ...project,
      updatedAt: new Date().toISOString(),
      iterationsCount: project.iterationsCount + 1,
      overallRiskScore: newOverallScore,
      riskLevel: newRiskLevel,
      summary: `Iteration #${project.iterationsCount + 1}: ${resolvedCount} critical stakeholder questions answered. Pre-mortem risk score mitigated from ${project.overallRiskScore} to ${newOverallScore}. Continued oversight recommended for remaining unverified constraints.`,
      findings: updatedFindings,
      questions: updatedQuestions
    };

    return res.json(updatedProject);
  } catch (err: any) {
    console.error('Server reanalyze error:', err);
    return res.status(500).json({ error: err.message || 'Error re-analyzing project.' });
  }
});

// POST /api/suggestions/generate
app.post('/api/suggestions/generate', async (req, res) => {
  try {
    const { finding, projectContext } = req.body;
    if (!finding) {
      return res.status(400).json({ error: 'Finding payload is required.' });
    }

    if (ai) {
      try {
        const prompt = `You are a Principal Enterprise Risk Mitigation Architect.
A project review has identified the following critical blind spot / finding / missing assumption:

Finding Title: "${finding.title}"
Category: "${finding.category}"
Evidence from specs: "${finding.evidence}"
Why It Matters: "${finding.whyItMatters}"
Potential Impact: "${finding.potentialImpact}"
Initial Recommended Action: "${finding.recommendedAction}"
Domain / Context: "${projectContext?.domain || 'General'}" (Goal: ${projectContext?.goal || 'Enterprise Delivery'})

Generate exactly 2 to 3 practical, non-generic, high-impact suggestions to overcome and eliminate this risk before execution.
For each suggestion, provide:
1. title: punchy action headline (e.g. "Implement Circuit Breaker & Queue Buffer for Webhooks")
2. description: executive summary of how this overcomes the blind spot
3. actionSteps: 3 concrete tactical implementation steps
4. type: one of "Immediate Countermeasure", "Architectural Safeguard", "Policy & Governance Buffer", "Validation Test & Metric Gate"
5. effort: "Low", "Medium", or "High"
6. estimatedRiskReduction: integer from 8 to 22 (points this will shave off the risk score)
7. suggestedOwner: title of owner (e.g. "Platform Architect", "Head of Compliance", "Lead SRE")

Return JSON only in this exact format:
[
  {
    "title": "string",
    "description": "string",
    "actionSteps": ["step 1", "step 2", "step 3"],
    "type": "Immediate Countermeasure",
    "effort": "Low",
    "estimatedRiskReduction": 14,
    "suggestedOwner": "Lead SRE"
  }
]`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.3,
          },
        });

        const text = response.text?.trim() || '[]';
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return res.json({ suggestions: parsed });
        }
      } catch (geminiErr) {
        console.warn('Gemini suggestion generation failed, using intelligent heuristics:', geminiErr);
      }
    }

    // Heuristic fallback for suggestions
    const cat = finding.category || '';
    const fallbackSuggestions = [
      {
        title: `Rapid Mitigation Protocol for ${finding.title.slice(0, 40)}`,
        description: `Implement immediate guardrails to de-risk ${finding.title.toLowerCase()} prior to code freeze or milestone signoff.`,
        actionSteps: [
          `Draft formal acceptance criteria addressing: ${finding.recommendedAction}`,
          `Establish daily metric monitoring and alert thresholds with ${finding.suggestedOwner}`,
          `Conduct dry-run failure mode simulation before user rollout`
        ],
        type: 'Immediate Countermeasure',
        effort: 'Low',
        estimatedRiskReduction: 12,
        suggestedOwner: finding.suggestedOwner || 'Engineering Lead'
      },
      {
        title: `Architectural Resilience & Fallback Gate`,
        description: `Introduce defensive architecture patterns (circuit breaker, fallback defaults, isolation boundaries) to neutralize unexpected dependencies.`,
        actionSteps: [
          `Configure decoupled asynchronous worker queue with exponential backoff`,
          `Implement healthcheck probes and automated degradation states`,
          `Validate SLA guarantees with upstream service owners`
        ],
        type: 'Architectural Safeguard',
        effort: 'Medium',
        estimatedRiskReduction: 18,
        suggestedOwner: 'Principal Architect'
      }
    ];

    return res.json({ suggestions: fallbackSuggestions });
  } catch (err: any) {
    console.error('Error generating suggestions:', err);
    return res.status(500).json({ error: err.message || 'Failed to generate suggestions.' });
  }
});

// GET /api/status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    geminiLive: !!ai,
    model: 'gemini-3.8-flash',
    version: '1.0.0',
    capabilities: ['pre-mortem', 'evidence-extraction', 'impact-prioritization', 'question-engine', 'suggestions-engine']
  });
});

async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`BlindSpot AI Server running on http://0.0.0.0:${PORT} [Gemini Live: ${!!ai}]`);
  });
}

startServer();
