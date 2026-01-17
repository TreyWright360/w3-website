-- W3 AI Solutions Deep Research System
-- Supabase Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Companies table (stores form submissions)
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Section 1: Core Identity
    company_name TEXT NOT NULL,
    website_url TEXT,
    primary_usp TEXT NOT NULL,
    dream_outcome TEXT NOT NULL,
    brand_archetype TEXT CHECK (brand_archetype IN ('The Sage', 'The Hero', 'The Outlaw', 'The Magician')),
    proof_assets JSONB, -- Array of URLs

    -- Section 2: Voice & Personality
    voice_persona TEXT CHECK (voice_persona IN ('Support Specialist', 'High-Energy Closer')),
    forbidden_phrases TEXT[],
    bridge_question TEXT,

    -- Section 3: Competitive Landscape
    competitor_1_name TEXT,
    competitor_1_website TEXT,
    competitor_2_name TEXT,
    competitor_2_website TEXT,
    competitor_3_name TEXT,
    competitor_3_website TEXT,
    competitor_friction TEXT, -- Main complaint about competitors

    -- Section 4: Deep Knowledge
    knowledge_base_files JSONB, -- Array of file URLs
    technical_constraints TEXT,

    -- Contact info
    contact_name TEXT,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,

    -- Status tracking
    research_status TEXT DEFAULT 'pending' CHECK (research_status IN ('pending', 'processing', 'completed', 'failed')),
    n8n_execution_id TEXT,

    -- Metadata
    form_version TEXT DEFAULT 'v1',
    source TEXT DEFAULT 'website' -- Could be 'website', 'manual', 'api'
);

-- Research reports table
CREATE TABLE research_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Research content
    report_type TEXT DEFAULT 'full_ecosystem' CHECK (report_type IN ('full_ecosystem', 'competitor_analysis', 'strategy_only')),

    -- Main sections
    executive_summary TEXT,
    competitive_analysis JSONB, -- Structured competitor data
    conversion_strategy TEXT,
    voice_personality_guide TEXT,
    ad_video_scripts JSONB, -- Array of scripts

    -- Generated assets
    phone_agent_system_prompt TEXT,
    website_bot_system_prompt TEXT,
    avatar_bot_personality TEXT,

    -- File outputs
    pdf_url TEXT, -- S3/Supabase storage URL
    markdown_content TEXT, -- Full markdown report

    -- Research metadata
    research_depth_score INTEGER, -- 1-100 score of research quality
    tokens_used INTEGER,
    processing_time_seconds INTEGER,
    model_used TEXT DEFAULT 'gemini-1.5-flash',

    -- Quality control
    critique_feedback JSONB, -- From critique agent
    revision_count INTEGER DEFAULT 0,

    -- Status
    status TEXT DEFAULT 'generating' CHECK (status IN ('generating', 'completed', 'failed', 'archived'))
);

-- Competitor research cache (to avoid re-scraping)
CREATE TABLE competitor_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    website_url TEXT UNIQUE NOT NULL,
    scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Scraped content
    homepage_content TEXT,
    about_page_content TEXT,
    pricing_data JSONB,
    testimonials JSONB,
    key_features TEXT[],

    -- Analysis
    identified_weaknesses TEXT[],
    unique_positioning TEXT,
    pricing_strategy TEXT,

    -- Metadata
    scrape_successful BOOLEAN DEFAULT true,
    error_message TEXT,

    -- Cache control
    is_stale BOOLEAN DEFAULT false,
    cache_until TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '30 days'
);

-- Research tasks (for tracking sub-agent work)
CREATE TABLE research_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID NOT NULL REFERENCES research_reports(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,

    task_type TEXT CHECK (task_type IN ('research', 'critique', 'scrape', 'synthesis')),
    task_description TEXT NOT NULL,
    task_input JSONB,
    task_output JSONB,

    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
    agent_name TEXT, -- Which sub-agent handled this

    tokens_used INTEGER,
    processing_time_seconds INTEGER
);

