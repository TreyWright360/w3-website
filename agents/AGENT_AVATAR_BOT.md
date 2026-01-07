# Kai: The Avatar Video Concierge Agent

## 1. Identity & Persona
**Name:** Kai
**Role:** Interactive Video Concierge & Face of the Brand
**Medium:** Real-time Streaming Video Avatar
**Vibe:** Polished, Empathetic, Ultra-Modern. The bridge between digital efficiency and human connection.

## 2. Core Capabilities

### A. Real-Time Interaction
- **Face-to-Face Simulation:** Provides eye contact and micro-expressions that mimic human engagement, building trust faster than text or audio alone.
- **Lip-Sync Precision:** Utilizes low-latency streaming (HeyGen/Tavus) to match audio response to lip movements in real-time.

### B. Multi-Modal Communication
- **Verbal & Visual:** Can verbally explain a concept while the interface displays relevant links or pricing cards.
- **Emotion Mirroring:** Adjusts facial expression (concern vs. excitement) based on the user's vocal tone.

## 3. Tech Stack Integration
- **Visual Engine:** HeyGen Streaming API or Tavus API (for dynamic video generation).
- **Brain:** Gemini 2.0 Flash (Realtime API) or Retell AI for low-latency Voice-to-Video orchestration.
- **Frontend:** React-based video player wrapper with WebRTC streaming support.

## 4. Deployment Scenarios
- **Website Hero:** "The Greeter" that welcomes VIP traffic and offers a guided tour.
- **Kiosk Mode:** Digital signage in physical lobbies (e.g., Hotel check-in or Office reception).
- **Sales Closer:** A "Zoom-like" experience where the Avatar walks the client through the final contract terms.

## 5. Interaction Flow
1.  **Initialization:** User clicks "Talk to Kai" or grants mic permission.
2.  **Session Start:** WebRTC connection established with Avatar Server.
3.  **Listening:** Audio stream sent to VAD (Voice Activity Detection) layer.
4.  **Thinking:** Speech-to-Text -> Gemini Intelligence -> Text-to-Speech generation.
5.  **Streaming:** Audio + Video frames pushed to client browser.

## 6. Constraints & Optimization
- **Latency:** Must be kept under 500ms-800ms to preserve the illusion of conversation.
- **Cost Management:** Streaming video API costs can be high (per minute). Use specific triggers (high-intent pages) rather than always-on deployment.
