# W3 Deep Research Platform

> Turn any business into a $1,500 AI strategy in 15 minutes

**Deep competitive intelligence system** using Deep Agents, n8n automation, and Gemini 1.5 Flash.

---

## 🎯 What This Is

A complete **form-to-report pipeline** that:

1. **Captures** business details via 4-section discovery form
2. **Researches** competitors automatically (scraping + AI analysis)
3. **Generates** professional research reports with system prompts
4. **Delivers** via admin dashboard (view, download PDF)

**Economics**: $0.10-0.50 cost → $1,500 revenue = **99.97% margin**

---

## 📁 Key Files

### Planning Documents (Design OS Workflow)
- `design-os/planning/01-product-vision.md` - Product strategy
- `design-os/planning/02-data-model.md` - TypeScript interfaces
- `design-os/planning/03-design-tokens.md` - Brand design system

### Implementation
- `DATABASE_SCHEMA.sql` - Supabase schema (run this first!)
- `W3_DEEP_RESEARCH_COMPLETE_IMPLEMENTATION.md` - Full guide
- `IMPLEMENTATION_GUIDE.md` - Technical architecture

---

## 🚀 Quick Start

### 1. Set Up Supabase (5 minutes)

```bash
# Go to https://supabase.com
# Create project: "w3-deep-research"
# Run DATABASE_SCHEMA.sql in SQL Editor
# Create storage bucket: "research-files"
# Copy credentials to .env.local
```

### 2. Configure Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role
N8N_WEBHOOK_URL=https://your-n8n.com/webhook/research
OPENROUTER_API_KEY=your_openrouter_key
```

### 3. Install Dependencies

```bash
npm install
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install react-hook-form zod lucide-react jspdf html2canvas recharts
```

### 4. Run Development Server

```bash
npm run dev
# Open http://localhost:5173
```

---

## 🏗️ System Architecture

```
[Form] → [Supabase] → [n8n] → [Scrape] → [AI Research] → [PDF] → [Dashboard]
```

**Deep Agents Pattern**:
- **Main Agent**: Orchestrates research workflow
- **Research Sub-Agent**: Deep dives on single questions
- **Critique Sub-Agent**: Quality control & scoring

**Communication**:
- Messages (Q&A between agents)
- File System (large docs: question.txt, final_report.md)
- To-Do List (track parallel tasks)

---

## 📋 Form Structure

### Section 1: Core Identity
- Primary USP, Dream Outcome, Brand Archetype, Proof Assets

### Section 2: Voice & Personality
- Voice Persona, Forbidden Phrases, Bridge Question

### Section 3: Competitive Landscape
- Top 3 Competitors (name + website), Competitor Friction

### Section 4: Deep Knowledge
- Knowledge Base Upload, Technical Constraints

---

## 🎨 Design System

**Brand Colors** (from Design Tokens):
- Navy `#213555` (primary)
- Slate Blue `#3E5879` (secondary)
- Warm Beige `#D8C4B6` (accent)
- Cream `#F5EFE7` (background)

**Fonts**:
- Headlines: Nothing You Could Do
- Body/UI: Work Sans

**Components**: All styled with Tailwind CSS using design tokens.

---

## 🤖 n8n Workflow

**14-Node Workflow**:
1. Webhook trigger
2. Query Supabase (company data)
3. Extract competitors
4. Scrape websites (parallel)
5. Store in cache
6. Initialize research report
7. Main research agent (Gemini Flash)
8. Sub-agent loop (research tasks)
9. Synthesis
10. Critique agent
11. Generate deliverables (prompts + scripts)
12. Create PDF
13. Upload to storage
14. Update database (status = completed)

**Prompts**: See `prompts/` directory for all agent instructions.

---

## 📊 Dashboard Features

- **Company List**: View all submissions, filter by status
- **Status Indicators**: Pending (amber), Processing (blue), Completed (green)
- **Report View**: Full research report with all sections
- **Download PDF**: One-click professional report
- **Search & Filter**: Find any company quickly

---

## 💰 Revenue Model

