# BlindSpot AI: Intelligent Pre-Mortem Risk & Assumption Discovery System

> **"Find the iceberg before the ship leaves port."**  
> BlindSpot AI stress-tests project documents, requirements, datasets, and workflows before execution begins. It uncovers unstated assumptions, ambiguous requirements, overlooked regulatory constraints, and unbuffered dependencies, calculates transparent impact-based risk priorities, and delivers an interactive Question Engine that iteratively re-analyzes and de-risks your roadmap.

---

## 1. Problem Statement & Mission

Engineering and product initiatives rarely fail from poor execution alone; they fail from what teams never thought to question:
- Blind reliance on unstated regulatory exemptions (e.g. NYC Local Law 144 bias audits or Illinois BIPA biometric retention).
- Hidden data drift, survival bias, or un-anonymized cross-border telemetry (GDPR Chapter V / FERPA).
- Upstream rate limits and latency bottlenecks (Workday ATS API quotas, EHR HL7 latency).
- Acute clinical or operational human factors (ICU nurse alarm fatigue, faculty union IP copyrights).

**BlindSpot AI** is structured into **three distinct levels**:
1. **Level 1: Public Landing Page** — Product overview, anti-hallucination philosophy, interactive capabilities, and benchmark previews.
2. **Level 2: Authentication Portal** — Enterprise sign-in/sign-up and instant 1-click role logins for demonstration personas (Product Lead, Clinical Informaticist, Tech Director).
3. **Level 3: Authenticated Workspace & Dashboard** — Full pre-mortem suite including live Risk Meters, 5-factor scoring breakdowns, detailed findings with evidence citations, the interactive Question Engine, and exportable executive reports.

---

## 2. Key Capabilities & Feature Set

### 1. Multi-Format Input Workspace
- Upload `.pdf`, `.docx`, `.txt`, `.csv`, `.xlsx`, or `.json` project files.
- Direct text paste workspace with instant sample loaders (PRD, Business Workflow, Data Model Specification).
- 6 Analysis Scopes: *Project Plan*, *Product Requirements*, *Dataset & Schema*, *Business Workflow*, *Technical Architecture*, and *General Pre-Mortem Review*.
- Context parameters: Timeline, Team size, Budget limits, Industry domain, and Known constraints.

### 2. Deep 8-Category Blind-Spot Extraction
Every discovery is mapped to one of 8 industry-standard risk vectors:
1. **Missing Assumptions**: Unstated dependencies and naive operational assumptions.
2. **Ambiguous Requirements**: Vague acceptance criteria and undefined edge cases.
3. **Overlooked Constraints**: Regulatory compliance (HIPAA, ADA, BIPA, GDPR), latency thresholds, storage quotas.
4. **Unvalidated Dependencies**: Third-party APIs, vendor SLAs, and network transports.
5. **Data & Quality Risks**: Data skew, survival bias, schema drift, and prompt injection vulnerabilities.
6. **Security, Privacy & Compliance**: PII leakage, in-flight data transit, and missing audit trails.
7. **Operational & Financial Risks**: Alarm fatigue, support overhead, and sudden infrastructure egress costs.
8. **Timeline & Technical Risks**: Single points of failure and unfeasible delivery commitments.

### 3. Traceable Evidence & Anti-Hallucination Policy
- Every finding cites exact evidence from the provided document, labeled explicitly as:
  - **Direct Quote**: Verbatim phrase from the submitted brief.
  - **Inferred**: Derived logically from an unaddressed dependency.
  - **Needs Validation**: Unstated requirement needing stakeholder confirmation.
- Suggested Owner, Potential Impact, and Concrete Remediation are provided for each discovery.

### 4. Transparent 5-Factor Impact Prioritization Matrix
Findings are scored on a transparent 0-to-100 composite scale using explicit weights:
$$\text{Score} = (2.5 \times \text{Impact}) + (2.5 \times \text{Probability}) + (2.0 \times \text{Urgency}) + (2.0 \times \text{Remediation Cost}) + (1.0 \times \text{Confidence})$$
- **Critical Priority**: Score $\ge 80$
- **High Priority**: Score $65 - 79$
- **Medium Priority**: Score $45 - 64$
- **Low Priority**: Score $< 45$

An overall **Project Risk Score (0-100)** is computed across unresolved findings with exponential penalties for critical vulnerabilities.

### 5. Interactive Question Engine & Iterative Re-Analysis
- Generates high-leverage stakeholder questions tailored to the project's biggest blind spots.
- Interactive question interface with quick-fill suggested answers or custom team notes.
- **Re-Analyze Project**: Running re-analysis evaluates your answers, resolves verified assumptions, drops the overall risk score, and recalculates recommendations in real time.

### 6. Executive Reporting & Multi-Format Export
- **Export to Markdown**: Comprehensive `.md` report for documentation hubs.
- **Export to JSON**: Structured data export for pipeline automation.
- **Print / PDF View**: Executive-ready layout styled for browser "Print to PDF".

### 7. Realistic Demo Projects (100% Out-of-the-Box)
1. **TalentPulse AI**: Startup AI candidate screening and asynchronous video sentiment scoring (uncovers NYC Local Law 144 bias audit requirements, Illinois BIPA biometric retention penalties, and Workday ATS webhook throttling).
2. **MetroHealth Pulse360**: Hospital ICU sepsis alerting dashboard (uncovers ICU nurse alarm fatigue, pediatric calibration hazards, cloud network drop single points of failure, and HIPAA BAA gaps).
3. **Veritas Global Campus**: Multi-national university online degree platform (uncovers international rural bandwidth bottlenecks, faculty union copyright collective bargaining, and WebGL ADA Section 508 accessibility non-compliance).

