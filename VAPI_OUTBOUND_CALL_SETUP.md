# VAPI Outbound Call Setup Guide

This guide will help you set up the outbound calling feature for your W3 AI Solutions website.

## Overview

When users enter their phone number on your website and click "Call Me", this workflow:
1. Receives the phone number via webhook
2. Formats it correctly for VAPI
3. Triggers an outbound call using VAPI's API
4. Connects the user to your AI assistant (Ava)

---

## Step 1: Get Your VAPI Credentials

You need two keys from VAPI:

### A. VAPI Private Key (for server-side API calls)
1. Go to [vapi.ai/dashboard](https://vapi.ai/dashboard)
2. Click on **Settings** → **API Keys**
3. Copy your **Private Key** (starts with `sk_...`)
   - ⚠️ Keep this secret! Never expose in frontend code

### B. VAPI Assistant ID
1. In VAPI dashboard, go to **Assistants**
2. Find your "Ava" assistant (or create one)
3. Copy the **Assistant ID**

### C. VAPI Phone Number ID
1. Go to **Phone Numbers** in VAPI dashboard
2. Purchase or connect a phone number if you haven't
3. Copy the **Phone Number ID**

---

## Step 2: Import Workflow to n8n

1. **Open your n8n instance**
2. Click **"Add Workflow"** → **"Import from File"**
3. Select the file: `n8n_Outbound_Call_Workflow.json`
4. The workflow will be imported

---

## Step 3: Configure the Workflow

### Node 1: Webhook (already configured)
- Path: `speed-to-lead-call`
- Method: POST
- No changes needed

### Node 2: Format Phone Number (already configured)
- Automatically formats US phone numbers
- No changes needed

### Node 3: VAPI Outbound Call (NEEDS CONFIGURATION)

**You MUST update these values:**

1. Click on the **"VAPI Outbound Call"** node
2. In the **Headers** section, find "Authorization"
3. Replace `YOUR_VAPI_PRIVATE_KEY` with your actual VAPI Private Key
   ```
   Bearer sk_your_actual_private_key_here
   ```

4. In the **Body Parameters** section:
   - Replace `YOUR_VAPI_ASSISTANT_ID` with your Assistant ID
   - The workflow is currently configured for the simple approach

**IMPORTANT: Choose Your Approach**

There are TWO ways to make outbound calls with VAPI:

#### Approach A: Simple (Phone Number ID in body)
```json
{
  "phoneNumberId": "YOUR_PHONE_NUMBER_ID",
  "assistantId": "YOUR_ASSISTANT_ID",
  "customer": {
    "number": "+15551234567"
  }
}
```

#### Approach B: Using customerNumber parameter
```json
{
  "assistantId": "YOUR_ASSISTANT_ID",
  "customer": {
    "number": "+15551234567"
  }
}
```

**Current configuration uses Approach A.** If VAPI rejects it, switch to Approach B by removing the `phoneNumberId` parameter.

### Node 4 & 5: Response Nodes (already configured)
- These send success/error responses back to your website
- No changes needed

---

## Step 4: Activate the Workflow

1. Click **"Save"** in n8n
2. Toggle the workflow to **"Active"**
3. Copy the **Webhook URL** (should look like):
   ```
   https://n8n.yourdomain.com/webhook/speed-to-lead-call
   ```

---

## Step 5: Add Environment Variable to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **w3-ai-solutions** project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add Another"**
5. Add:
   - **Key:** `VITE_N8N_WEBHOOK_URL`
   - **Value:** Your webhook URL from Step 4
   - **Environment:** Check "Production"
6. Click **"Save"**
7. Go back to **Deployments** and click **"Redeploy"**

---

## Step 6: Test the Feature

1. Visit your website: `https://w3-ai-solutions.vercel.app`
2. Scroll to the **"The Live Challenge"** section
3. Enter your phone number
4. Click **"Call Me"**
5. You should receive a call within 10 seconds!

---

## Troubleshooting

### Error: "Failed to connect. System may be offline."
**Causes:**
- Webhook URL not set in Vercel
- Workflow is not active in n8n
- n8n instance is down

**Fix:** Check that workflow is active and webhook URL is correct in Vercel

### Error: "Invalid phone number"
**Causes:**
- Phone number format is wrong
- Missing country code

**Fix:** The workflow auto-formats US numbers. For international, ensure format is: `+[country code][number]`

### Call doesn't connect / VAPI error
**Causes:**
- Wrong VAPI credentials
- Assistant ID is incorrect
- Phone Number ID is wrong or not purchased
- VAPI account has insufficient credits

**Fix:**
1. Check your VAPI dashboard for API errors
2. Verify credentials in the workflow
3. Ensure VAPI phone number is active and has credits

### Response is slow
**Causes:**
- n8n instance on free tier (slower)
- VAPI API delays

**Fix:** Upgrade n8n hosting or use n8n Cloud

---

## VAPI Outbound Call API Reference

### Endpoint
```
POST https://api.vapi.ai/call/phone
```

### Headers
```json
{
  "Authorization": "Bearer YOUR_VAPI_PRIVATE_KEY",
  "Content-Type": "application/json"
}
```

### Request Body
```json
{
  "phoneNumberId": "YOUR_PHONE_NUMBER_ID",
  "assistantId": "YOUR_ASSISTANT_ID",
  "customer": {
    "number": "+15551234567"
  }
}
```

### Response (Success)
```json
{
  "id": "call_abc123",
  "status": "queued",
  "assistantId": "asst_xyz",
  "customer": {
    "number": "+15551234567"
  }
}
```

---

## Additional Configuration (Optional)

### Add Call Metadata
You can track where calls come from by adding metadata:

In the **VAPI Outbound Call** node, add to body parameters:
```json
{
  "metadata": {
    "source": "w3-website-speed-to-lead",
    "landing_page": "homepage",
    "timestamp": "{{ $json.timestamp }}"
  }
}
```

### Log Calls to Database
Add a node after the VAPI call:
1. **Google Sheets** - Log to spreadsheet
2. **Airtable** - CRM tracking
3. **Webhook** - Send to your own database

### Send Confirmation Email
Add an **Email** node to notify you when calls are made:
1. Add **Send Email** node after VAPI Call
2. Configure with your SMTP or service (SendGrid, Mailgun)
3. Template:
   ```
   Subject: New Speed-to-Lead Call
   Body: Called {{ $json.phone }} at {{ $json.timestamp }}
   ```

---

## Cost Breakdown

### VAPI Costs
- **Phone Number:** ~$1-5/month (Twilio)
- **Outbound Calls:** ~$0.02-0.05/minute
- **AI Processing:** Included in VAPI subscription

### n8n Costs
- **Self-Hosted:** Free (server costs apply)
- **n8n Cloud:** $20/month (Starter)

### Estimated Monthly Cost (100 calls)
- 100 calls × 2 min avg × $0.03/min = **$6/month**
- Phone number = **$2/month**
- Total: **~$8/month** for 100 demo calls

---

## Security Best Practices

1. **Never expose VAPI Private Key in frontend code**
   - Always use server-side or n8n workflow

2. **Rate limiting** (Optional but recommended)
   - Add a node to check if same phone number called in last 5 minutes
   - Prevents spam/abuse

3. **Phone validation**
   - Already included in workflow
   - Validates format before calling VAPI

4. **Webhook authentication** (Optional)
   - Add basic auth to n8n webhook
   - Verify requests come from your domain

---

## Support

If you encounter issues:
1. Check n8n workflow execution logs
2. Check VAPI dashboard for API errors
3. Review Vercel deployment logs
4. Test webhook directly with Postman/curl

---

## Quick Test with Curl

Once workflow is active, test it directly:

```bash
curl -X POST https://n8n.yourdomain.com/webhook/speed-to-lead-call \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+15551234567",
    "source": "test",
    "timestamp": "2026-01-12T00:00:00Z"
  }'
```

Expected response:
```json
{
  "status": "success",
  "message": "Call initiated",
  "phone": "+15551234567",
  "call_id": "call_abc123"
}
```

---

**Setup Complete! 🎉**

Your website can now trigger instant outbound calls via VAPI when users click "Call Me".
