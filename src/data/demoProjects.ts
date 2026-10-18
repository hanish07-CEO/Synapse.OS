import { AnalysisProject } from '../types/blindspot';

export const DEMO_PROJECTS: AnalysisProject[] = [
  {
    id: 'demo-talent-ai',
    title: 'TalentAI Automated Hiring & Resume Screening Pipeline',
    createdAt: '2026-10-15T09:30:00Z',
    analysisType: 'Product Requirements (PRD)',
    summary:
      'Pre-mortem analysis of the TalentAI candidate ranking architecture identified severe exposure under NYC Local Law 144 bias audit statutes, unbuffered Workday ATS rate limits, and unquantified resume parsing drift.',
    overallRiskScore: 86,
    riskLevel: 'Critical Risk',
    findings: [
      {
        id: 'f-talent-1',
        title: 'Unverified Statutory Compliance with NYC Local Law 144 Bias Audits',
        category: 'Security, Privacy & Compliance',
        evidence: 'Document assumes standard EEOC boilerplate satisfies automated employment decision tool rules.',
        evidenceType: 'Direct Quote',
        locationRef: 'Section 4.1 "Regulatory & Legal Safeguards"',
        whyItMatters:
          'NYC Local Law 144 and Illinois AI Video Interview Act mandate annual independent bias audits and published impact ratios before running automated candidate scoring.',
        potentialImpact:
          'Immediate civil penalties ($1,500/day per candidate violation) and mandatory operational shutdown of candidate scoring.',
        recommendedAction:
          'Commission third-party algorithmic audit with certified compliance auditor and publish historical impact ratio metrics.',
        suggestedOwner: 'Chief Legal & Compliance Officer',
        confidenceLevel: 'High',
        confidenceReason: 'Document describes automated candidate ranking without referencing statutory audit requirements.',
        status: 'Needs Review',
        priority: 'Critical',
        scores: {
          businessImpact: 9,
          probabilityFailure: 9,
          urgency: 9,
          costOfCorrectingLater: 9,
          confidenceScore: 9,
          compositeScore: 90,
        },
        priorityReasoning:
          'Violations trigger statutory civil liabilities and reputational disqualification in enterprise tenders.',
        remediationSuggestions: [
          {
            id: 's-1',
            title: 'Commission Independent Algorithmic Bias Audit',
            description: 'Retain external compliance auditor to run adverse impact ratio analyses on training datasets.',
            actionSteps: [
              'Extract historical candidate evaluation logs across demographic categories',
              'Calculate four-fifths rule selection rates across cohorts',
              'Publish official public audit summary on corporate trust portal',
            ],
            type: 'Regulatory Compliance',
            effort: 'Medium',
            estimatedRiskReduction: 25,
            suggestedOwner: 'VP Legal Affairs',
            adopted: false,
          },
        ],
      },
      {
        id: 'f-talent-2',
        title: 'Workday ATS Webhook Burst Rate-Limit Saturation',
        category: 'Unvalidated Dependencies',
        evidence: 'System polls candidate applications in real-time batches of 500 every 60 seconds.',
        evidenceType: 'Direct Quote',
        locationRef: 'Section 3.2 "Data Sync Architecture"',
        whyItMatters:
          'Workday REST API caps enterprise tenant calls at 25 concurrent requests and enforces aggressive HTTP 429 throttling without automatic buffer queues.',
        potentialImpact:
          'Dropped candidate submissions, silent job queue timeouts, and desynchronized recruitment pipelines during peak campus recruitment days.',
        recommendedAction:
          'Implement an asynchronous Redis BullMQ queue with exponential backoff and persistent dead-letter retry buffers.',
        suggestedOwner: 'Lead Backend Engineer',
        confidenceLevel: 'High',
        confidenceReason: 'Standard enterprise ATS API rate limits directly contradict the documented ingestion volume.',
        status: 'Needs Review',
        priority: 'High',
        scores: {
          businessImpact: 7,
          probabilityFailure: 8,
          urgency: 8,
          costOfCorrectingLater: 7,
          confidenceScore: 8,
          compositeScore: 75,
        },
        priorityReasoning:
          'High probability of silent pipeline failure during high-traffic hiring windows.',
      },
    ],
    questions: [
      {
        id: 'q-talent-1',
        question:
          'Has legal counsel verified that the candidate scoring pipeline satisfies NYC Local Law 144 independent audit requirements?',
        targetStakeholder: 'VP Legal & Regulatory Affairs',
        addressedFindingIds: ['f-talent-1'],
        context:
          'Determines whether model deployment must be delayed until third-party impact ratios are formally certified.',
        suggestedOptions: [
          'Yes, external audit completed and certified',
          'Audit in progress, expected in 6 weeks',
          'No audit planned; currently reviewing legal scope',
        ],
      },
    ],
  },
  {
    id: 'demo-clinical-ai',
    title: 'Acute ICU Sepsis Early-Warning Telemetry Engine',
    createdAt: '2026-10-14T14:15:00Z',
    analysisType: 'Technical Architecture',
    summary:
      'Pre-mortem analysis of bedside clinical warning models revealed severe nurse alert fatigue from uncalibrated false-positive thresholds, HL7 latency jitter, and unvalidated EHR downtime failovers.',
    overallRiskScore: 92,
    riskLevel: 'Critical Risk',
    findings: [
      {
        id: 'f-clin-1',
        title: 'Critical Bedside Nurse Alarm Fatigue from Low Positive Predictive Value',
        category: 'Operational & Financial Risks',
        evidence: 'Model triggers high-priority audio chime for any patient with probability > 0.40.',
        evidenceType: 'Direct Quote',
        locationRef: 'Section 5.3 "Bedside Notification Thresholds"',
        whyItMatters:
          'Sub-50% specificity triggers alert desensitization in ICU staff, causing real septic events to be dismissed as false positives.',
        potentialImpact:
          'Catastrophic delay in clinical septic shock intervention, severe patient morbidity, and malpractice risk.',
        recommendedAction:
          'Introduce tiered notification ladder: silent chart badge for low probability, SMS to rapid response nurse for confirmed anomalies.',
        suggestedOwner: 'Chief Medical Officer / Nursing Informatics Director',
        confidenceLevel: 'High',
        confidenceReason: 'Peer-reviewed critical care literature shows >85% alarm silencing when PPV falls below 0.60.',
        status: 'Needs Review',
        priority: 'Critical',
        scores: {
          businessImpact: 10,
          probabilityFailure: 9,
          urgency: 10,
          costOfCorrectingLater: 9,
          confidenceScore: 9,
          compositeScore: 94,
        },
        priorityReasoning:
          'Direct threat to patient safety and clinical compliance.',
      },
    ],
    questions: [
      {
        id: 'q-clin-1',
        question:
          'What is the validated Positive Predictive Value (PPV) in a real bedside ICU ward setting?',
        targetStakeholder: 'Director of Clinical Informatics',
        addressedFindingIds: ['f-clin-1'],
        context:
          'Ensures the alarm threshold does not overwhelm nursing staff with continuous false alarms.',
        suggestedOptions: [
          'PPV > 75% validated on ICU cohort',
          'PPV between 50-65% in retrospective test',
          'Retrospective only, not validated on live bedside stream',
        ],
      },
    ],
  },
  {
    id: 'demo-supply-chain',
    title: 'Cross-Border Automated Customs & Tariff Routing Engine',
    createdAt: '2026-10-13T11:00:00Z',
    analysisType: 'Business Workflow',
    summary:
      'Pre-mortem analysis of international freight clearance pipeline exposed unbuffered government customs portal API downtime, currency exchange rate drift, and missing HS tariff classification fallbacks.',
    overallRiskScore: 78,
    riskLevel: 'Elevated Risk',
    findings: [
      {
        id: 'f-supply-1',
        title: 'Single Point of Failure on Government Customs EDI Portal Availability',
        category: 'Unvalidated Dependencies',
        evidence: 'Synchronous clearance call made directly before port container release authorization.',
        evidenceType: 'Direct Quote',
        locationRef: 'Section 2.1 "Customs Filing Pipeline"',
        whyItMatters:
          'National customs filing portals experience scheduled weekend maintenance and unscheduled outages without automated failover states.',
        potentialImpact:
          'Demurrage penalties ($250/day per ocean container) and port terminal logistics gridlock.',
        recommendedAction:
          'Implement asynchronous pre-filing pipeline 48 hours prior to vessel arrival with secondary customs broker escrow.',
        suggestedOwner: 'Head of Global Logistics Operations',
        confidenceLevel: 'High',
        confidenceReason: 'Direct observation of synchronous dependency in mission-critical logistics workflow.',
        status: 'Needs Review',
        priority: 'High',
        scores: {
          businessImpact: 8,
          probabilityFailure: 8,
          urgency: 8,
          costOfCorrectingLater: 7,
          confidenceScore: 8,
          compositeScore: 78,
        },
        priorityReasoning:
          'Financial demurrage penalties compound rapidly across hundreds of stalled freight containers.',
      },
    ],
    questions: [
      {
        id: 'q-supply-1',
        question:
          'Is there an approved emergency manual release protocol when government customs servers fail to respond for > 4 hours?',
        targetStakeholder: 'Customs Compliance Director',
        addressedFindingIds: ['f-supply-1'],
        context:
          'Prevents multimillion-dollar port demurrage fees during official customs portal downtime.',
        suggestedOptions: [
          'Yes, bonded warehouse secondary clearance runbook active',
          'Standard paper filing backup available',
          'No automated fallback; shipments held at dock',
        ],
      },
    ],
  },
];
