# W3 Deep Research System - Complete Implementation Guide

## 🎯 What You're Building

A **$1,500/report deep research system** that captures business details, scrapes competitors, and generates professional AI strategy reports using Deep Agents architecture.

**Revenue Model**: $0.10-0.50 cost per report → $1,500 sale = **99.97% margin**

---

## 📁 Files Created

### Planning Documents
1. `DATABASE_SCHEMA.sql` - Complete Supabase schema
2. `IMPLEMENTATION_GUIDE.md` - Technical architecture
3. `design-os/planning/01-product-vision.md` - Product strategy
4. `design-os/planning/02-data-model.md` - TypeScript interfaces
5. `design-os/planning/03-design-tokens.md` - Brand design system

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER SUBMITS FORM                        │
│          (W3 Deep Research Discovery Form)                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│               SUPABASE DATABASE                             │
│  • companies table (form data)                              │
│  • research_files table (uploaded docs)                     │
│  • Status: research_status = 'pending'                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓ (Database trigger webhook)
┌─────────────────────────────────────────────────────────────┐
│                   n8n WORKFLOW                              │
│                                                             │
│  1. Webhook Receive → Get company data                     │
│  2. Create ResearchReport (status='generating')            │
│  3. Scrape Competitors (Firecrawl/Puppeteer)               │
│     ├─ Competitor 1                                        │
│     ├─ Competitor 2                                        │
│     └─ Competitor 3                                        │
│  4. Store in competitor_data cache                         │
│  5. Main Research Agent (Deep Agents pattern)              │
│     ├─ Creates todo list                                   │
│     ├─ Writes question.txt to file system                  │
│     └─ Delegates to sub-agents                             │
│  6. Sub-Agent: Research Specialist                         │
│     ├─ Takes single focused question                       │
│     ├─ Uses Gemini Flash via OpenRouter                    │
│     └─ Returns comprehensive answer                        │
│  7. Synthesis (compare USP vs competitors)                 │
│  8. Sub-Agent: Critique Specialist                         │
│     ├─ Reads final_report.md from file system             │
│     ├─ Scores quality (1-100)                              │
│     └─ Suggests improvements                               │
│  9. Generate Deliverables                                  │
│     ├─ Phone agent system prompt                           │
│     ├─ Website bot system prompt                           │
│     ├─ Avatar bot personality                              │
│     └─ 30-second ad scripts                                │
│  10. Create PDF Report                                     │
│  11. Update Supabase                                       │
│      ├─ research_reports table                             │
│      ├─ research_tasks table                               │
│      └─ companies.research_status = 'completed'            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│              ADMIN DASHBOARD (Next.js)                      │
│  • View all companies                                       │
│  • Filter by status                                         │
│  • Click to view full report                                │
│  • Download PDF                                             │
│  • Real-time status updates                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Form Structure (4 Sections)

### Section 1: Core Identity
**Purpose**: Capture brand essence for website copy and avatars

- Primary USP (textarea)
- Dream Outcome (textarea)
- Brand Archetype (dropdown: Sage/Hero/Outlaw/Magician)
- Proof Assets (3 URL fields for case studies/reviews)

### Section 2: Voice & Personality
**Purpose**: Configure voice agent tone and behavior

- Voice Persona (radio: Support Specialist / High-Energy Closer)
- Forbidden Phrases (textarea, comma-separated)
- Bridge Question (input - lead qualification)

### Section 3: Competitive Landscape
**Purpose**: Enable counter-positioning strategy

- Top 3 Rivals (name + website for each)
- Competitor Friction (textarea - main complaint about rivals)

### Section 4: Deep Knowledge
**Purpose**: Training data for internal agents

- Knowledge Base Upload (file input - PDFs, DOCX, TXT)
- Technical Constraints (textarea - non-negotiables)

### Contact Info
- Company Name
- Contact Name
- Contact Email
- Contact Phone (optional)

---

## 🤖 Deep Agents Research Workflow

Based on the video transcript you provided, implementing this architecture:

### Main Research Agent
```
Instructions:
1. Write original question to question.txt
2. Use research-agent for deep research
3. When enough info gathered, write final_report.md
4. Call critique-agent to review
5. Iterate if needed
6. Mark complete

Tools:
- File system (read/write)
- Todo list management
- Sub-agent delegation
- Internet search
```

