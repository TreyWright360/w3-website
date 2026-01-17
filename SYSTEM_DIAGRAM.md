# W3 Deep Research System - Visual Architecture

## Complete System Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         USER JOURNEY                                    │
└─────────────────────────────────────────────────────────────────────────┘

[Business Owner] → Fills Discovery Form (10-15 min)
       ↓
[Form Submission] → 4 Sections Captured:
                    • Core Identity (USP, Dream Outcome, Brand)
                    • Voice & Personality (Persona, Tone)
                    • Competitive Landscape (3 Rivals + Friction)
                    • Deep Knowledge (Files, Constraints)
       ↓
[Confirmation Email] → "Research generating... expect results in 24 hours"
       ↓
[Wait 15 minutes] ← Automated processing happens
       ↓
[Delivery Email] → Link to full research report + PDF download
       ↓
[Client Reviews] → System prompts, ad scripts, competitive analysis


┌─────────────────────────────────────────────────────────────────────────┐
│                      TECHNICAL ARCHITECTURE                             │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│   FRONTEND       │
│   (Next.js)      │
│                  │
│  • Form Page     │───┐
│  • Dashboard     │   │
│  • Report View   │   │
└──────────────────┘   │
                       │ API Request (POST)
                       ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                         SUPABASE                                        │
│                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐ │
│  │  companies  │  │   reports   │  │   tasks     │  │competitor_   │ │
│  │             │  │             │  │             │  │data (cache)  │ │
│  │ • form data │  │ • analysis  │  │ • sub-agent │  │              │ │
│  │ • status    │  │ • prompts   │  │   work      │  │ • scraped    │ │
│  │ • contact   │  │ • pdf_url   │  │ • status    │  │   content    │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └──────────────┘ │
│                                                                         │
│  [Storage Bucket: research-files]                                      │
│   • Uploaded knowledge base PDFs/DOCX                                  │
│   • Generated research report PDFs                                     │
└─────────────────────────────────────────────────────────────────────────┘
                       │
                       │ Database Webhook Trigger
                       │ (on new company insert)
                       ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                         n8n WORKFLOW                                    │
│                                                                         │
│  [1. Webhook] ← Receives company_id                                    │
│       ↓                                                                 │
│  [2. Query Supabase] → Get full company data                           │
│       ↓                                                                 │
│  [3. Create Report Record] → research_reports (status='generating')    │
│       ↓                                                                 │
│  [4. Scrape Competitors] (Parallel Processing)                         │
│       ├─→ [Firecrawl] Competitor 1 → [Parse] → [Cache]                │
│       ├─→ [Firecrawl] Competitor 2 → [Parse] → [Cache]                │
│       └─→ [Firecrawl] Competitor 3 → [Parse] → [Cache]                │
│       ↓                                                                 │
│  [5. Main Research Agent] (Deep Agents Pattern)                        │
│       │                                                                 │
│       ├─ Initialize todo list                                          │
│       ├─ Write question.txt to file system                             │
│       ├─ Delegate to sub-agents                                        │
│       │                                                                 │
│       └─→ [Sub-Agent Loop]                                             │
│            ├─ Task 1: "Analyze client USP"                             │
│            │   └─→ [Research Sub-Agent] → Gemini Flash → Answer       │
│            ├─ Task 2: "Identify competitor 1 weaknesses"               │
│            │   └─→ [Research Sub-Agent] → Gemini Flash → Answer       │
│            ├─ Task 3: "Identify competitor 2 weaknesses"               │
│            │   └─→ [Research Sub-Agent] → Gemini Flash → Answer       │
│            ├─ Task 4: "Identify competitor 3 weaknesses"               │
│            │   └─→ [Research Sub-Agent] → Gemini Flash → Answer       │
│            └─ Task 5: "Synthesize competitive advantages"              │
│                └─→ [Research Sub-Agent] → Gemini Flash → Answer       │
│       ↓                                                                 │
│  [6. Synthesis] → Compare USP vs competitor weaknesses                 │
│       ↓                                                                 │
│  [7. Write final_report.md] → Main agent compiles findings             │
│       ↓                                                                 │
│  [8. Critique Agent]                                                    │
│       ├─ Reads final_report.md + question.txt                          │
│       ├─ Scores quality (1-100)                                        │
│       └─ Suggests improvements                                         │
│       ↓                                                                 │
│  [9. Quality Check]                                                     │
│       ├─ If score < 75 → Loop back to step 5 (more research)          │
│       └─ If score >= 75 → Continue                                     │
│       ↓                                                                 │
│  [10. Generate Deliverables]                                           │
│       ├─ Phone agent system prompt                                     │
│       ├─ Website bot system prompt                                     │
│       ├─ Avatar bot personality                                        │
│       └─ Ad video scripts (30-second hooks)                            │
│       ↓                                                                 │
│  [11. Create PDF]                                                       │
│       └─→ [jsPDF / Puppeteer] → Generate styled PDF                   │
│       ↓                                                                 │
│  [12. Upload to Supabase Storage]                                      │
│       ↓                                                                 │
│  [13. Update Database]                                                  │
│       ├─ research_reports → status='completed', pdf_url, all content   │
│       └─ companies → research_status='completed'                       │
│       ↓                                                                 │
│  [14. Send Notification] (Optional)                                    │
│       └─→ Email client with report link                                │
└─────────────────────────────────────────────────────────────────────────┘
                       │
                       │ Admin accesses dashboard
                       ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                       ADMIN DASHBOARD                                   │
