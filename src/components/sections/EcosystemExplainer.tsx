import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Globe, MessageCircle, Phone, Database } from 'lucide-react';

export function EcosystemExplainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const brainScale = useTransform(scrollYProgress, [0.3, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  return (
    <section ref={containerRef} className="py-32 relative bg-[--bg-primary]">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            The <span className="gradient-text">Unified Brain</span> Architecture
          </h2>
          <p className="text-[--text-secondary] text-lg max-w-2xl mx-auto">
            Stop treating your website, phone, and social media as separate islands. Connect them all to one central intelligence.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto h-[600px] flex items-center justify-center">
            
            {/* The Central Brain */}
            <motion.div 
                style={{ scale: brainScale, opacity }}
                className="z-20 relative w-48 h-48 bg-black border-2 border-[--primary] rounded-full flex flex-col items-center justify-center shadow-[0_0_100px_rgba(99,102,241,0.3)]"
            >
                <Brain className="w-16 h-16 text-[--primary] animate-pulse" />
                <div className="mt-4 font-bold text-center">
                    <div className="text-white text-lg">Nexus AI</div>
                    <div className="text-[--text-secondary] text-xs">Central Core</div>
                </div>
                
                {/* Database Ring */}
                <div className="absolute -bottom-12 flex flex-col items-center gap-2">
                    <div className="h-12 w-[1px] bg-gradient-to-b from-[--primary] to-green-500" />
                    <div className="px-4 py-2 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm font-mono flex gap-2 items-center">
                        <Database size={14} /> CRM: Single Source of Truth
                    </div>
                </div>
            </motion.div>


            {/* Satellites */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                
                {/* Website Node */}
                <div className="absolute top-0 right-1/4 translate-x-12 translate-y-12 flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-[--bg-secondary] border border-[--border-default] rounded-2xl flex items-center justify-center shadow-lg">
                        <Globe className="text-blue-400 w-8 h-8" />
                    </div>
                    <div className="text-sm font-bold">Smart Website</div>
                    
                    {/* Connection Line */}
                    <svg className="absolute top-full left-1/2 w-[200px] h-[200px] -translate-x-full" style={{ overflow: 'visible' }}>
                        <path d="M 0 0 C 0 100, 150 100, 150 200" fill="none" stroke="url(#gradient-blue)" strokeWidth="2" className="animate-dash" />
                    </svg>
                </div>

                {/* Phone Node */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 flex flex-row items-center gap-4">
                    <div className="w-20 h-20 bg-[--bg-secondary] border border-[--border-default] rounded-2xl flex items-center justify-center shadow-lg">
                        <Phone className="text-red-400 w-8 h-8" />
                    </div>
                    <div className="text-sm font-bold text-left w-24">Voice AI Receptionist</div>

                    {/* Connection Line */}
                    <svg className="absolute left-full top-1/2 w-[200px] h-2 -translate-y-1/2" style={{ overflow: 'visible' }}>
                        <line x1="0" y1="0" x2="160" y2="0" stroke="url(#gradient-red)" strokeWidth="2" className="animate-dash" />
                    </svg>
                </div>

                {/* Social Node */}
                <div className="absolute bottom-0 right-1/4 translate-x-12 -translate-y-12 flex flex-col-reverse items-center gap-4">
                    <div className="w-20 h-20 bg-[--bg-secondary] border border-[--border-default] rounded-2xl flex items-center justify-center shadow-lg">
                        <MessageCircle className="text-pink-400 w-8 h-8" />
                    </div>
                    <div className="text-sm font-bold">Social DM Bot</div>

                     {/* Connection Line */}
                     <svg className="absolute bottom-full left-1/2 w-[200px] h-[200px] -translate-x-full" style={{ overflow: 'visible' }}>
                        <path d="M 0 0 C 0 -100, 150 -100, 150 -200" fill="none" stroke="url(#gradient-pink)" strokeWidth="2" className="animate-dash" />
                    </svg>
                </div>

            </div>

             {/* SVG Gradients */}
            <svg style={{ width: 0, height: 0 }}>
                <defs>
                    <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60A5FA" stopOpacity="0" />
                        <stop offset="100%" stopColor="#6366F1" />
                    </linearGradient>
                    <linearGradient id="gradient-red" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F87171" stopOpacity="0" />
                        <stop offset="100%" stopColor="#6366F1" />
                    </linearGradient>
                    <linearGradient id="gradient-pink" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#EC4899" stopOpacity="0" />
                        <stop offset="100%" stopColor="#6366F1" />
                    </linearGradient>
                </defs>
            </svg>
    

        </div>
      </div>
    </section>
  );
}
