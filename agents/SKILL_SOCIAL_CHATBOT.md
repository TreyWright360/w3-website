# Omni-Channel Social Bot Development Skill

## 1. Skill Overview
This skill outlines the technical proficiency required to build and deploy "Nexus," the Omni-Channel Social Chatbot, using Google Gemini and Automation platforms (Make/n8n).

## 2. Technical Competencies

### A. Automation Architects (Make/n8n)
- **Webhook Management:** Creating universal listeners for Meta API, Twilio, and Webchat events.
- **Router Logic:** Designing branching paths based on message "Intent" (Sales vs. Support).
- **API Connectivity:** Expertise in GoHighLevel API (`/conversations/messages`) and Gemini API (`v1beta/models/gemini-1.5-pro:generateContent`).

### B. Gemini API Implementation
- **System Instructions:** Structuring the "System Prompt" to enforce platform-specific constraints (e.g., "Max 160 chars for SMS").
- **Function Calling:** Configuring Gemini to "call" external tools (e.g., `check_calendar_availability`, `save_lead_to_crm`).
- **Vision Capabilities:** Implementing logic to handle `image/jpeg` inputs for visual quoting.

### C. Platform Compliance
- **Meta Graph API:** Understanding the 24-hour interaction window rules for automated replies.
- **A2P 10DLC:** Ensuring SMS templates and registration comply with carrier requirements to prevent blocking.

## 3. Implementation Blueprint

### Phase 1: The Brain Setup (n8n/Make)
1.  **Trigger:** Webhook receives data from GHL (Inbound Message).
2.  **Process:** Formatting the conversation history into a Chat Prompt.
3.  **Generate:** Sending payload to Gemini 1.5 Flash for rapid generation.
4.  **Output:** Posting the response back to GHL via API.

### Phase 2: Visual upgrades
1.  Update the n8n flow to detect `media_url` in the webhook.
2.  If present, route to Gemini 1.5 Pro (Vision) node.
3.  Instruction: "Analyze this image and describe the damage/product in the context of a customer inquiry."

## 4. Troubleshooting & Optimization
- **Latency Control:** Targeting <3s response times by using "Flash" models for text-only queries.
- **Loop Prevention:** Implementing logic to stop the bot from replying to itself or "Out of Office" auto-responders.
- **Human Handoff:** Keyword triggers ("Speak to human", "Manager") that pause the workflow and alert a staff member via Slack/Teams.
