# W3 Deep Research System - Quick Start Guide

## 🚀 Get Running in 15 Minutes

### Prerequisites
- Node.js 18+ installed
- Python 3.11+ installed
- Supabase account (free)
- OpenRouter API key (for Gemini Flash)

---

## Step 1: Set Up Supabase (5 minutes)

### 1.1 Create Project
1. Go to https://supabase.com
2. Click **"New Project"**
3. Name: `w3-deep-research`
4. Set database password (save it!)
5. Click **"Create new project"**

### 1.2 Run Database Schema
1. Open **SQL Editor** in Supabase dashboard
2. Click **"New query"**
3. Copy entire contents of `DATABASE_SCHEMA.sql`
4. Paste and click **"Run"**
5. ✅ Should see: "Success. No rows returned"

### 1.3 Create Storage Bucket
1. Go to **Storage** in sidebar
2. Click **"Create a new bucket"**
3. Name: `research-files`
4. Toggle **"Public bucket"** ON
5. Click **"Create bucket"**

### 1.4 Get API Keys
1. Go to **Settings** → **API**
2. Copy these values:

```env
# Save these for next steps:
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Step 2: Set Up Python Backend (5 minutes)

### 2.1 Install uv (Modern Python Package Manager)
```bash
# Windows
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Mac/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### 2.2 Create Backend Directory
```bash
cd w3-website
mkdir w3-deep-research
cd w3-deep-research
```

### 2.3 Initialize Python Project
```bash
uv init
uv add fastapi uvicorn supabase langgraph langchain-openai loguru pydantic-settings
```

### 2.4 Create Environment File
Create `.env`:

```env
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key_here

# OpenRouter (for Gemini Flash)
OPENROUTER_API_KEY=your_openrouter_key

# Optional
FIRECRAWL_API_KEY=your_firecrawl_key
ELEVENLABS_API_KEY=your_elevenlabs_key
```

### 2.5 Create Main FastAPI File
Create `src/main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="W3 Deep Research API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok", "service": "w3-deep-research"}

@app.get("/api/health")
def health():
    return {"status": "healthy"}

@app.post("/api/research/trigger")
async def trigger_research(data: dict):
    company_id = data.get("company_id")
    # TODO: Launch Deep Agents workflow
    return {"status": "processing", "company_id": company_id}
```

### 2.6 Start Backend
```bash
uv run uvicorn src.main:app --reload --port 8000
```

Visit: http://localhost:8000/docs

---

## Step 3: Set Up Next.js Frontend (5 minutes)

### 3.1 Install Dependencies
```bash
cd ../  # Back to w3-website
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

### 3.2 Create Environment File
Create `.env.local`:

```env
# Supabase (Frontend - use ANON key)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Python Backend
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### 3.3 Create Form Page
Create `app/research-form/page.tsx`:

```tsx
import ResearchForm from '@/components/ResearchForm'

export default function ResearchFormPage() {
  return (
    <div className="min-h-screen bg-cream py-12">
      <ResearchForm />
    </div>
  )
}
```

### 3.4 Start Frontend
```bash
npm run dev
```

Visit: http://localhost:3000/research-form

---

## Step 4: Test End-to-End (2 minutes)

### 4.1 Submit Test Form
1. Go to http://localhost:3000/research-form
2. Fill out all 4 sections with test data
3. Click "Submit for Research"

### 4.2 Verify in Supabase
1. Go to Supabase → **Table Editor**
2. Open `companies` table
3. ✅ Should see your test submission

### 4.3 Check Backend Logs
In your Python terminal, you should see:
```
INFO: POST /api/research/trigger
```

---

## ✅ Success Checklist

After following this guide, you should have:

- [x] Supabase project with schema deployed
- [x] Storage bucket created
- [x] Python backend running at :8000
- [x] Next.js frontend running at :3000
- [x] Form submits to Supabase successfully
- [x] Backend receives trigger webhook

---

## 🎯 What Works Now

✅ **Form Submission** → Supabase
✅ **Form** → **Backend Trigger** (basic)
✅ **Database** tables ready
✅ **Storage** ready for files