**Service**: "W3 Deep Research: AI Conversion Ecosystem Blueprint"

**Pricing**:
- Base Report: $1,500
- Implementation: +$5K-15K
- Quarterly Updates: $3K/quarter

**Deliverables**:
- Executive summary
- Competitive analysis
- System prompts (phone, web, avatar)
- Ad video scripts
- Professional PDF

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | Next.js 14 + Tailwind |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage |
| Automation | n8n |
| AI | Gemini 1.5 Flash (OpenRouter) |
| Scraping | Firecrawl |
| PDF | jsPDF |
| Hosting | Vercel + Railway |

---

## 📚 Documentation

- **Product Vision**: `design-os/planning/01-product-vision.md`
- **Data Model**: `design-os/planning/02-data-model.md`
- **Design Tokens**: `design-os/planning/03-design-tokens.md`
- **Full Implementation**: `W3_DEEP_RESEARCH_COMPLETE_IMPLEMENTATION.md`
- **Architecture**: `IMPLEMENTATION_GUIDE.md`

---

## ✅ Implementation Checklist

### Phase 1: Foundation
- [ ] Run `DATABASE_SCHEMA.sql` in Supabase
- [ ] Create storage bucket `research-files`
- [ ] Configure environment variables
- [ ] Install npm dependencies

### Phase 2: Frontend
- [ ] Build form component (4 sections)
- [ ] Create dashboard (company list)
- [ ] Build report viewer
- [ ] Apply design tokens (Navy, Beige, Cream)

### Phase 3: Backend
- [ ] Import n8n workflow
- [ ] Configure credentials (Supabase, OpenRouter, Firecrawl)
- [ ] Test webhook trigger
- [ ] Test competitor scraping

### Phase 4: AI
- [ ] Load prompts (main, researcher, critique)
- [ ] Test Gemini Flash integration
- [ ] Verify sub-agent delegation
- [ ] Test critique loop

### Phase 5: Testing
- [ ] End-to-end test (form → dashboard → PDF)
- [ ] Verify research quality (score >75)
- [ ] Check processing time (<15 min)
- [ ] Confirm cost (<$0.50)

### Phase 6: Deploy
- [ ] Deploy frontend to Vercel
- [ ] Deploy n8n to Railway
- [ ] Configure production webhooks
- [ ] Test in production

---

## 🎓 Key Concepts

### Deep Agents Pattern
1. **Main Agent** = Orchestrator (doesn't do research, coordinates specialists)
2. **Sub-Agents** = Specialists (focused on single task type)
3. **File System** = Communication for large docs
4. **Messages** = Communication for Q&A
5. **To-Do List** = Progress tracking

### Research Quality Control
- Critique agent scores 1-100
- If score <75, iterate
- Specific improvement suggestions
- Re-research weak sections

---

## 🚨 Important Notes

1. **Design OS Integration**: This system was planned using Design OS workflow (product-vision → data-model → design-tokens)

2. **Deep Agents Video**: Architecture based on LangChain's Deep Agents tutorial (file system, sub-agents, critique loop)

3. **Brand Compliance**: All components use W3 AI Solutions brand colors (Navy, Slate, Beige, Cream)

4. **Gemini Flash**: Chosen for speed + cost (via OpenRouter API)

5. **99.97% Margin**: Keep AI costs <$0.50 per report for maximum profitability

---

## 🔗 Resources

- **Supabase**: https://supabase.com
- **n8n**: https://n8n.io
- **OpenRouter**: https://openrouter.ai
- **Firecrawl**: https://firecrawl.dev
- **Design OS**: https://github.com/buildermethods/design-os
- **Deep Agents**: https://github.com/langchain-ai/deep-agents-ui

---

## 📞 Support

Questions? Review these files:
1. `W3_DEEP_RESEARCH_COMPLETE_IMPLEMENTATION.md` (full guide)
2. `design-os/planning/01-product-vision.md` (product strategy)
3. `DATABASE_SCHEMA.sql` (database structure)

---

**Version**: 1.0
**Created**: January 16, 2026
**Status**: Ready to implement
**Margin**: 99.97% 🚀
