# Social Media Video Workflow - Quick Reference

## 🎬 What Gets Created

After each deep research report completes, **automatically generate**:

### 4 Video Types × 3 Formats = 12 Video Files

1. **Hero Hook Video** (30s)
   - Square (1:1) for Instagram Feed
   - Vertical (9:16) for Reels/Stories/TikTok
   - Landscape (16:9) for YouTube

2. **Social Proof Video** (15s)
   - Square, Vertical, Landscape

3. **Educational Video** (60s)
   - Square, Vertical, Landscape

4. **Brand Story Video** (30s)
   - Square, Vertical, Landscape

---

## 🔄 Workflow (11 Steps)

```
Deep Research Done
   ↓
Extract Content → Generate Scripts (AI) → Choose Method
   ↓
[Method A] Remotion Templates ($0.66) ← RECOMMENDED FOR MVP
[Method B] Gemini 2.0 Animation ($1.51) ← BEST QUALITY
[Method C] Runway Gen-3 ($18.31) ← PREMIUM
[Method D] HeyGen Avatar ($15.00) ← AI SPOKESPERSON
   ↓
Add Voiceover (ElevenLabs) → Add Captions → Brand Overlays
   ↓
Export 3 Formats → Store in Supabase → Show in Dashboard
```

---

## 💰 Cost Comparison

| Method | Cost/Company | Quality | Speed |
|--------|--------------|---------|-------|
| **Remotion** | $0.66 | Good | Fast ⚡ |
| **Gemini 2.0** | $1.51 | Excellent | Fast ⚡ |
| **Runway Gen-3** | $18.31 | Premium | Slow 🐌 |
| **HeyGen Avatar** | $15.00 | Pro | Medium |

**Recommendation**: Start with **Remotion**, upgrade to **Gemini 2.0** for better quality.

---

## 🎨 Content Sources (From Research)

Each video pulls from:
- `competitor_friction` → Hook angle
- `primary_usp` → Unique solution
- `dream_outcome` → CTA/Promise
- `brand_archetype` → Tone/Style
- `voice_persona` → Voiceover choice
- `proof_assets` → Social proof clips

---

## 🔧 Technical Stack

| Component | Tool | Cost |
|-----------|------|------|
| Script Generation | Gemini Flash | $0.02 |
| Visuals | Remotion/Gemini 2.0 | $0.40-0.80 |
| Voiceover | ElevenLabs | $0.20 |
| Captions | AssemblyAI | $0.04 |
| Video Editing | FFmpeg | Free |
| Storage | Supabase | Free tier |

---

## 📊 New Database Table

```sql
CREATE TABLE social_media_videos (
    id UUID PRIMARY KEY,
    company_id UUID REFERENCES companies(id),
    report_id UUID REFERENCES research_reports(id),
    video_type TEXT, -- hero_hook, social_proof, educational, brand_story
    format TEXT, -- square, vertical, landscape
    storage_url TEXT,
    script_text TEXT,
    duration_seconds INTEGER,
    created_at TIMESTAMP
);
```

---

## 🎯 Updated Deliverables

**$1,500 Package Now Includes**:
1. Deep Research Report (PDF)
2. System Prompts (phone, web, avatar)
3. Ad Scripts
4. **12 Social Media Videos** ← NEW!

**New Upsells**:
- Video Posting Service: +$500/mo
- A/B Testing Variants: +$300
- Video Ads Setup: +$750

---

## ✅ Implementation Steps

1. Add `social_media_videos` table to Supabase
2. Extend n8n workflow (add nodes 15-21)
3. Choose video method (Remotion or Gemini 2.0)
4. Configure API keys (ElevenLabs, AssemblyAI, Remotion/Gemini)
5. Build VideoGallery component in dashboard
6. Test end-to-end

---

## 📱 Dashboard View

```
Report Page → New Tab: "Social Media Videos"

┌──────────────────────────────────┐
│ Hero Hook Video (30s)            │
│ [Video Player]                   │
│ Download: □ Square □ Vertical    │
│           □ Landscape            │
│                                  │
│ Script: "Tired of generic..."    │
└──────────────────────────────────┘

[Repeat for all 4 video types]
```

---

**Full Details**: See `SOCIAL_MEDIA_VIDEO_WORKFLOW.md`