│                                                                         │
│  [Company List View]                                                    │
│   ┌───────────────────────────────────────────────────────────────┐   │
│   │ Company Name │ Contact   │ Status     │ Created   │ Actions   │   │
│   ├───────────────────────────────────────────────────────────────┤   │
│   │ FitFlow      │ sarah@... │ Completed  │ Jan 15    │ View      │   │
│   │ TechCorp     │ john@...  │ Processing │ Jan 16    │ View      │   │
│   │ HealthPlus   │ mary@...  │ Pending    │ Jan 16    │ View      │   │
│   └───────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  [Status Filters]                                                       │
│   • All (badge count)                                                   │
│   • Pending (amber)                                                     │
│   • Processing (blue)                                                   │
│   • Completed (green)                                                   │
│   • Failed (red)                                                        │
│                                                                         │
│  [Search & Filter]                                                      │
│   • Search by company name, email                                      │
│   • Filter by date range                                               │
│   • Sort by created date, status                                       │
└─────────────────────────────────────────────────────────────────────────┘
                       │
                       │ Click "View"
                       ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                      REPORT VIEW PAGE                                   │
│                                                                         │
│  [Header]                                                               │
│   FitFlow Nutrition - Deep Research Report                             │
│   Status: Completed ✅ | Quality Score: 87/100 | Generated: Jan 15     │
│                                                                         │
│  [Actions Bar]                                                          │
│   [Download PDF] [Share Link] [Regenerate] [Archive]                   │
│                                                                         │
│  [Tab Navigation]                                                       │
│   • Overview | Competitive Analysis | Deliverables | Tasks             │
│                                                                         │
│  [Overview Tab]                                                         │
│   ┌─────────────────────────────────────────────────────────────┐     │
│   │ Executive Summary                                           │     │
│   │ ─────────────────                                           │     │
│   │ FitFlow Nutrition has a strong competitive advantage...    │     │
│   │                                                             │     │
│   │ Competitive Analysis                                        │     │
│   │ ─────────────────                                           │     │
│   │ [Table comparing client vs 3 competitors]                  │     │
│   │                                                             │     │
│   │ Recommended Positioning                                     │     │
│   │ ─────────────────────                                       │     │
│   │ Focus on personalized AI-driven meal planning...           │     │
│   └─────────────────────────────────────────────────────────────┘     │
│                                                                         │
│  [Deliverables Tab]                                                     │
│   ┌─────────────────────────────────────────────────────────────┐     │
│   │ Phone Agent System Prompt                                   │     │
│   │ ─────────────────────────                                   │     │
│   │ [Copy to Clipboard] button                                  │     │
│   │ You are FitFlow's AI nutrition assistant. Your voice...    │     │
│   │                                                             │     │
│   │ Website Bot System Prompt                                   │     │
│   │ ─────────────────────────                                   │     │
│   │ [Copy to Clipboard] button                                  │     │
│   │ You represent FitFlow Nutrition on the website...          │     │
│   │                                                             │     │
│   │ Ad Video Scripts                                            │     │
│   │ ────────────────                                            │     │
│   │ Script 1: "Tired of generic meal plans? FitFlow..."        │     │
│   │ Script 2: "Your metabolism is unique. Why isn't your..."   │     │
│   └─────────────────────────────────────────────────────────────┘     │
│                                                                         │
│  [Tasks Tab] - Shows sub-agent work                                    │
│   ┌─────────────────────────────────────────────────────────────┐     │
│   │ ✅ Research: Analyze client USP (2.3s, 1,240 tokens)       │     │
│   │ ✅ Research: Competitor 1 weaknesses (3.1s, 1,890 tokens)  │     │
│   │ ✅ Research: Competitor 2 weaknesses (2.8s, 1,650 tokens)  │     │
│   │ ✅ Research: Competitor 3 weaknesses (3.4s, 1,920 tokens)  │     │
│   │ ✅ Synthesis: Competitive advantages (4.2s, 2,340 tokens)  │     │
│   │ ✅ Critique: Quality review (1.9s, 890 tokens)             │     │
│   │                                                             │     │
│   │ Total: 6 tasks, 14.7 seconds, 9,930 tokens (~$0.15)        │     │
│   └─────────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                    DEEP AGENTS COMMUNICATION                            │
└─────────────────────────────────────────────────────────────────────────┘

