# Social Media Video Creation - Deep Research Integration

## 🎯 Overview

After the deep research report is generated, **automatically create social media videos** using the research insights. These videos become part of the $1,500 deliverable package.

---

## 🎬 Video Types to Create

### 1. Hero Hook Video (30 seconds)
**Purpose**: Attention-grabbing ad that highlights competitor friction

**Content Sources from Research**:
- Competitor friction point
- Client's unique solution
- Dream outcome

**Example**:
> "Tired of generic meal plans that ignore your metabolism? Most nutrition apps treat everyone the same. FitFlow uses AI to analyze YOUR unique metabolic profile. Transform your body in 90 days - personalized for you."

---

### 2. Social Proof Video (15 seconds)
**Purpose**: Quick credibility builder

**Content Sources**:
- Proof assets (case studies, testimonials)
- Dream outcome
- Brand archetype personality

**Example**:
> "127 clients transformed in 90 days. Real results. Real AI. Real transformation. FitFlow Nutrition."

---

### 3. Educational Hook Video (60 seconds)
**Purpose**: Establish authority using competitive insights

**Content Sources**:
- Competitive analysis (what competitors get wrong)
- Client's unique positioning
- Technical constraints (proof of expertise)

**Example**:
> "Why do most meal plans fail? [Show competitor weakness]. Because they don't account for metabolic adaptation. Here's what actually works... [Show FitFlow's AI approach]."

---

### 4. Brand Story Video (30 seconds)
**Purpose**: Emotional connection using brand archetype

**Content Sources**:
- Brand archetype (Hero/Sage/Outlaw/Magician)
- USP
- Voice persona