---

## 3. Architecture & Technical Implementation

```
BlindSpot AI Architecture
├── server.ts                       # Express backend + Vite middleware proxy
│   ├── POST /api/analyze           # Document analysis & Gemini prompt orchestration
│   ├── POST /api/reanalyze         # Stakeholder answer synthesis & score recalculation
│   └── GET  /api/status            # Health & Gemini API status probe
├── src/
│   ├── App.tsx                     # Main application container & view routing
│   ├── prompts/
│   │   └── blindspotPrompts.ts     # System instructions & structured prompt templates
│   ├── types/
│   │   └── blindspot.ts            # Core TypeScript interfaces & schemas
│   ├── data/
│   │   └── demoProjects.ts         # Benchmark enterprise pre-mortem projects
│   ├── services/
│   │   ├── api.ts                  # Backend API client
│   │   └── storage.ts              # LocalStorage persistence & live score math
│   └── components/
│       ├── Navbar.tsx              # Strict 3-zone Top Bar Contract navigation
│       ├── RiskMeter.tsx           # Circular SVG gauge with tabular numerals
│       ├── ScoreBreakdownModal.tsx # Interactive 5-factor scoring explanation
│       ├── HackathonScriptModal.tsx# In-app 60s demo pitch script & roadmap modal
│       ├── LandingView.tsx         # High-impact landing page with asset showcases
│       ├── NewAnalysisView.tsx     # Multi-format uploader & context accordion
│       ├── DashboardView.tsx       # Primary risk overview & priority distribution
│       ├── DetailedFindingsView.tsx# Search, multi-dimensional filters & notes
│       ├── QuestionEngineView.tsx  # Dynamic questionnaire & live re-analysis
│       ├── ReportsView.tsx         # Markdown/JSON download & print-ready layout
│       └── DemoProjectsView.tsx    # 3 Benchmark scenario walk-throughs
```

### Full-Stack Express + Vite Integration
- Server runs on port 3000 using Node.js/tsx.
- Mounts Vite middlewares in development for instant updates.
- Calls Gemini API server-side using `@google/genai` with `gemini-3.8-flash` and telemetry headers.
- Graceful heuristic pre-mortem engine fallback ensures the app is 100% operational even without API keys.

---

## 4. Setup & Running Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Installation
```bash
# Clone or open app directory
npm install

# (Optional) Set your Gemini API key in .env or environment
export GEMINI_API_KEY="your-gemini-api-key"

# Start the full-stack application (server.ts + Vite on port 3000)
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 5. 60-Second Hackathon Demo Script

- **[0:00 - 0:10] The Hook**:  
  *"Most projects don't fail from bad execution—they fail from what teams never thought to question. Teams commit months of engineering to specs full of hidden assumptions, overlooked compliance traps, and rate-limit choke points. That's why we built BlindSpot AI: an intelligent pre-mortem system that reveals the icebergs before the ship leaves port."*

- **[0:10 - 0:25] Live Demo Ingestion**:  
  *"Watch: We load a real-world enterprise spec—like TalentPulse AI, an automated hiring platform. In seconds, BlindSpot AI parses the architecture, scans unstated assumptions, and calculates a 0-to-100 Project Blind-Spot Risk Score. It uncovered that their automated rejection threshold violates NYC Local Law 144 AEDT audit mandates, and their indefinite video storage triggers immediate Illinois BIPA liquidated damages."*

- **[0:25 - 0:40] Evidence & Transparent Prioritization**:  
  *"Notice: every single finding is anchored directly to source text evidence—labeled 'Direct Quote' or 'Needs Validation'—with zero AI hallucinations. Our multi-factor prioritization matrix weights Business Impact, Probability of Failure, Urgency, Remediation Cost, and Evidence Confidence so leaders know the exact top 5 risks to fix today."*

- **[0:40 - 0:55] The Question Engine & Re-Analysis**:  
  *"Here is the magic: BlindSpot AI doesn't just complain—it generates the high-leverage questions teams must answer before proceeding. When we answer a question in the Question Engine—such as confirming an audit is scheduled—the system re-evaluates the project in real time, marks assumptions resolved, and drops the risk score from 84 to 52!"*

- **[0:55 - 1:00] The Close**:  
  *"BlindSpot AI: Discover what you missed before you build. Thank you!"*

---

## 6. Future Roadmap & Enterprise Vision

1. **Jira & Linear Bidirectional Sync**:
   - Automatically turn high-priority blind spots into Jira epics with required verification tasks before sprint planning.
2. **Notion & Google Docs Live Copilot**:
   - Inline browser extension highlighting unstated assumptions in real time as product managers write PRDs.
3. **Spec Version Diffing & Regression Audits**:
   - Visually compare PRD v1 vs v2 to verify which blind spots were addressed and identify newly introduced risks.
4. **Continuous CI/CD Pipeline Gate**:
   - Block GitHub releases if unverified architectural assumptions exceed the team's risk threshold.
5. **Multi-Stakeholder Weighted Delphi Scoring**:
   - Enable Legal, CISO, and DevOps to independently score risk likelihood and aggregate team divergence.
