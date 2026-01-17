# W3 AI Solutions - Deep Research System Implementation Guide

## Overview
This system creates a complete deep research workflow for W3 AI Solutions, capturing client business details and generating comprehensive competitive intelligence reports.

## Architecture

```
User Form Submission
    ↓
Next.js Frontend (captures data)
    ↓
Supabase (stores company data)
    ↓
n8n Webhook (triggered on insert)
    ↓
Deep Research Workflow:
  1. Scrape competitor websites (Firecrawl/Puppeteer)
  2. Research sub-agent (Gemini Flash via OpenRouter)
  3. Competitive analysis synthesis
  4. Critique sub-agent (quality control)
  5. Generate final deliverables
    ↓
Store results in Supabase
    ↓
Admin Dashboard (view all companies + reports)
```

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Automation**: n8n (self-hosted or cloud)
- **AI**: Gemini 1.5 Flash via OpenRouter API
- **File Storage**: Supabase Storage
- **Styling**: Tailwind CSS
- **PDF Generation**: jsPDF or Puppeteer

## Setup Steps

### 1. Supabase Setup

1. Create new Supabase project at https://supabase.com
2. Run the SQL in `DATABASE_SCHEMA.sql` in SQL Editor
3. Enable Supabase Storage and create bucket called `research-files`
4. Get your credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (for n8n)

### 2. Next.js Setup

```bash
cd w3-website
npm install
# or if starting fresh:
npx create-next-app@latest . --typescript --tailwind --app --eslint
```

Install dependencies:
```bash
npm install @supabase/supabase-js
npm install @supabase/auth-helpers-nextjs
npm install react-hook-form zod
npm install lucide-react
npm install jspdf html2canvas # For PDF generation
npm install recharts # For dashboard charts
```

### 3. Environment Variables

Create `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# n8n Webhook
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/research-trigger

# OpenRouter (for Gemini)
OPENROUTER_API_KEY=your_openrouter_key

# Optional: for file uploads
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=research-files
```

### 4. n8n Setup

#### Self-Hosted Option:
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

#### Cloud Option:
Sign up at https://n8n.io

#### Required Credentials in n8n:
- Supabase API Key (service role)
- OpenRouter API Key
- (Optional) Firecrawl API Key for scraping

### 5. Project Structure

```
w3-website/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── research-form/
│   │   └── page.tsx            # Main form
│   ├── dashboard/
│   │   ├── page.tsx            # Admin dashboard
│   │   └── [companyId]/
│   │       └── page.tsx        # Individual report view
│   └── api/
│       ├── companies/
│       │   └── route.ts        # Company CRUD
│       ├── reports/
│       │   └── route.ts        # Report retrieval
│       └── webhook/
│           └── route.ts        # n8n callback
├── components/
│   ├── ResearchForm.tsx        # Multi-step form
│   ├── DashboardTable.tsx      # Company list
│   ├── ReportViewer.tsx        # Report display
│   └── StatusTracker.tsx       # Real-time status
├── lib/
│   ├── supabase.ts             # Supabase client
│   ├── types.ts                # TypeScript types
│   └── utils.ts                # Helper functions
├── n8n-workflows/
│   ├── deep-research.json      # Main workflow
│   └── README.md               # Workflow docs
└── prompts/
    ├── main-researcher.txt     # Main agent prompt
    ├── sub-researcher.txt      # Research sub-agent
    └── critique-agent.txt      # Quality control
```

## Key Features

### Form (Section Breakdown)

**Section 1: Core Identity**
- Primary USP (unique selling proposition)
- Dream Outcome (transformation promise)
- Brand Archetype (The Sage, The Hero, The Outlaw, The Magician)
- Proof Assets (links to case studies/reviews)

**Section 2: Voice & Personality**
- Voice Persona (Support Specialist vs High-Energy Closer)
- Forbidden Phrases (what NOT to say)
- Bridge Question (qualification question)

**Section 3: Competitive Landscape**
- Top 3 Competitors (names + websites)
- Competitor Friction (main complaint)

**Section 4: Deep Knowledge**
- Knowledge Base Upload (SOPs, manuals, scripts)
- Technical Constraints (pricing, disclaimers, etc.)

### n8n Workflow Steps