### Sub-Agent: Research Specialist
```
Name: research-agent
Purpose: Deep dive single topic
Input: One focused question (via message)
Tools: Internet search (Tavily)
Output: Comprehensive answer (via message)

System Prompt:
"You are a dedicated researcher. Take the single question provided
and research it thoroughly. Use multiple search queries. Synthesize
findings into clear, actionable insights."
```

### Sub-Agent: Critique Specialist
```
Name: critique-agent
Purpose: Quality control final report
Input: Reads final_report.md + question.txt (via file system)
Tools: File system read
Output: Critique feedback (via message)

System Prompt:
"You are a dedicated editor. Review the report at final_report.md
against the original question at question.txt. Score quality 1-100.
Provide specific improvement suggestions."
```

### Communication Methods
- **Messages**: Simple Q&A between agents
- **File System**: Large documents (question.txt, final_report.md)
- **To-Do List**: Track parallel research tasks

---

## 🎨 Design System (Brand Compliance)

### Colors
- **Navy** `#213555` - Primary (buttons, headers)
- **Slate Blue** `#3E5879` - Secondary (links, accents)
- **Warm Beige** `#D8C4B6` - Borders, subtle backgrounds
- **Cream** `#F5EFE7` - Page background

### Typography
- **Headlines**: Nothing You Could Do (Google Font)
- **Body/UI**: Work Sans (Google Font)

### Component Tokens
```css
/* Buttons */
--btn-primary-bg: #213555 (Navy)
--btn-primary-hover: #2d4368

/* Cards */
--card-bg: #FFFFFF
--card-border: #D8C4B6 (Beige)
--card-shadow: 0 4px 6px rgba(0,0,0,0.1)

/* Status Badges */
--status-pending: #F59E0B (Amber)
--status-processing: #3B82F6 (Blue)
--status-completed: #10B981 (Green)
--status-failed: #EF4444 (Red)
```

---

## 🛠️ Implementation Steps

### Phase 1: Database Setup (15 minutes)

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Create new project: `w3-deep-research`

2. **Run SQL Schema**
   - Open SQL Editor
   - Copy/paste `DATABASE_SCHEMA.sql`
   - Execute

3. **Create Storage Bucket**
   - Go to Storage
   - Create bucket: `research-files`
   - Set policy: Public read, authenticated write

4. **Get Credentials**
   - Project Settings → API
   - Copy:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`

---

### Phase 2: Next.js Frontend (2-4 hours)

```bash
# Navigate to project
cd w3-website

# Install dependencies
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install react-hook-form zod
npm install lucide-react
npm install jspdf html2canvas
npm install recharts

# Create .env.local
```

**.env.local**:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role
N8N_WEBHOOK_URL=https://your-n8n.com/webhook/research
OPENROUTER_API_KEY=your_openrouter_key
```

**File Structure**:
```
src/
├── app/
│   ├── layout.tsx (apply design tokens)
│   ├── page.tsx (landing page)
│   ├── research-form/
│   │   └── page.tsx (4-section form)
│   ├── dashboard/
│   │   ├── page.tsx (company list)
│   │   └── [id]/
│   │       └── page.tsx (report view)
│   └── api/
│       ├── companies/route.ts
│       └── reports/route.ts
├── components/
│   ├── ResearchForm.tsx (multi-step form)
│   ├── FormSection1_Identity.tsx
│   ├── FormSection2_Voice.tsx
│   ├── FormSection3_Competitors.tsx
│   ├── FormSection4_Knowledge.tsx
│   ├── DashboardTable.tsx
│   ├── ReportViewer.tsx
│   └── StatusBadge.tsx
└── lib/
    ├── supabase.ts
    ├── types.ts (from data-model.md)
    └── utils.ts
```

---

### Phase 3: n8n Workflow (3-5 hours)

**Option A: Self-Hosted n8n**
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

**Option B: n8n Cloud**
- Sign up at https://n8n.io
- Create new workflow

**Workflow Nodes**:

1. **Webhook Node**
   - Method: POST
   - Path: `/webhook/research`
   - Authentication: None (or API key)

2. **Supabase Node** - Query company
   - Operation: Select
   - Table: companies
   - Filter: id = {{$json.company_id}}

3. **Function Node** - Extract competitors
   ```javascript
   const competitors = [
     { name: $json.competitor_1_name, url: $json.competitor_1_website },
     { name: $json.competitor_2_name, url: $json.competitor_2_website },
     { name: $json.competitor_3_name, url: $json.competitor_3_website }
   ].filter(c => c.url);

   return competitors.map(c => ({ json: c }));
   ```