-- Research file storage (for knowledge base uploads)
CREATE TABLE research_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL, -- 'pdf', 'docx', 'txt', etc.
    file_size_bytes INTEGER,
    storage_url TEXT NOT NULL, -- Supabase storage URL

    -- Processed content
    extracted_text TEXT,
    extracted_at TIMESTAMP WITH TIME ZONE,

    -- Metadata
    is_processed BOOLEAN DEFAULT false,
    processing_error TEXT
);

-- Indexes for performance
CREATE INDEX idx_companies_email ON companies(contact_email);
CREATE INDEX idx_companies_status ON companies(research_status);
CREATE INDEX idx_companies_created ON companies(created_at DESC);
CREATE INDEX idx_reports_company ON research_reports(company_id);
CREATE INDEX idx_reports_status ON research_reports(status);
CREATE INDEX idx_competitor_url ON competitor_data(website_url);
CREATE INDEX idx_competitor_stale ON competitor_data(is_stale, cache_until);
CREATE INDEX idx_tasks_report ON research_tasks(report_id);
CREATE INDEX idx_tasks_status ON research_tasks(status);

-- Updated timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_research_reports_updated_at BEFORE UPDATE ON research_reports
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_files ENABLE ROW LEVEL SECURITY;

-- Public can insert companies (form submissions)
CREATE POLICY "Anyone can submit form" ON companies
    FOR INSERT WITH CHECK (true);

-- Authenticated users (admin) can view all
CREATE POLICY "Authenticated users can view all companies" ON companies
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view all reports" ON research_reports
    FOR SELECT USING (auth.role() = 'authenticated');

-- Service role can do everything (for n8n webhook)
CREATE POLICY "Service role full access companies" ON companies
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access reports" ON research_reports
    FOR ALL USING (auth.role() = 'service_role');

-- Views for dashboard
CREATE VIEW dashboard_overview AS
SELECT
    c.id,
    c.company_name,
    c.contact_name,
    c.contact_email,
    c.created_at,
    c.research_status,
    c.brand_archetype,
    c.voice_persona,
    rr.id as report_id,
    rr.status as report_status,
    rr.research_depth_score,
    rr.pdf_url,
    rr.created_at as report_created_at,
    (SELECT COUNT(*) FROM research_tasks WHERE report_id = rr.id) as task_count,
    (SELECT COUNT(*) FROM research_tasks WHERE report_id = rr.id AND status = 'completed') as completed_tasks
FROM companies c
LEFT JOIN research_reports rr ON c.id = rr.company_id
ORDER BY c.created_at DESC;

-- Function to get competitor analysis summary
CREATE OR REPLACE FUNCTION get_competitor_analysis(company_uuid UUID)
RETURNS JSONB AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT jsonb_build_object(
        'competitors', jsonb_build_array(
            jsonb_build_object(
                'name', c.competitor_1_name,
                'website', c.competitor_1_website,
                'data', cd1.identified_weaknesses
            ),
            jsonb_build_object(
                'name', c.competitor_2_name,
                'website', c.competitor_2_website,
                'data', cd2.identified_weaknesses
            ),
            jsonb_build_object(
                'name', c.competitor_3_name,
                'website', c.competitor_3_website,
                'data', cd3.identified_weaknesses
            )
        ),
        'friction_point', c.competitor_friction
    )
    INTO result
    FROM companies c
    LEFT JOIN competitor_data cd1 ON cd1.website_url = c.competitor_1_website
    LEFT JOIN competitor_data cd2 ON cd2.website_url = c.competitor_2_website
    LEFT JOIN competitor_data cd3 ON cd3.website_url = c.competitor_3_website
    WHERE c.id = company_uuid;

    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Sample data (optional, for testing)
-- INSERT INTO companies (company_name, contact_email, primary_usp, dream_outcome, brand_archetype)
-- VALUES ('Test Company Inc', 'test@example.com', 'We deliver faster than anyone', 'Transform your business in 30 days', 'The Hero');
