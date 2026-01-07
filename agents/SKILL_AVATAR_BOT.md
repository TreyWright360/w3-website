# Avatar & Video Integration Skill

## 1. Skill Overview
This skill focuses on integrating "Headless" Avatar streaming services (HeyGen/Tavus) with large language models to create interactive video agents.

## 2. Technical Competencies

### A. Video Streaming Architecture (WebRTC)
- **Session Management:** Initializing and maintaining a WebRTC handshake between the client browser and the generation server.
- **ICE Candidate Handling:** Troubleshooting STUN/TURN server connectivity issues for P2P streaming.
- **Client-Side Rendering:** Using `<video>` elements to render the incoming stream with minimal buffering.

### B. API Logic (HeyGen/Tavus)
- **Start Session:** Sending `POST` requests to create a unique session ID.
- **Task Submission:** Sending text/audio payloads to the avatar to speak (`task_type: "repeat"` or `task_type: "chat"`).
- **Callback Handling:** Listening for `stream_ready` or `task_completed` events.

### C. Latency Optimization
- **Streaming Tokens:** Creating short-lived secure tokens for the client side.
- **VAD Implementation:** Voice Activity Detection (VAD) to interrupt the avatar when the user speaks (barge-in).

## 3. Implementation Workflow

### Phase 1: Client Setup (React)
1.  **Initialize SDK:** Import `StreamingAvatar` from the provider's SDK.
2.  **Display Container:** Create a DOM element for the video stream.
3.  **Start Button:** User gesture is required to start audio context (browser policy).

### Phase 2: Orchestration (Backend)
1.  **Proxy Server:** Create a lightweight Node/Express or Vercel Function to hide API keys.
2.  **LLM Chain:**
    *   Input: User Audio Transcribed.
    *   Process: Gemini generate response.
    *   Output: Send text to HeyGen API.

## 4. Troubleshooting
- **Black Screen:** Often caused by strict firewall rules blocking UDP ports (WebRTC).
- **Audio/Video Desync:** Usually network jitter. Implement a jitter buffer on the client side if custom logic allows.
