# Website Setup & Connection Guide

## 1. Environment Variables (Vercel)
To make your website functional, you must add the following Environment Variables in your Vercel Project Settings > Environment Variables.

| Variable Name | Description | Where to find it |
| :--- | :--- | :--- |
| `VITE_VAPI_PUBLIC_KEY` | Public Key for Voice AI | [Vapi Dashboard](https://dashboard.vapi.ai) > Accounts |
| `VITE_VAPI_ASSISTANT_ID` | The ID of the specific voice agent | [Vapi Dashboard](https://dashboard.vapi.ai) > Assistants |
| `VITE_N8N_WEBHOOK_URL` | The URL for your Make/n8n automation | Your N8N Editor > Webhook Node (POST) |
| `VITE_HEYGEN_API_KEY` | (Future) For Avatar Streaming | HeyGen Settings > API |

## 2. Speed-to-Lead Automation (N8N)
Your website sends a `POST` request to `VITE_N8N_WEBHOOK_URL` with this JSON body:
```json
{
  "phone": "+15550000000",
  "source": "w3-website-speed-to-lead",
  "timestamp": "2023-10-27T10:00:00Z"
}
```

**Workflow Steps:**
1.  **Webhook Node**: Listen for POST.
2.  **Vapi Node (or HTTP Request)**: Create a call to the phone number.
    *   **Endpoint**: `https://api.vapi.ai/call/phone`
    *   **Body**: 
        ```json
        {
          "phoneNumberId": "YOUR_TWILIO_PHONE_ID_FROM_VAPI",
          "customer": { "number": "{{webhook_phone_number}}" },
          "assistantId": "YOUR_ASSISTANT_ID"
        }
        ```

## 3. SEO Settings
Edit `index.html` to update your meta tags if you want to change how you appear on Google/Social Media.
Current Title: `W3 AI Solutions | Unified AI Conversion Ecosystem`
Current Description: `Transform your business with the Unified Conversion Ecosystem...`

## 4. Troubleshooting
*   **"Authentication Error" on Voice Demo**: Check `VITE_VAPI_PUBLIC_KEY` is set in Vercel.
*   **Speed-to-Lead doesn't call**: Check `VITE_N8N_WEBHOOK_URL` is set and that your N8N workflow is Active.