4. **Split In Batches** - Process 3 competitors

5. **HTTP Request Node** - Firecrawl scrape
   - URL: https://api.firecrawl.dev/v1/scrape
   - Headers: Authorization: Bearer {{$env.FIRECRAWL_API_KEY}}
   - Body: { "url": "{{$json.url}}" }

6. **Supabase Node** - Store competitor data
   - Operation: Insert
   - Table: competitor_data

7. **Function Node** - Initialize research report

8. **HTTP Request Node** - Gemini Flash (Main Agent)
   - URL: https://openrouter.ai/api/v1/chat/completions
   - Method: POST
   - Headers:
     - Authorization: Bearer {{$env.OPENROUTER_API_KEY}}
     - Content-Type: application/json
   - Body:
   ```json
   {
     "model": "google/gemini-flash-1.5",
     "messages": [
       {
         "role": "system",
         "content": "{{$node['Function'].json.mainAgentPrompt}}"
       },
       {
         "role": "user",
         "content": "Company: {{$json.company_name}}\nUSP: {{$json.primary_usp}}\nCompetitor Friction: {{$json.competitor_friction}}\n\nCompetitor Data:\n{{$json.competitorAnalysis}}"
       }
     ]
   }
   ```

9. **Loop for Sub-Agents** (research tasks)
   - Create research tasks
   - Call Gemini Flash for each
   - Store results in research_tasks table

10. **Function Node** - Generate deliverables
    - Parse AI response
    - Extract system prompts
    - Format ad scripts

11. **HTTP Request** - Generate PDF (Puppeteer or jsPDF API)

12. **Supabase Storage** - Upload PDF

13. **Supabase Node** - Update research_reports
    - Set status = 'completed'
    - Set pdf_url
    - Set all deliverable fields

14. **Supabase Node** - Update company
    - Set research_status = 'completed'

---

### Phase 4: Prompts (Critical!)

Create these in `w3-website/prompts/`:

**main-researcher.txt**:
```
You are the W3 Deep Research System's main orchestrator. Your role is to coordinate deep competitive intelligence research for businesses seeking AI automation.

## Your Workflow

1. **Initialize**: Write the original research question to question.txt in the file system.

2. **Plan**: Create a todo list of research tasks:
   - Analyze client's USP and positioning
   - Deep dive competitor 1 weaknesses
   - Deep dive competitor 2 weaknesses
   - Deep dive competitor 3 weaknesses
   - Synthesize competitive advantages
   - Draft system prompts (phone, web, avatar)
   - Draft ad scripts

3. **Research**: Delegate each task to the research-agent sub-agent. Give it ONE focused question at a time.

4. **Synthesize**: When you have enough information, write a comprehensive report to final_report.md including:
   - Executive Summary
   - Competitive Analysis (strengths vs weaknesses)
   - Recommended Positioning Strategy
   - Voice & Personality Guide
   - System Prompts (phone agent, website bot, avatar bot)
   - Ad Video Scripts (30-second hooks)

5. **Critique**: Call the critique-agent to review final_report.md. It will score quality and suggest improvements.

6. **Iterate**: If critique score < 75, do more research and regenerate sections.

7. **Finalize**: Once quality is high, mark complete.

## Key Rules
- Always pass ONE question to research-agent at a time
- Use file system for large documents (question.txt, final_report.md)
- Use messages for simple Q&A with sub-agents
- Track progress with todo list
- Never hallucinate competitor data - only use scraped content
- System prompts must be SPECIFIC to the client's brand and constraints
```

**sub-researcher.txt**:
```
You are a dedicated research specialist. Your job is to answer ONE focused question at a time with comprehensive, well-sourced analysis.

## Your Process

1. Break down the question into search queries
2. Use internet search to gather data
3. Synthesize findings into clear insights
4. Cite sources when possible
5. Be specific and actionable

## Output Format

Provide your answer in this structure:

**Key Findings:**
- [Bullet point 1]
- [Bullet point 2]
- [Bullet point 3]

**Analysis:**
[2-3 paragraphs of synthesis]

**Actionable Recommendations:**
1. [Specific recommendation]
2. [Specific recommendation]

**Sources:**
- [URL 1]
- [URL 2]
```