**Example** (Hero archetype):
> "You're not broken. Your meal plan is. Traditional nutrition apps weren't built for YOUR metabolism. FitFlow was. Be the hero of your own transformation."

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│         STEP 1: Deep Research Completed                         │
│  research_reports.status = 'completed'                          │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────────┐
│         STEP 2: Extract Video Content                           │
│  n8n Function Node                                              │
│                                                                 │
│  Input: research_reports row                                   │
│  Extract:                                                       │
│    • competitor_friction → Hook angle                          │
│    • primary_usp → Unique solution                             │
│    • dream_outcome → Promise/CTA                               │
│    • brand_archetype → Tone/style                              │
│    • ad_video_scripts → Pre-written scripts                    │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────────┐
│         STEP 3: Generate Video Scripts (AI)                     │
│  Gemini Flash via OpenRouter                                   │
│                                                                 │
│  Prompt: "You are a social media video scriptwriter.           │
│  Using this competitive research data, create 4 video scripts: │
│  1. Hero Hook (30s) - competitor friction angle                │
│  2. Social Proof (15s) - credibility                           │
│  3. Educational (60s) - authority positioning                  │
│  4. Brand Story (30s) - emotional connection                   │
│                                                                 │
│  Format each script with:                                      │
│  - Visual descriptions (what's on screen)                      │
│  - Voiceover text                                              │
│  - Text overlays                                               │
│  - Music mood                                                  │
│  - Brand colors (Navy, Beige, Cream)                           │
│                                                                 │
│  Brand Voice: {voice_persona}                                  │
│  Tone: {brand_archetype}"                                      │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────────┐
│         STEP 4: Choose Video Creation Method                    │
│                                                                 │
│  Option A: Static → Animated (Gemini 2.0 Flash)                │
│  Option B: Text-to-Video (Runway, Pika, Kling AI)              │
│  Option C: Template-based (Remotion, Motion Canvas)            │
│  Option D: AI Avatar (HeyGen, Synthesia)                       │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ├─→ OPTION A: Gemini 2.0 (Recommended)
                     │
                     ↓
┌─────────────────────────────────────────────────────────────────┐
│    OPTION A: Gemini 2.0 Flash - Static to Animated             │
│                                                                 │
│  Step 4A-1: Generate Static Images (Ideogram/Flux)             │
│    • Hero shot (product/service visual)                        │
│    • Problem visual (competitor friction)                      │
│    • Solution visual (client's approach)                       │
│    • Result visual (transformation)                            │
│                                                                 │
│  Step 4A-2: Animate with Gemini 2.0 Flash                      │
│    POST https://generativelanguage.googleapis.com/v1beta/      │
│         models/gemini-2.0-flash-exp:generateContent            │
│                                                                 │
│    Body:                                                        │
│    {                                                            │
│      "contents": [                                             │
│        {                                                        │
│          "role": "user",                                       │
│          "parts": [                                            │
│            {                                                    │
│              "inline_data": {                                  │
│                "mime_type": "image/png",                       │
│                "data": "[base64_encoded_image]"                │
│              }                                                  │
│            },                                                   │
│            {                                                    │
│              "text": "Animate this image: Pan right slowly,   │
│                       add subtle zoom. Duration: 5 seconds."   │
│            }                                                    │
│          ]                                                      │
│        }                                                        │
│      ]                                                          │
│    }                                                            │
│                                                                 │
│  Step 4A-3: Stitch Clips (FFmpeg)                              │
│    ffmpeg -i clip1.mp4 -i clip2.mp4 -i clip3.mp4              │
│           -filter_complex "[0:v][1:v][2:v]concat=n=3:v=1"     │
│           -c:v libx264 final.mp4                               │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────────┐
│    OPTION B: Text-to-Video (Runway Gen-3 / Pika / Kling)       │
│                                                                 │
│  Step 4B-1: Format Prompts for Video Generation                │
│    • Shot 1: "Close-up of frustrated person looking at         │
│      generic meal plan app, dramatic lighting, 4k"             │
│    • Shot 2: "Sleek AI dashboard analyzing nutrition data,     │
│      futuristic UI, holographic effects"                       │
│    • Shot 3: "Transformation montage, before/after, cinematic" │
│                                                                 │
│  Step 4B-2: Generate via API                                   │
│    POST https://api.runwayml.com/v1/generate                   │
│    {                                                            │
│      "prompt": "Shot description...",                          │
│      "duration": 5,                                            │
│      "aspect_ratio": "9:16" // Vertical for social            │
│    }                                                            │
│                                                                 │
│  Cost: $0.50-$2 per 5-second clip                              │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────────┐
│    OPTION C: Template-based (Remotion + React)                 │
│                                                                 │
│  Step 4C-1: Use Remotion Templates                             │
│    • Social media templates (pre-built)                        │
│    • Dynamic text injection                                    │
│    • Brand color overlays                                      │
│                                                                 │
│  Step 4C-2: Render via Remotion Lambda                         │
│    npx remotion lambda render                                  │
│        --composition=HeroHook                                   │
│        --props='{"usp": "...", "friction": "..."}'             │
│                                                                 │
│  Cost: $0.01-$0.10 per video (Lambda rendering)                │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────────┐
│    OPTION D: AI Avatar (HeyGen / Synthesia)                    │
│                                                                 │
│  Step 4D-1: Generate Avatar Script                             │
│    • Use voice_persona to choose avatar                        │
│    • Support Specialist → Professional female avatar           │
│    • High-Energy Closer → Dynamic male avatar                  │
│                                                                 │
│  Step 4D-2: Create via HeyGen API                              │
│    POST https://api.heygen.com/v2/video/generate               │
│    {                                                            │
│      "avatar_id": "professional_female_001",                   │
│      "voice_id": "en-US-Neural2-F",                            │
│      "script": "Tired of generic meal plans?...",              │
│      "background": "#213555" // Navy brand color               │
│    }                                                            │
│                                                                 │
│  Cost: $30-120/month (unlimited videos)                        │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────────┐
│         STEP 5: Add Voiceover (ElevenLabs)                      │
│                                                                 │
│  POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}   │
│                                                                 │
│  Body:                                                          │
│  {                                                              │
│    "text": "Tired of generic meal plans that ignore...",       │
│    "model_id": "eleven_multilingual_v2",                       │
│    "voice_settings": {                                         │
│      "stability": 0.5,                                         │
│      "similarity_boost": 0.75                                  │
│    }                                                            │
│  }                                                              │
│                                                                 │
│  Voice Selection Logic:                                        │
│    • voice_persona = "Support Specialist" → Calm, warm         │
│    • voice_persona = "High-Energy Closer" → Dynamic, bold      │
│                                                                 │
│  Cost: $0.30 per 1,000 characters (~$0.05 per 30s script)      │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────────┐
│         STEP 6: Add Captions (AssemblyAI + FFmpeg)             │
│                                                                 │
│  6A: Transcribe voiceover                                      │
│    POST https://api.assemblyai.com/v2/transcript               │
│    { "audio_url": "voiceover.mp3" }                            │
│                                                                 │
│  6B: Generate SRT file                                         │
│    GET /v2/transcript/{id}/srt                                 │
│                                                                 │
│  6C: Burn captions into video                                  │
│    ffmpeg -i video.mp4 -vf subtitles=captions.srt             │
│           -c:a copy output_with_captions.mp4                   │
│                                                                 │
│  Cost: $0.01 per video                                         │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────────┐
│         STEP 7: Add Branding & Music                            │
│                                                                 │
│  7A: Brand Overlays (FFmpeg)                                   │
│    • Company logo (top-left corner)                            │
│    • Website URL (bottom third)                                │
│    • CTA button (last 3 seconds)                               │
│                                                                 │
│    ffmpeg -i video.mp4 -i logo.png                             │
│           -filter_complex "[1:v]scale=100:100[logo];           │
│            [0:v][logo]overlay=10:10"                           │
│           branded_video.mp4                                    │
│                                                                 │
│  7B: Background Music (Epidemic Sound / Uppbeat)               │
│    • Match brand_archetype to music mood:                      │
│      - The Hero → Uplifting, energetic                         │
│      - The Sage → Calm, thoughtful                             │
│      - The Outlaw → Edgy, rebellious                           │
│      - The Magician → Mysterious, transformative               │
│                                                                 │
│    ffmpeg -i video.mp4 -i music.mp3                            │
│           -filter_complex "[1:a]volume=0.2[music];             │
│            [0:a][music]amix=inputs=2"                          │
│           final_video.mp4                                      │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────────┐
│         STEP 8: Export Multiple Formats                         │
│                                                                 │
│  8A: Square (1:1) for Instagram Feed                           │
│    ffmpeg -i final.mp4 -vf "scale=1080:1080:                  │
│           force_original_aspect_ratio=decrease,                │
│           pad=1080:1080:(ow-iw)/2:(oh-ih)/2"                   │
│           instagram_square.mp4                                 │
│                                                                 │
│  8B: Vertical (9:16) for Stories/Reels/TikTok                  │
│    ffmpeg -i final.mp4 -vf "scale=1080:1920:                  │
│           force_original_aspect_ratio=decrease,                │
│           pad=1080:1920:(ow-iw)/2:(oh-ih)/2"                   │
│           vertical.mp4                                         │
│                                                                 │
│  8C: Landscape (16:9) for YouTube/LinkedIn                     │
│    ffmpeg -i final.mp4 -vf "scale=1920:1080"                  │
│           landscape.mp4                                        │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────────┐
│         STEP 9: Store Videos in Supabase                        │
│                                                                 │
│  Upload to: research-files/{company_id}/videos/                │
│    • hero_hook_square.mp4                                      │
│    • hero_hook_vertical.mp4                                    │
│    • social_proof_square.mp4                                   │
│    • educational_landscape.mp4                                 │
│    • brand_story_vertical.mp4                                  │
│                                                                 │
│  Create new table: social_media_videos                         │
│    • id (UUID)                                                 │
│    • company_id (FK)                                           │
│    • video_type (hero_hook, social_proof, educational, etc.)   │
│    • format (square, vertical, landscape)                      │
│    • storage_url (Supabase Storage URL)                        │
│    • script_text (for reference)                               │
│    • duration_seconds                                          │
│    • file_size_bytes                                           │
│    • created_at                                                │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────────┐
│         STEP 10: Update Research Report                         │
│                                                                 │
│  Add to research_reports table:                                │
│    • social_media_videos (JSONB array)                         │
│      [                                                          │
│        {                                                        │
│          "type": "hero_hook",                                  │
│          "formats": {                                          │
│            "square": "https://...",                            │
│            "vertical": "https://..."                           │
│          },                                                     │
│          "script": "Tired of generic...",                      │
│          "duration": 30                                        │
│        }                                                        │
│      ]                                                          │
│                                                                 │
│  Update status:                                                │
│    research_reports.videos_generated = true                    │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────────────┐
│         STEP 11: Show in Dashboard                              │
│                                                                 │
│  Report View → New Tab: "Social Media Videos"                  │
│                                                                 │
│  ┌─────────────────────────────────────────┐                   │
│  │ Hero Hook Video (30s)                   │                   │
│  │ ┌──────────────────┐                    │                   │
│  │ │ [Video Player]   │  [Download ↓]      │                   │
│  │ │                  │  • Square (1:1)    │                   │
│  │ │                  │  • Vertical (9:16) │                   │
│  │ └──────────────────┘                    │                   │
│  │                                         │                   │
│  │ Script:                                 │                   │
│  │ "Tired of generic meal plans..."        │                   │
│  └─────────────────────────────────────────┘                   │
│                                                                 │
│  [Repeat for all 4 video types]                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Brand Consistency Rules

### Color Application
```javascript
// Extract from research_reports
const brandColors = {
  primary: '#213555',   // Navy (from design tokens)
  secondary: '#3E5879', // Slate Blue
  accent: '#D8C4B6',    // Beige
  background: '#F5EFE7' // Cream
};

// Apply to:
// - Text overlays (Navy text on Cream background)
// - Lower thirds (Beige bars)
// - End screen CTA (Navy button)
```

### Font Application
```javascript
// From design tokens
const fonts = {
  headlines: 'Nothing You Could Do', // Display font
  body: 'Work Sans'                  // UI font
};

// Apply to:
// - Opening text: Nothing You Could Do (personality)
// - Body captions: Work Sans (readability)
```

---

## 💰 Cost Breakdown (Per Company)

### Option A: Gemini 2.0 + Static Images (Recommended)
| Component | Cost |
|-----------|------|
| Script generation (Gemini Flash) | $0.02 |
| 4 static images (Ideogram) | $0.40 |
| 4 animations (Gemini 2.0) | $0.80 |
| 4 voiceovers (ElevenLabs) | $0.20 |
| 4 caption generations (AssemblyAI) | $0.04 |
| FFmpeg processing (free/Lambda) | $0.05 |
| **Total** | **$1.51** |

### Option B: Runway Gen-3 Text-to-Video
| Component | Cost |
|-----------|------|
| Script generation | $0.02 |
| 12 video clips (4 videos × 3 shots) | $18.00 |
| Voiceovers | $0.20 |
| Captions | $0.04 |
| Processing | $0.05 |
| **Total** | **$18.31** |

### Option C: Remotion Templates
| Component | Cost |
|-----------|------|
| Script generation | $0.02 |
| Lambda rendering (4 videos) | $0.40 |
| Voiceovers | $0.20 |
| Captions | $0.04 |
| **Total** | **$0.66** |

### Option D: HeyGen AI Avatar
| Component | Cost |
|-----------|------|
| Script generation | $0.02 |
| HeyGen (monthly subscription) | $3.75/video |
| Captions | $0.04 |
| **Total** | **$15.00** |

**Recommendation**: Use **Option C (Remotion)** for MVP, upgrade to **Option A (Gemini 2.0)** for premium quality.

---

## 📊 Updated Database Schema

```sql
-- Add to existing schema
CREATE TABLE social_media_videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    report_id UUID NOT NULL REFERENCES research_reports(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Video metadata
    video_type TEXT NOT NULL CHECK (video_type IN ('hero_hook', 'social_proof', 'educational', 'brand_story')),
    format TEXT NOT NULL CHECK (format IN ('square', 'vertical', 'landscape')),
    duration_seconds INTEGER NOT NULL,

    -- Content
    script_text TEXT NOT NULL,
    storage_url TEXT NOT NULL, -- Supabase Storage URL
    thumbnail_url TEXT,

    -- Technical
    file_size_bytes INTEGER,
    resolution TEXT, -- e.g., '1080x1080'
    codec TEXT DEFAULT 'h264',

    -- Status
    generation_status TEXT DEFAULT 'pending' CHECK (generation_status IN ('pending', 'generating', 'completed', 'failed')),
    error_message TEXT
);

-- Add field to research_reports
ALTER TABLE research_reports
ADD COLUMN videos_generated BOOLEAN DEFAULT false;

-- Index
CREATE INDEX idx_social_videos_company ON social_media_videos(company_id);
CREATE INDEX idx_social_videos_report ON social_media_videos(report_id);
```

---

## 🔧 n8n Workflow Extension

Add these nodes **after** the main research workflow:

```
[14. Research Complete]
       ↓
[15. Extract Video Content] (Function Node)
       ↓
[16. Generate Video Scripts] (HTTP: Gemini Flash)
       ↓
[17. Split into 4 Videos] (Split In Batches)
       ↓
[18. For Each Video Type:]
       ├─→ [Generate Voiceover] (HTTP: ElevenLabs)
       ├─→ [Generate Visual] (HTTP: Remotion/Gemini)
       ├─→ [Add Captions] (HTTP: AssemblyAI)
       ├─→ [Merge A/V] (Bash: FFmpeg)
       ├─→ [Export Formats] (Bash: FFmpeg 3x)
       └─→ [Upload to Supabase Storage]
       ↓
[19. Update Database] (Supabase: Insert social_media_videos)
       ↓
[20. Update Report] (Supabase: Set videos_generated = true)
       ↓
[21. Send Email] "Your research + videos are ready!"
```

---

## 📱 Dashboard Implementation

### New Component: VideoGallery.tsx
```typescript
interface VideoGalleryProps {
  reportId: string;
}

export function VideoGallery({ reportId }: VideoGalleryProps) {
  const videos = useVideos(reportId); // Fetch from Supabase

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {videos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

function VideoCard({ video }) {
  return (
    <div className="card">
      <h3>{video.video_type.replace('_', ' ')}</h3>
      <video controls src={video.storage_url} />

      <div className="flex gap-2 mt-4">
        <DownloadButton format="square" url={video.formats.square} />
        <DownloadButton format="vertical" url={video.formats.vertical} />
        <DownloadButton format="landscape" url={video.formats.landscape} />
      </div>

      <div className="mt-4 p-4 bg-cream rounded">
        <h4 className="font-semibold">Script:</h4>
        <p className="text-sm">{video.script_text}</p>
      </div>
    </div>
  );
}
```

---

## ✅ Updated Deliverables

**$1,500 Research Package Now Includes**:

1. ✅ Executive Summary
2. ✅ Competitive Analysis
3. ✅ System Prompts (phone, web, avatar)
4. ✅ Professional PDF Report
5. ✅ **4 Social Media Videos** (NEW!)
   - Hero Hook (30s)
   - Social Proof (15s)
   - Educational (60s)
   - Brand Story (30s)
6. ✅ **12 Video Files Total** (square, vertical, landscape for each)

**New Upsells**:
- **Video Posting Service** (+$500/mo): We post videos to your social accounts
- **A/B Testing Package** (+$300): Generate 3 variants of each video
- **Video Ads Setup** (+$750): Configure Meta Ads + Google Ads with videos

---

## 🎯 Implementation Priority

### Phase 1: MVP (Week 4)
- [ ] Extend n8n workflow (nodes 15-21)
- [ ] Choose video method (Remotion recommended)
- [ ] Add social_media_videos table
- [ ] Create VideoGallery component
- [ ] Test end-to-end (research → videos)

### Phase 2: Quality (Week 5)
- [ ] Upgrade to Gemini 2.0 animations (if needed)
- [ ] Fine-tune brand consistency
- [ ] Add thumbnail generation
- [ ] Implement video previews in dashboard

### Phase 3: Scale (Week 6)
- [ ] Add video posting automation
- [ ] A/B testing variants
- [ ] Analytics tracking (views, engagement)

---

## 🚀 Next Steps

1. **Choose Video Generation Method**:
   - MVP: Remotion ($0.66/company)
   - Premium: Gemini 2.0 ($1.51/company)
   - Enterprise: HeyGen Avatar ($15/company)

2. **Add to n8n Workflow**:
   - Copy nodes 15-21 from above
   - Configure API credentials (ElevenLabs, Remotion/Gemini, AssemblyAI)

3. **Update Database**:
   - Run `social_media_videos` table creation
   - Add `videos_generated` column to research_reports

4. **Build Dashboard Components**:
   - Create `VideoGallery.tsx`
   - Add "Videos" tab to report view

5. **Test**:
   - Submit test form
   - Verify videos generate automatically
   - Check all 3 formats export correctly

---

**Total Updated Cost per Report**: $0.66-$18.31 (depending on method)
**Total Updated Revenue**: $1,500
**Updated Margin**: 98.78%-99.96%

Still ridiculously profitable! 🚀