---

## ⏭️ Next Steps (Choose Your Path)

### Path A: Build Deep Agents (Recommended)
**Goal**: Get automated research working

1. **Create Agent Files** (I'll generate these)
   - `src/agents/main_researcher.py`
   - `src/agents/research_agent.py`
   - `src/agents/critique_agent.py`
   - `src/workflows/research_workflow.py`

2. **Test Research Workflow**
   - Submit form → Triggers Deep Agents
   - Agents scrape competitors
   - Generate research report
   - Save to Supabase

3. **Verify Output**
   - Check `research_reports` table
   - Download generated PDF

**Time**: 2-3 hours (I'll create the code)

---

### Path B: Build Dashboard First
**Goal**: View submissions before automating research

1. **Create Dashboard Page**
   - `app/dashboard/page.tsx`
   - Display all companies
   - Show status badges
   - View details

2. **Test Manually**
   - Submit form
   - See in dashboard
   - Manually trigger research

**Time**: 1 hour

---

### Path C: Deploy to Production
**Goal**: Get live on the internet

1. **Deploy Backend to Railway**
   ```bash
   railway login
   railway init
   railway up
   ```

2. **Deploy Frontend to Vercel**
   ```bash
   vercel --prod
   ```

3. **Update Environment Variables**
   - Production Supabase URL
   - Production backend URL

**Time**: 30 minutes

---

## 🐛 Troubleshooting

### Form Won't Submit
**Check**:
- `.env.local` has correct Supabase URL/key
- Supabase project is running
- CORS enabled in Python backend

### Backend Won't Start
**Check**:
- Python 3.11+ installed
- `.env` file exists with all keys
- Port 8000 not already in use

### Database Error
**Check**:
- `DATABASE_SCHEMA.sql` ran successfully
- Using `SERVICE_ROLE_KEY` in backend (not ANON key)
- Table names match exactly

---

## 📊 Current Project Status

### ✅ Complete
1. Database schema (5 tables)
2. Python backend foundation (FastAPI)
3. Next.js form component (4 sections)
4. Supabase integration
5. Basic API endpoints

### ⏳ To Build
1. Deep Agents implementation
2. LangGraph workflow
3. Competitor scraper
4. PDF generator
5. Video generator
6. Admin dashboard

### 🚀 Ready to Deploy
- Frontend → Vercel
- Backend → Railway
- Database → Supabase (already hosted)

---

## 💰 Cost Estimate

### Development (Right Now)
- Supabase: **Free** (50k rows, 500MB storage)
- OpenRouter: **$0** (until you process reports)
- Hosting: **$0** (localhost)

### Production (When Live)
- Supabase: **Free** (stays free tier)
- Railway: **$5/month** (backend hosting)
- Vercel: **Free** (frontend hosting)
- OpenRouter: **$0.10-2/report** (Gemini Flash)

**Total: $5/month + $0.10-2 per report**

---

## 🎓 Learning Resources

### If You Get Stuck

**Supabase Docs**: https://supabase.com/docs
**FastAPI Docs**: https://fastapi.tiangolo.com
**LangGraph Docs**: https://langchain-ai.github.io/langgraph
**uv Docs**: https://docs.astral.sh/uv

### Video Tutorials
- Deep Agents: (transcript you provided)
- Design OS: https://buildermethods.com/design-os

---

## 🤝 Get Help

**Questions?** Check these files:
1. `IMPLEMENTATION_GUIDE.md` - Full technical details
2. `SUPABASE_SETUP_GUIDE.md` - Database setup
3. `PYTHON_ARCHITECTURE.md` - Backend architecture
4. `SYSTEM_DIAGRAM.md` - Visual flow

---

## 🎯 Recommended Next Action

**I suggest**: Let's build the Deep Agents implementation now (Path A)

I'll create:
1. All agent files (main, research, critique)
2. LangGraph workflow
3. Supabase client integration
4. Basic scraper

Then you can:
- Submit form
- Watch agents research
- See report generated
- Download PDF

**Ready? Say "yes" and I'll create the agent files!** 🚀
