import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, PhoneOff, Mic } from 'lucide-react';

export function MeetMia() {
    const [isCallActive, setIsCallActive] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const vapiRef = useRef<any>(null);

    useEffect(() => {
        // Dynamically import Vapi to avoid SSR issues
        const initVapi = async () => {
            try {
                const vapiPublicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;
                if (!vapiPublicKey) return;

                const { default: Vapi } = await import('@vapi-ai/web');
                vapiRef.current = new Vapi(vapiPublicKey);

                vapiRef.current.on('call-start', () => {
                    setIsCallActive(true);
                    setIsConnecting(false);
                });

                vapiRef.current.on('call-end', () => {
                    setIsCallActive(false);
                    setIsConnecting(false);
                });
            } catch (error) {
                console.error('Failed to initialize Vapi:', error);
            }
        };

        initVapi();

        return () => {
            if (vapiRef.current) {
                vapiRef.current.stop();
            }
        };
    }, []);

    const handleStartSession = async () => {
        const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;

        if (!vapiRef.current || !assistantId) {
            alert('Voice demo is currently unavailable. Please try again later.');
            return;
        }

        if (isCallActive) {
            vapiRef.current.stop();
            return;
        }

        try {
            setIsConnecting(true);
            await vapiRef.current.start(assistantId);
        } catch (error) {
            console.error('Failed to start call:', error);
            setIsConnecting(false);
            alert('Failed to connect. Please try again.');
        }
    };

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[--primary]/5 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[--primary]/10 border border-[--primary]/20 text-[--primary] mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-medium">AI Voice Agent</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-[--primary] to-[--accent]">Mia.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-[--text-secondary] max-w-xl mx-auto"
                    >
                        Your 24/7 AI voice assistant. Click below to talk to her now.
                    </motion.p>
                </div>

                {/* Avatar Container - Smaller */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="max-w-sm mx-auto"
                >
                    <div
                        className={`relative rounded-3xl overflow-hidden cursor-pointer group ${isCallActive ? 'ring-4 ring-[--primary] ring-opacity-50' : ''}`}
                        onClick={handleStartSession}
                    >
                        {/* Image */}
                        <img
                            src="/images/mia-avatar.png"
                            alt="Mia - AI Voice Assistant"
                            className={`w-full h-auto transition-transform duration-500 ${isCallActive ? 'scale-105' : 'group-hover:scale-105'}`}
                        />

                        {/* Overlay */}
                        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ${isCallActive ? 'bg-black/50 opacity-100' : 'bg-black/40 opacity-0 group-hover:opacity-100'}`}>
                            {/* Button */}
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transform transition-all ${isCallActive ? 'bg-red-500 scale-110' : 'bg-white/20 backdrop-blur-sm group-hover:scale-110'}`}>
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isCallActive ? 'bg-red-600' : 'bg-white'}`}>
                                    {isConnecting ? (
                                        <div className="w-8 h-8 border-4 border-[--primary] border-t-transparent rounded-full animate-spin" />
                                    ) : isCallActive ? (
                                        <PhoneOff className="w-8 h-8 text-white" />
                                    ) : (
                                        <Play className="w-8 h-8 text-[--bg-primary] ml-1" fill="currentColor" />
                                    )}
                                </div>
                            </div>
                            <span className="text-white text-lg font-bold">
                                {isConnecting ? 'Connecting...' : isCallActive ? 'End Call' : 'Talk to Mia'}
                            </span>
                        </div>

                        {/* Active call indicator */}
                        {isCallActive && (
                            <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-500/90 px-3 py-1 rounded-full">
                                <Mic className="w-4 h-4 text-white animate-pulse" />
                                <span className="text-white text-sm font-medium">Live</span>
                            </div>
                        )}

                        {/* Bottom gradient bar */}
                        <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${isCallActive ? 'from-green-500 to-emerald-500' : 'from-[--primary] to-[--accent]'}`} />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
