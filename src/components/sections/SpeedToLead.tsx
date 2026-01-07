import { useState } from 'react';
import { Phone, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export function SpeedToLead() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState<'idle' | 'calling' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // 1. Enter your N8N or Make.com Webhook URL here
  const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || '';

  const handleCall = async () => {
    /* 
       VALIDATION: Ensure not empty & basic format 
       (In production, use a library like 'libphonenumber-js')
    */
    if (!phoneNumber || phoneNumber.length < 10) {
        setErrorMessage('Please enter a valid phone number');
        setStatus('error');
        return;
    }
    
    setStatus('calling');
    setErrorMessage('');
    
    try {
        // 2. Real API Call
        if (WEBHOOK_URL) {
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    phone: phoneNumber,
                    source: 'w3-website-speed-to-lead',
                    timestamp: new Date().toISOString() 
                })
            });
            setStatus('success');
        } else {
            // Simulation Mode (If no URL provided)
            console.warn("Demo Mode: No VITE_N8N_WEBHOOK_URL found.");
            setTimeout(() => {
                setStatus('success');
            }, 2000);
        }

    } catch (err) {
        console.error("Failed to trigger call:", err);
        setErrorMessage('Failed to connect. System may be offline.');
        setStatus('error');
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-black/40">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto rounded-3xl border border-[--border-default] bg-[--bg-secondary] p-8 md:p-12 shadow-2xl overflow-hidden relative">
          
          {/* Background Gradient */}
          {/* Background Gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                The Live Challenge
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold">
                Does your team answer in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">10 seconds?</span>
              </h2>
              
              <p className="text-[--text-secondary] text-lg">
                Enter your phone number. Our AI, Ava, will call you immediately to qualify you as a lead. No humans involved.
              </p>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 bg-[--bg-tertiary] border border-[--border-default] rounded-xl px-4 py-3 text-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-[--primary] transition-colors"
                  />
                  <button
                    onClick={handleCall}
                    disabled={status === 'calling' || status === 'success'}
                    className={`px-6 py-3 rounded-xl font-bold text-lg flex items-center gap-2 transition-all ${
                      status === 'success' 
                        ? 'bg-green-500 text-white'
                        : 'bg-[--primary] text-black hover:opacity-90'
                    }`}
                  >
                    {status === 'calling' ? (
                      <Loader2 className="animate-spin" />
                    ) : status === 'success' ? (
                      <>
                        <CheckCircle2 /> Calling...
                      </>
                    ) : (
                      <>
                        <Phone size={20} /> Call Me
                      </>
                    )}
                  </button>
                </div>
                
                {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle size={14} /> {errorMessage}
                    </div>
                )}

                <p className="text-xs text-[--text-secondary]">
                  *Standard rates apply. Calls handled by Autonomous Voice Server.
                </p>
              </div>
            </div>

            {/* Visualizer Side */}
            <div className="flex-1 flex justify-center">
               <div className="relative w-full max-w-xs aspect-square flex items-center justify-center">
                  {/* Rings */}
                  <div className={`absolute inset-0 border border-[--primary] rounded-full opacity-20 transition-transform duration-1000 ${status === 'calling' ? 'scale-150 opacity-0' : 'scale-100'}`} />
                  <div className={`absolute inset-8 border border-[--secondary] rounded-full opacity-20 transition-transform duration-1000 delay-100 ${status === 'calling' ? 'scale-125 opacity-0' : 'scale-100'}`} />
                  
                  {/* Center Icon */}
                  <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-[--bg-tertiary] to-[--bg-primary] border border-[--border-default] rounded-full flex items-center justify-center shadow-2xl">
                    <Phone className={`w-12 h-12 text-[--primary] transition-transform ${status === 'calling' ? 'animate-bounce' : ''}`} />
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
