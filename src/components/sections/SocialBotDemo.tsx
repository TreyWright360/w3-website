import { useState, useEffect } from 'react';
import { Instagram, MessageSquare, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function SocialBotDemo() {
  const [step, setStep] = useState(0);

  const messages = [
    { type: 'in', text: "How much is your service?", platform: 'insta' },
    { type: 'process', text: "Analyzing Context...", platform: 'brain' },
    { type: 'out', text: "Hey! Our plans start at $97/mo. Want a demo?", platform: 'insta' },
    { type: 'in', text: "Do you have availability tomorrow?", platform: 'sms' },
    { type: 'process', text: "Checking Calendar...", platform: 'brain' },
    { type: 'out', text: "Yes! 2pm & 4pm open. Which works?", platform: 'sms' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const currentMsg = messages[step];

  return (
    <section className="py-20 bg-black/20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          One Brain. <span className="text-[--primary]">Every Channel.</span>
        </h2>
        <p className="text-[--text-secondary] text-lg max-w-2xl mx-auto mb-16">
           Stop managing 5 different inboxes. Our Omni-Channel AI handles Instagram, Facebook, SMS, and Email simultaneously.
        </p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start relative">
          
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[150px] left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-[--primary] to-blue-500 opacity-20" />

          {/* Insta Card */}
          <div className={`relative z-10 p-6 rounded-2xl bg-[--bg-secondary] border border-[--border-default] min-h-[300px] flex flex-col transition-all duration-500 ${currentMsg.platform === 'insta' ? 'ring-2 ring-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.2)]' : 'opacity-60 scale-95'}`}>
             <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[--border-default]">
                 <div className="p-2 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-lg">
                     <Instagram className="text-white w-5 h-5" />
                 </div>
                 <span className="font-bold">Instagram DM</span>
             </div>
             <div className="flex-1 space-y-4 text-left text-sm">
                 <div className="p-3 bg-[--bg-tertiary] rounded-2xl rounded-tl-none max-w-[80%]">Hey, I saw your ad.</div>
                 <div className="space-y-2">
                     <AnimatePresence>
                        {step >= 0 && (
                            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="p-3 bg-[--bg-tertiary] rounded-2xl rounded-tl-none max-w-[80%]">
                                How much is your service?
                            </motion.div>
                        )}
                        {step >= 2 && (
                            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="p-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-2xl rounded-br-none max-w-[80%] self-end ml-auto">
                                Hey! Our plans start at $97/mo. Want a demo?
                            </motion.div>
                        )}
                     </AnimatePresence>
                 </div>
             </div>
          </div>

          {/* BRAIN Card */}
          <div className={`relative z-20 p-8 rounded-2xl bg-black border border-[--primary] min-h-[340px] flex flex-col shadow-[0_0_50px_rgba(0,243,255,0.15)] scale-105`}>
             <div className="flex items-center justify-center gap-3 mb-6">
                 <BrainCircuit className="text-[--primary] w-8 h-8 animate-pulse" />
                 <span className="font-bold text-xl text-[--primary]">AI Core</span>
             </div>
             <div className="flex-1 bg-[--bg-tertiary] rounded-xl p-4 font-mono text-xs text-left overflow-hidden relative">
                 <div className="absolute inset-0 bg-green-500/5 animate-scan pointer-events-none" />
                 <div className="space-y-2 text-green-400">
                     <div>{`> System.Active`}</div>
                     {currentMsg.type === 'process' && (
                         <motion.div initial={{opacity:0}} animate={{opacity:1}} key={step}>
                             <div>{`> Processing Intent...`}</div>
                             <div className="text-[--primary]">{`> Action: ${currentMsg.text}`}</div>
                         </motion.div>
                     )}
                     <div className="mt-4 pt-4 border-t border-white/10 text-[--text-secondary]">
                         <div>Threads Active: 1,420</div>
                         <div>Avg Response: 1.2s</div>
                     </div>
                 </div>
             </div>
          </div>

          {/* SMS Card */}
          <div className={`relative z-10 p-6 rounded-2xl bg-[--bg-secondary] border border-[--border-default] min-h-[300px] flex flex-col transition-all duration-500 ${currentMsg.platform === 'sms' ? 'ring-2 ring-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'opacity-60 scale-95'}`}>
             <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[--border-default]">
                 <div className="p-2 bg-blue-500 rounded-lg">
                     <MessageSquare className="text-white w-5 h-5" />
                 </div>
                 <span className="font-bold">SMS / Text</span>
             </div>
              <div className="flex-1 space-y-4 text-left text-sm">
                 <div className="space-y-2">
                     <AnimatePresence>
                        {step >= 3 && (
                            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="p-3 bg-[--bg-tertiary] rounded-2xl rounded-tl-none max-w-[80%]">
                                Do you have availability tomorrow?
                            </motion.div>
                        )}
                        {step >= 5 && (
                            <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="p-3 bg-blue-600 text-white rounded-2xl rounded-br-none max-w-[80%] self-end ml-auto">
                                Yes! 2pm & 4pm open. Which works?
                            </motion.div>
                        )}
                     </AnimatePresence>
                 </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
