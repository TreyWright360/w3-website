# Supabase Setup Guide - W3 Deep Research System

## 🎯 Quick Setup (5 Minutes)

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click **"New Project"**
3. Fill in:
   - **Name**: `w3-deep-research`
   - **Database Password**: (save this!)
   - **Region**: Choose closest to you
4. Click **"Create new project"**
5. Wait 2 minutes for provisioning

---

### Step 2: Run Database Schema

1. In your Supabase project, click **"SQL Editor"** in left sidebar
2. Click **"New query"**
3. Open `DATABASE_SCHEMA.sql` from your project
4. Copy ALL the contents (entire file)
5. Paste into Supabase SQL Editor
6. Click **"Run"** (or press Ctrl+Enter)
7. You should see: ✅ Success. No rows returned

**What this creates:**
- ✅ 5 tables: companies, research_reports, competitor_data, research_tasks, research_files
- ✅ Indexes for performance
- ✅ Row-Level Security policies
- ✅ Helper views and functions

---

### Step 3: Create Storage Bucket

1. Click **"Storage"** in left sidebar
2. Click **"Create a new bucket"**
3. Fill in:
   - **Name**: `research-files`
   - **Public**: Toggle ON (so PDFs can be downloaded)
4. Click **"Create bucket"**

**Folder Structure** (auto-created by backend):
```
research-files/
├── reports/
│   └── {company_id}/
│       ├── report.pdf
│       └── final_report.md
├── videos/
│   └── {company_id}/
│       ├── hero_hook_square.mp4
│       └── ...
└── uploads/
    └── {company_id}/
        ├── sop.pdf
        └── training_data.docx
```

---

### Step 4: Get API Credentials

1. Click **"Settings"** (gear icon) in left sidebar
2. Click **"API"** under Project Settings
3. Copy these values:

#### For Frontend (Next.js .env.local):
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### For Backend (Python .env):
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Important**:
- `ANON_KEY` = Frontend (public, read-only)
- `SERVICE_ROLE_KEY` = Backend (private, full access)

---

### Step 5: Verify Setup

Run this SQL query in SQL Editor:

```sql
-- Check tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Should return:
-- companies
-- competitor_data
-- research_files
-- research_reports
-- research_tasks
```

Expected output: 5 rows

---

## 🧪 Test with Sample Data

### Insert a Test Company

```sql
INSERT INTO companies (
    company_name,
    contact_email,
    primary_usp,
    dream_outcome,
    brand_archetype,
    voice_persona,
    competitor_friction
) VALUES (
    'Test Company Inc',
    'test@example.com',
    'We deliver AI solutions 10x faster than competitors',
    'Launch your AI automation in 30 days, not 6 months',
    'The Hero',
    'High-Energy Closer',
    'Other agencies take too long and charge too much'
) RETURNING id;
```

**Copy the returned UUID** - you'll use this for testing!

---

### Query Test Company

```sql
SELECT * FROM companies WHERE contact_email = 'test@example.com';
```

You should see your test company with:
- ✅ `id` (UUID)
- ✅ `research_status` = 'pending'
- ✅ All your data fields

---

### Create Test Report

```sql
INSERT INTO research_reports (
    company_id,
    report_type,
    executive_summary,
    status
) VALUES (
    'YOUR_COMPANY_ID_HERE',  -- Replace with UUID from above
    'full_ecosystem',
    'This is a test executive summary for the deep research report.',
    'generating'
) RETURNING id;
```

---

### Test Dashboard Query

This is the query your dashboard will use:

```sql
SELECT
    c.id,
    c.company_name,
    c.contact_name,
    c.contact_email,
    c.created_at,
    c.research_status,
    c.brand_archetype,
    rr.id as report_id,
    rr.status as report_status,
    rr.research_depth_score,
    rr.pdf_url
FROM companies c
LEFT JOIN research_reports rr ON c.id = rr.company_id
ORDER BY c.created_at DESC;
```