**critique-agent.txt**:
```
You are a quality control editor for deep research reports. Your job is to review the final report and provide a score + improvement suggestions.

## What You Review

Read the report at final_report.md and the original question at question.txt.

## Scoring Criteria (1-100)

- **Depth (30 points)**: How comprehensive is the competitive analysis?
- **Specificity (25 points)**: Are system prompts tailored to this exact business?
- **Actionability (25 points)**: Can these deliverables be used immediately?
- **Accuracy (20 points)**: Are claims supported by competitor data?

## Output Format

**Overall Score:** [1-100]

**Strengths:**
- [What's done well]
- [What's done well]

**Improvements Needed:**
- [Specific suggestion 1]
- [Specific suggestion 2]

**Sections to Revise:**
- [Section name]: [Why it needs work]
```

---

## 🚀 Launch Checklist

### Technical Checklist
- [ ] Supabase schema deployed
- [ ] Storage bucket created
- [ ] Next.js app runs locally
- [ ] Form submissions save to Supabase
- [ ] File uploads work to Supabase Storage
- [ ] n8n workflow imported
- [ ] n8n credentials configured (Supabase, OpenRouter, Firecrawl)
- [ ] Webhook triggers on form submit
- [ ] Competitor scraping retrieves data
- [ ] Gemini Flash generates analysis
- [ ] Sub-agents complete tasks
- [ ] PDF generates correctly
- [ ] Dashboard displays companies
- [ ] Report view shows full details
- [ ] Download PDF works

### Quality Checklist
- [ ] Form validates all required fields
- [ ] Status badges show correct colors
- [ ] Design tokens applied (Navy, Beige, Cream colors)
- [ ] Fonts loaded (Nothing You Could Do + Work Sans)
- [ ] Mobile responsive
- [ ] Loading states during processing
- [ ] Error handling for failed research

### Business Checklist
- [ ] Sample data tested end-to-end
- [ ] Research quality score >75
- [ ] Processing time <15 minutes
- [ ] Cost per report <$0.50
- [ ] PDF looks professional
- [ ] System prompts are actionable

---

## 💰 Pricing & Positioning

### Service Offering
**"W3 Deep Research: AI Conversion Ecosystem Blueprint"**

**What's Included:**
- Comprehensive competitive intelligence analysis
- Ready-to-use system prompts (voice, web, avatar bots)
- 30-second ad video scripts
- Professional PDF research report
- Voice & personality brand guide

**Price**: $1,500 per report
**Delivery**: 24 hours (automated in 15 minutes, manual review)

### Upsells
- **Implementation Package** (+$5K-15K): Build the actual voice agents, chatbots, avatars
- **Revision/Iteration** (+$500): Regenerate with new competitor data
- **Quarterly Updates** ($3K/quarter): Refresh competitive intelligence every 3 months

---

## 🔧 Tech Stack Summary

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 14 | Form + Dashboard |
| **Styling** | Tailwind CSS | Design tokens |
| **Database** | Supabase (PostgreSQL) | Company + Report storage |
| **Storage** | Supabase Storage | File uploads + PDFs |
| **Automation** | n8n | Workflow orchestration |
| **Scraping** | Firecrawl | Competitor websites |
| **AI** | Gemini 1.5 Flash (OpenRouter) | Research analysis |
| **PDF** | jsPDF or Puppeteer | Report generation |
| **Hosting** | Vercel (frontend) + Railway (n8n) | Production deployment |

---

## 📚 Next Steps

1. **Set up Supabase** (copy DATABASE_SCHEMA.sql)
2. **Build Next.js form** (use design tokens from planning docs)
3. **Create n8n workflow** (follow node structure above)
4. **Write prompts** (use templates provided)
5. **Test end-to-end** (submit form → check dashboard → download PDF)
6. **Deploy** (Vercel + Railway)
7. **Launch** (start marketing $1,500 research service)

---

## 🎓 Key Insights from Deep Agents Video

1. **File System Communication** - Use virtual files for large docs (question.txt, final_report.md)
2. **Sub-Agent Delegation** - Main agent doesn't do research, it coordinates specialists
3. **One Question at a Time** - Research sub-agent gets single focused query
4. **Critique Loop** - Quality control agent reviews and scores output
5. **Todo List Tracking** - Visual progress for complex workflows
6. **Recursion Limit** - Set high (1000) for deep research tasks

---

**System Version**: 1.0
**Created**: January 16, 2026
**Cost**: $0.10-0.50 per report
**Revenue**: $1,500 per report
**Margin**: 99.97%

🚀 **Ready to build the highest-margin service in your agency.**
