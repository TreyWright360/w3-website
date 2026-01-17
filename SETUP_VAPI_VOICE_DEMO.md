# Fix Mia Voice Demo - VAPI Setup Guide

## Issue
The "Talk to Mia" button shows error: "Voice demo is currently unavailable"

## Cause
Missing VAPI environment variables in Vercel

---

## 🔧 QUICK FIX (5 Minutes)

### Step 1: Get VAPI API Keys (3 min)

1. **Go to VAPI Dashboard**: https://dashboard.vapi.ai
2. **Sign up/Login** (free account)
3. **Get Public Key**:
   - Dashboard → Settings → API Keys
   - Copy **Public Key**
4. **Create Assistant**:
   - Dashboard → Assistants → Create New
   - Name: "Mia - W3 AI Assistant"
   - Model: GPT-4 or Claude
   - Voice: Choose a female voice (e.g., "Alloy" or "Nova")
   - System Prompt:
   ```
   You are Mia, the friendly AI voice assistant for W3 AI Solutions.
   You help answer questions about our AI services including:
   - AI Voice Receptionists
   - Chatbots for social media
   - AI Avatars
   - Deep Research reports

   Be conversational, helpful, and professional. Keep responses concise.
   ```
   - Copy the **Assistant ID** (starts with "asst_")

---

### Step 2: Add to Vercel (2 min)

1. Go to https://vercel.com/dashboard
2. Open **w3-website** project
3. Settings → Environment Variables
4. Add 2 new variables:

```
Name: VITE_VAPI_PUBLIC_KEY
Value: (paste your VAPI public key)

Name: VITE_VAPI_ASSISTANT_ID
Value: (paste your assistant ID - starts with asst_)
```

5. Click **Save**

---

### Step 3: Redeploy (1 min)

Option A - **Trigger Redeploy**:
1. Vercel dashboard → Deployments
2. Click "..." on latest deployment
3. Click "Redeploy"

Option B - **Git Push**:
```bash
cd "F:/Ai Agency/Trainings/w3-website"
git add .
git commit -m "Remove Powered by text from Mia section"
git push origin main
```

---

## ✅ Test It

After redeployment:
1. Go to https://w3-website-one.vercel.app
2. Scroll to "Meet Mia" section
3. Click on Mia's image
4. Should connect and you can talk! 🎉

---

## 💰 VAPI Pricing

**Free Tier**:
- 10 minutes/month free
- Perfect for testing

**Paid Tier** (if you want production):
- $0.05/minute
- ~100 calls/month = $25-50

---

## Alternative: Disable Voice Demo

If you don't want to set up VAPI right now, you can hide the Mia section:

### Option 1: Comment Out Component

In `src/pages/Home.tsx`, find and comment out:
```tsx
// <MeetMia />
```

### Option 2: Show Coming Soon Message

Edit `src/components/sections/MeetMia.tsx` line 47:
```tsx
alert('Voice demo coming soon! Email us to schedule a live demo.');
```

---

## 📝 What Was Already Fixed

✅ Removed "Powered by Vapi & Claude AI" text under Mia

Now you just need to add the VAPI keys to make the button work!

---

**Time**: 5 minutes to fully working voice demo
**Cost**: Free (VAPI free tier)
