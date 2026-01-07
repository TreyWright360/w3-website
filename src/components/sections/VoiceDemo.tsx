
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Phone, X, Loader2, AlertCircle } from 'lucide-react';
import Vapi from '@vapi-ai/web';

// Initialize Vapi with Public Key from Environment Variables
const vapiPublicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY || '';
const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID || '';

// Debug logging
console.log('=== VAPI Voice Demo Initialized ===');
console.log('VAPI Public Key present:', !!vapiPublicKey);
if (vapiPublicKey) {
  console.log('VAPI Public Key value:', vapiPublicKey.substring(0, 10) + '...');
} else {
  console.error('CRITICAL: VITE_VAPI_PUBLIC_KEY is missing!');
}
console.log('VAPI Assistant ID present:', !!assistantId);

// Initialize SDK instance
let vapi: any = null;
try {
  if (vapiPublicKey) {
    console.log('Initializing VAPI SDK...');
    vapi = new Vapi(vapiPublicKey);
    console.log('✅ VAPI SDK initialized successfully');
  }
} catch (error) {
  console.error('❌ Failed to initialize VAPI SDK:', error);
}

interface VoiceDemoProps {
  isModal?: boolean;
  onClose?: () => void;
}

export function VoiceDemo({ isModal, onClose }: VoiceDemoProps) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vapi) return;

    // Event listeners
    const onCallStart = () => {
      console.log('📞 Vapi call started');
      setIsConnecting(false);
      setIsCallActive(true);
      setError(null);
    };

    const onCallEnd = () => {
      console.log('call ended');
      setIsCallActive(false);
      setIsConnecting(false);
      setVolumeLevel(0);
    };

    const onVolumeLevel = (level: number) => {
      setVolumeLevel(level);
    };

    const onError = (err: any) => {
      console.error('Vapi error:', err);
      setIsConnecting(false);
      setIsCallActive(false);
      setError('Connection failed. Please check your microphone permissions and try again.');
    };

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('volume-level', onVolumeLevel);
    vapi.on('error', onError);

    return () => {
      // Cleanup
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('volume-level', onVolumeLevel);
      vapi.off('error', onError);
    };
  }, []);

  const toggleCall = async () => {
    // 1. Validation Checks
    if (!vapiPublicKey) {
      const msg = 'Configuration Error: VITE_VAPI_PUBLIC_KEY is missing.';
      console.error(msg);
      setError(msg);
      return;
    }

    if (!vapi) {
      const msg = 'SDK Error: Vapi SDK not initialized.';
      console.error(msg);
      setError(msg);
      return;
    }
    
    if (!assistantId) {
        const msg = 'Configuration Error: VITE_VAPI_ASSISTANT_ID is missing. Please add it to Vercel environment variables.';
        console.error(msg);
        setError(msg);
        return;
    }

    // 2. Handle Stop Call
    if (isCallActive) {
      console.log('Stopping call...');
      vapi.stop();
      return;
    }

    // 3. Handle Start Call
    try {
      console.log('=== Starting VAPI Call ===');
      console.log('Attempting to start VAPI call with Assistant ID:', assistantId);
      setIsConnecting(true);
      setError(null);
      
      // Pass the assistant ID clearly
      await vapi.start(assistantId);
      
    } catch (err: any) {
      console.error('Failed to start call:', err);
      setIsConnecting(false);
      setError(err.message || 'Failed to connect');
    }
  };

  return (
    <section className={`relative overflow-hidden ${isModal ? 'h-full' : 'py-20'}`}>
      {/* Background gradients if not modal */}
      {!isModal && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[--primary] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[--secondary] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse delay-1000" />
        </div>
      )}

      <div className={`${isModal ? 'h-full' : 'container relative z-10'}`}>
        <div className={`mx-auto ${isModal ? 'h-full' : 'max-w-4xl'}`}>
          <div className={`relative bg-[--bg-secondary] border border-[--border-default] overflow-hidden ${isModal ? 'h-full rounded-2xl flex flex-col' : 'rounded-3xl p-8 md:p-12 shadow-2xl'}`}>
            
            {/* Header */}
            {isModal && (
              <div className="flex items-center justify-between p-6 border-b border-[--border-default]">
                <div>
                  <h3 className="text-xl font-bold">Talk to Mia</h3>
                  <p className="text-[--text-secondary] text-sm">AI Receptionist Demo</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-[--bg-tertiary] rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            )}

            <div className={`flex flex-col items-center justify-center ${isModal ? 'flex-1 p-6' : 'text-center'}`}>
              
              {!isModal && (
                <>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[--bg-tertiary] border border-[--border-default] mb-8">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm font-medium">Live Voice Demo</span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Experience <span className="gradient-text">Human-Like</span> Voice AI
                  </h2>
                  
                  <p className="text-xl text-[--text-secondary] mb-12 max-w-2xl mx-auto">
                    Talk to Mia, our AI receptionist. She can handle complex queries, schedule appointments, and qualify leads in real-time.
                  </p>
                </>
              )}

              {/* Interaction Area */}
              <div className="relative w-full max-w-sm mx-auto aspect-square flex flex-col items-center justify-center">
                
                {/* Visualizer Circle */}
                <div className={`absolute inset-0 rounded-full border border-[--primary] opacity-20 transition-all duration-300 ${isCallActive ? 'scale-110' : 'scale-100'}`} />
                <div className={`absolute inset-4 rounded-full border border-[--secondary] opacity-20 transition-all duration-500 ${isCallActive ? 'scale-105' : 'scale-100'}`} />
                
                {/* Main Action Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleCall}
                  disabled={isConnecting}
                  className={`
                    relative z-10 w-32 h-32 rounded-full flex items-center justify-center
                    transition-all duration-300 shadow-glow-lg
                    ${isCallActive 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-gradient-to-r from-[--primary] to-[--secondary] hover:opacity-90'
                    }
                    ${isConnecting ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}
                  `}
                >
                  {isConnecting ? (
                    <Loader2 className="w-12 h-12 text-white animate-spin" />
                  ) : isCallActive ? (
                    <Phone className="w-12 h-12 text-white rotate-[135deg]" />
                  ) : (
                    <Mic className="w-12 h-12 text-white" />
                  )}
                </motion.button>

                {/* Status Text */}
                <div className="absolute -bottom-16 text-center w-full px-4">
                  {error ? (
                    <div className="flex items-center justify-center gap-2 text-red-400 bg-red-400/10 py-2 px-4 rounded-lg">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span className="text-sm font-medium">{error}</span>
                    </div>
                  ) : (
                    <p className="text-lg font-medium">
                      {isConnecting ? 'Connecting...' : isCallActive ? 'Listening...' : 'Tap to start call'}
                    </p>
                  )}
                </div>

                {/* Volume Visualizer (Simple implementation) */}
                {isCallActive && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1 + volumeLevel * 2, 1],
                          opacity: [0.3, 0, 0.3],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: "easeOut",
                        }}
                        className="absolute w-full h-full rounded-full border-2 border-[--primary] opacity-20"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Sample Questions */}
            {!isModal && (
              <div className="mt-12 pt-8 border-t border-[--border-default]">
                {/* UPSELL SECTION (The Pivot) */}
                  <div className="bg-gradient-to-r from-[--primary] to-[--secondary] rounded-xl p-1">
                  <div className="bg-[--bg-secondary] rounded-lg p-6 text-center">
                    <h4 className="text-lg font-bold mb-2">Want this AI Agent on YOUR website?</h4>
                    <p className="text-sm text-[--text-secondary] mb-4">
                      Enter your website URL below. Our AI will analyze your business and build a <span className="text-[--primary] font-bold">Custom 24-Hour Demo</span> instantly.
                    </p>
                    
                    <form 
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.currentTarget;
                        const formData = new FormData(form);
                        let url = formData.get('website') as string;
                        const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                        
                        if (!url) return;
                        
                        // Fix URL if missing protocol
                        if (!url.match(/^https?:\/\//)) {
                            url = `https://${url}`;
                        }

                        try {
                          // Visual Loading State
                          submitBtn.innerText = "Building...";
                          submitBtn.disabled = true;
                          submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

                          // Trigger n8n Webhook
                          const response = await fetch('https://n8n.w3aisolutions.org/webhook/instant-demo-v2', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ url })
                          });

                          const data = await response.json();

                          if (data.status === 'success' && data.assistant_id) {
                            // Success! Redirect to the demo template with params
                            // Using the direct Vercel URL to ensures it works immediately
                            window.location.href = `https://w3-demo-template.vercel.app?bot=${data.assistant_id}`;
                          } else {
                            throw new Error('Build failed');
                          }

                        } catch (err) {
                          console.error('Demo Build Error:', err);
                          alert('Something went wrong starting the build. Please try again.');
                          submitBtn.innerText = "Build My Demo";
                          submitBtn.disabled = false;
                          submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
                        }
                      }}
                      className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto"
                    >
                      <input 
                        type="text" 
                        name="website"
                        placeholder="https://your-business.com" 
                        required
                        className="flex-1 px-4 py-3 rounded-lg bg-[--bg-tertiary] border border-[--border-default] focus:border-[--primary] outline-none transition-all"
                      />
                      <button 
                        type="submit"
                        className="px-6 py-3 rounded-lg bg-[--primary] text-white font-bold hover:bg-[--primary-hover] transition-all shadow-glow min-w-[160px]"
                      >
                        Build My Demo
                      </button>
                    </form>
                    <p className="text-xs text-[--text-muted] mt-3">
                      *Takes ~10 seconds. We'll extract your brand & build a custom voice bot.
                    </p>
                  </div>
                </div>

                <p className="text-center text-[--text-secondary] mt-8 mb-6 text-sm uppercase tracking-wider font-semibold">
                  Or try asking Mia:
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {[
                    "What services do you offer?",
                    "How much does the AI employee cost?",
                    "Can I book a discovery call?",
                  ].map((q, i) => (
                    <div 
                      key={i}
                      className="px-4 py-2 rounded-lg bg-[--bg-tertiary] border border-[--border-default] text-sm hover:border-[--primary] transition-colors cursor-default"
                    >
                      "{q}"
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