1. **Webhook Trigger** - Listens for new company inserts
2. **Fetch Company Data** - Query Supabase for full details
3. **Scrape Competitors** (parallel):
   - Competitor 1 scrape
   - Competitor 2 scrape
   - Competitor 3 scrape
4. **Store in Cache** - Save to `competitor_data` table
5. **Main Research Agent**:
   - Initialize research report
   - Create todo list
   - Delegate to sub-agents
6. **Sub-Research Agent** (called multiple times):
   - Deep dive on specific questions
   - Use Gemini Flash via OpenRouter
7. **Synthesis Step**:
   - Compare client USP vs competitor weaknesses
   - Generate positioning strategy
8. **Critique Agent**:
   - Review final report
   - Suggest improvements
9. **Final Deliverables**:
   - Phone agent system prompt
   - Website bot system prompt
   - 30-second ad script
   - Full PDF report
10. **Store Results** - Update Supabase

### Dashboard Features

- **Company List View**:
  - Search/filter companies
  - Status indicators (pending/processing/completed)
  - Quick actions (view report, regenerate)

- **Individual Report View**:
  - Executive summary
  - Competitive analysis table
  - System prompts (copy to clipboard)
  - Download PDF
  - Real-time generation status

- **Analytics**:
  - Total submissions
  - Completion rate
  - Average processing time
  - Research quality scores

## Deep Research Workflow (Based on DeepAgents)

### Main Agent Capabilities
- **To-Do List Management** - Creates and tracks research tasks
- **File System** - Writes intermediate results to virtual files
- **Sub-Agent Delegation** - Spins up specialized researchers
- **Quality Control** - Uses critique agent for review

### Sub-Agent: Research Specialist
```
Tools: Internet Search (Tavily), Web Scraper
Purpose: Deep dive into specific research questions
Input: Single focused question
Output: Comprehensive answer with sources
```

### Sub-Agent: Critique Specialist
```
Tools: File System Read
Purpose: Review final report for quality
Input: Reads from final_report.md
Output: Specific improvement suggestions
```

### Communication Pattern
- **Messages** - For simple Q&A between main agent and sub-agents
- **File System** - For large documents (report.md, question.txt)
- **To-Dos** - For tracking parallel work

## Gemini 1.5 Flash Configuration (OpenRouter)

```javascript
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'google/gemini-flash-1.5',
    messages: [
      {
        role: 'system',
        content: researcherSystemPrompt
      },
      {
        role: 'user',
        content: researchQuery
      }
    ],
    temperature: 0.7,
    max_tokens: 8000
  })
});
```

## Deployment

### Vercel Deployment (Frontend)
```bash
npm install -g vercel
vercel --prod
```

### n8n Deployment Options
1. **Railway**: One-click deploy
2. **DigitalOcean**: Droplet with Docker
3. **n8n Cloud**: Managed service

## Cost Estimates

### Per Research Report:
- **Gemini Flash (via OpenRouter)**: ~$0.10-0.30 per report
- **Web Scraping**: Free (built-in) or $0.01 with Firecrawl
- **Supabase**: Free tier (50,000 rows)
- **Vercel**: Free tier (hobby)
- **n8n**: Free (self-hosted) or $20/mo (cloud)

**Total**: ~$0.10-0.50 per deep research report
**Charge**: $1,500 per report
**Margin**: 99.97%

## Testing Checklist

- [ ] Form submission saves to Supabase
- [ ] n8n webhook triggers on new company
- [ ] Competitor websites scrape successfully
- [ ] Research agent generates comprehensive analysis
- [ ] Critique agent provides quality feedback
- [ ] System prompts are actionable
- [ ] PDF generates correctly
- [ ] Dashboard displays all companies
- [ ] Report view shows full details
- [ ] Real-time status updates work

## Next Steps

1. Run `DATABASE_SCHEMA.sql` in Supabase
2. Set up environment variables
3. Build Next.js components (use provided code)
4. Import n8n workflow
5. Test end-to-end flow
6. Deploy to production

## Support Files

See the following files for implementation:
- `components/ResearchForm.tsx` - Full form component
- `app/dashboard/page.tsx` - Dashboard implementation
- `n8n-workflows/deep-research.json` - Complete workflow
- `prompts/` - All AI prompts

---

**Version**: 1.0
**Last Updated**: January 16, 2026