---

## 🔐 Security Setup (Row-Level Security)

The schema already includes RLS policies. Here's what they do:

### Policy 1: Public Form Submission
```sql
-- Anyone can submit the form (insert into companies)
CREATE POLICY "Anyone can submit form" ON companies
    FOR INSERT WITH CHECK (true);
```

### Policy 2: Admin Dashboard Access
```sql
-- Authenticated users (you) can view all companies
CREATE POLICY "Authenticated users can view all companies" ON companies
    FOR SELECT USING (auth.role() = 'authenticated');
```

### Policy 3: Backend Full Access
```sql
-- Service role (Python backend) can do everything
CREATE POLICY "Service role full access companies" ON companies
    FOR ALL USING (auth.role() = 'service_role');
```

**This means:**
- ✅ Form submission works without login (public)
- ✅ Dashboard requires Supabase Auth (admin only)
- ✅ Python backend has full access (service role key)

---

## 🔧 Optional: Add Auth for Dashboard

If you want to protect the admin dashboard:

### Step 1: Enable Email Auth

1. Go to **Authentication** → **Providers**
2. Toggle **"Email"** to ON
3. Save

### Step 2: Create Admin User

1. Go to **Authentication** → **Users**
2. Click **"Add user"**
3. Fill in:
   - **Email**: your@email.com
   - **Password**: (strong password)
4. Click **"Create user"**

### Step 3: Test Login

In your Next.js app:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'your@email.com',
  password: 'your_password'
})
```

---

## 📊 Useful Queries

### Count Total Companies
```sql
SELECT COUNT(*) FROM companies;
```

### Companies by Status
```sql
SELECT
    research_status,
    COUNT(*) as count
FROM companies
GROUP BY research_status;
```

### Recent Submissions
```sql
SELECT
    company_name,
    contact_email,
    research_status,
    created_at
FROM companies
ORDER BY created_at DESC
LIMIT 10;
```

### Reports with Quality Scores
```sql
SELECT
    c.company_name,
    rr.research_depth_score,
    rr.status,
    rr.created_at
FROM research_reports rr
JOIN companies c ON rr.company_id = c.id
WHERE rr.research_depth_score IS NOT NULL
ORDER BY rr.research_depth_score DESC;
```

---

## 🐛 Troubleshooting

### Error: "relation does not exist"
**Problem**: Table not created
**Solution**: Run `DATABASE_SCHEMA.sql` again in SQL Editor

### Error: "permission denied"
**Problem**: RLS blocking access
**Solution**: Check you're using `SERVICE_ROLE_KEY` in backend, not `ANON_KEY`

### Error: "duplicate key value violates unique constraint"
**Problem**: Trying to insert duplicate data
**Solution**: Check `contact_email` is unique or use `ON CONFLICT` clause

### Storage Upload Fails
**Problem**: Bucket doesn't exist or not public
**Solution**:
1. Go to Storage
2. Click on `research-files` bucket
3. Click "Settings"
4. Toggle "Public bucket" ON

---

## ✅ Setup Complete Checklist

- [ ] Supabase project created
- [ ] `DATABASE_SCHEMA.sql` executed successfully
- [ ] 5 tables exist (companies, research_reports, etc.)
- [ ] Storage bucket `research-files` created
- [ ] Storage bucket set to public
- [ ] `NEXT_PUBLIC_SUPABASE_URL` copied
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` copied
- [ ] `SUPABASE_SERVICE_ROLE_KEY` copied
- [ ] Test company inserted
- [ ] Test query returns data
- [ ] (Optional) Admin user created for dashboard

---

## 🚀 Next Steps

1. ✅ Supabase is ready
2. Create `.env.local` in Next.js project (add Supabase keys)
3. Create `.env` in Python backend (add Supabase keys)
4. Build the intake form (Next.js)
5. Build the Python backend
6. Test end-to-end!

---

**Your database is ready to receive form submissions and store research reports!** 🎉