Main Agent (Orchestrator)
    │
    ├─ Creates: todo list (visible to user)
    ├─ Writes: question.txt (file system)
    │
    ├─→ [Message] "Analyze client's USP vs competitor weaknesses"
    │   └─→ Research Sub-Agent
    │       └─ [Message back] "Key findings: ..."
    │
    ├─→ [Message] "Research competitor 1 pricing strategy"
    │   └─→ Research Sub-Agent
    │       └─ [Message back] "Analysis: ..."
    │
    ├─ Writes: final_report.md (file system)
    │
    └─→ [Message] "Critique the report"
        └─→ Critique Sub-Agent (reads final_report.md)
            └─ [Message back] "Score: 87/100, Improvements: ..."


Communication Methods:
• Messages: Quick Q&A between agents
• File System: Large documents (question.txt, final_report.md)
• Todo List: Progress tracking


┌─────────────────────────────────────────────────────────────────────────┐
│                         COST BREAKDOWN                                  │
└─────────────────────────────────────────────────────────────────────────┘

Per Research Report:

Gemini 1.5 Flash (via OpenRouter):
  • Input: ~8,000 tokens × $0.000075 = $0.60
  • Output: ~4,000 tokens × $0.00030 = $1.20
  • Total AI: ~$1.80 per report (6-8 sub-agent calls)

Firecrawl (web scraping):
  • 3 competitors × $0.003 = $0.009
  • OR use free scraping (Puppeteer in n8n)

Supabase:
  • Free tier (50,000 rows, 1GB storage)

n8n:
  • Self-hosted: Free
  • Cloud: $20/month (unlimited reports)

TOTAL COST: $0.10 - $2.00 per report
SELL PRICE: $1,500
MARGIN: 99.87% - 99.99%


┌─────────────────────────────────────────────────────────────────────────┐
│                      IMPLEMENTATION TIMELINE                            │
└─────────────────────────────────────────────────────────────────────────┘

Week 1: Foundation
  Day 1-2: Supabase setup + Next.js form
  Day 3-4: Dashboard + report view
  Day 5: Design tokens applied

Week 2: Automation
  Day 1-2: n8n workflow + scraping
  Day 3-4: Deep Agents integration
  Day 5: PDF generation

Week 3: Testing & Launch
  Day 1-2: End-to-end testing
  Day 3: Fix bugs, optimize
  Day 4: Deploy to production
  Day 5: Launch marketing

TOTAL: ~3 weeks from start to revenue 🚀
```

---

## Key Insights

### 1. Deep Agents Pattern
- **Main Agent** doesn't do research - it orchestrates
- **Sub-Agents** are specialists (research, critique)
- **File System** enables efficient large document sharing
- **Messages** for quick Q&A
- **Todo List** provides progress visibility

### 2. Quality Control Loop
```
Generate Report → Critique Agent → Score
                        ↓
                  Score < 75?
                  ↙         ↘
               Yes           No
                ↓             ↓
          More Research    Finalize
```

### 3. Communication Efficiency
- **Messages**: Small data (questions, answers)
- **File System**: Large data (reports, analyses)
- **Database**: Persistent storage (companies, reports)

### 4. Cost Optimization
- **Cache competitor data** (avoid re-scraping)
- **Gemini Flash** (cheapest reasoning model)
- **Parallel processing** (3 competitors at once)
- **Quality gate** (only regenerate if needed)

---

**This is your complete blueprint. All pieces are documented. Ready to build!**
