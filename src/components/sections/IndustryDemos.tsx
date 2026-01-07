import { useState } from 'react';
import { ShoppingBag, Home, Hammer, Stethoscope, ArrowRight, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const industries = [
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    icon: ShoppingBag,
    color: 'from-pink-500 to-rose-500',
    stats: '24/7 Sales Support',
    demo: {
      type: 'chat',
      title: "The AI 'Personal Shopper'",
      scenario: [
        { role: 'user', text: "I'm looking for a gift for my wife who likes running." },
        { role: 'ai', text: "I can help! Does she prefer trail running or city running? Also, what's your budget?" },
        { role: 'user', text: "City running. Under $150." },
        { role: 'ai', text: "Perfect. I'd recommend the UltraBoost X ($140). It has great pavement shock absorption. Want me to add it to your cart?", product: true }
      ]
    }
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    icon: Home,
    color: 'from-blue-500 to-indigo-500',
    stats: 'Instant Tour Booking',
    demo: {
      type: 'chat',
      title: "The After-Hours Agent",
      scenario: [
        { role: 'user', text: "Is 123 Maple drive still available?" },
        { role: 'ai', text: "Yes it is! It just had a price drop to $450k. Would you like to see the virtual tour or book a viewing?" },
        { role: 'user', text: "Book a viewing for Saturday." },
        { role: 'ai', text: "I have 10am or 2pm open this Saturday. Which works better for you?" }
      ]
    }
  },
  {
    id: 'homeservices',
    name: 'Home Services',
    icon: Hammer,
    color: 'from-orange-500 to-amber-500',
    stats: 'Emergency Dispatch',
    demo: {
        type: 'chat',
      title: "The 24/7 Dispatcher",
      scenario: [
        { role: 'user', text: "My roof is leaking bad." },
        { role: 'ai', text: "I'm sorry to hear that! Is it an active fast leak or a slow drip? And what is your address?" },
        { role: 'user', text: "It's pouring in. 55 Main St." },
        { role: 'ai', text: "Okay, I've marked this as an EMERGENCY. I'm dispatching our on-call tech Mike. He will call you in 2 mins." }
      ]
    }
  },
  {
    id: 'medical',
    name: 'MedSpa / Health',
    icon: Stethoscope,
    color: 'from-emerald-500 to-teal-500',
    stats: 'HIPAA Compliant Intake',
    demo: {
        type: 'chat',
      title: "The Patient Coordinator",
      scenario: [
        { role: 'user', text: "Do you guys do Botox?" },
        { role: 'ai', text: "Yes, we specialize in it! Our nurse practitioner Sarah manages that. Are you a new patient?" },
        { role: 'user', text: "Yes." },
        { role: 'ai', text: "Welcome! To check insurance and availability, I just need your full name to start the secure file." }
      ]
    }
  }
];

export function IndustryDemos() {
  const [activeTab, setActiveTab] = useState(industries[0]);
  const [msgStep, setMsgStep] = useState(0);

  // Auto-play chat simulation
  useState(() => {
    const interval = setInterval(() => {
      setMsgStep(prev => (prev + 1) % (activeTab.demo.scenario.length + 1)); // +1 for pause
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
    <section className="py-24 bg-black/40 relative overflow-hidden">
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            We Built Your <span className="gradient-text">IndustryOS.</span>
          </h2>
          <p className="text-[--text-secondary] text-lg max-w-2xl mx-auto">
             Don't start from scratch. We have pre-trained AI brains for every major industry. Select yours below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
            
            {/* Sidebar Scroller */}
            <div className="lg:col-span-4 flex flex-col gap-4">
                {industries.map((ind) => (
                    <button
                        key={ind.id}
                        onClick={() => { setActiveTab(ind); setMsgStep(0); }}
                        className={`p-6 rounded-2xl border text-left transition-all duration-300 group ${
                            activeTab.id === ind.id 
                            ? `bg-[--bg-secondary] border-[--primary] shadow-lg` 
                            : 'bg-transparent border-transparent hover:bg-[--bg-secondary]/50'
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${ind.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                <ind.icon size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{ind.name}</h3>
                                <p className="text-sm text-[--text-secondary]">{ind.stats}</p>
                            </div>
                            {activeTab.id === ind.id && <ArrowRight className="ml-auto text-[--primary]" size={20} />}
                        </div>
                    </button>
                ))}
            </div>

            {/* Demo Screen */}
            <div className="lg:col-span-8">
                <div className="relative h-[600px] bg-[--bg-secondary] border border-[--border-default] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                    
                    {/* Fake Browser Header */}
                    <div className="h-12 bg-[--bg-tertiary] border-b border-[--border-default] flex items-center px-6 gap-2">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="ml-4 flex-1 bg-black/20 h-6 rounded-full flex items-center px-4 text-xs text-[--text-secondary]">
                           {activeTab.id}.demo-site.com
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 relative p-8 flex flex-col items-center justify-center bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80')] bg-cover bg-center">
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                        
                        {/* THE CHAT WIDGET */}
                        <div className="relative w-full max-w-md bg-white text-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[450px]">
                            {/* Header */}
                            <div className={`p-4 bg-gradient-to-r ${activeTab.color} text-white flex items-center gap-3`}>
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                       <activeTab.icon size={20} />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                                </div>
                                <div>
                                    <div className="font-bold">{activeTab.demo.title}</div>
                                    <div className="text-xs opacity-90">Usually replies in 2s</div>
                                </div>
                            </div>

                            {/* Chat Body */}
                            <div className="flex-1 p-4 bg-gray-50 overflow-y-auto space-y-4">
                                <AnimatePresence mode='popLayout'>
                                    {activeTab.demo.scenario.map((msg, idx) => (
                                        (idx <= msgStep) && (
                                            <motion.div 
                                                key={idx}
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                                                    msg.role === 'user' 
                                                    ? 'bg-blue-600 text-white rounded-tr-none' 
                                                    : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'
                                                }`}>
                                                    {msg.text}
                                                    {/* Special Product Card for Ecom */}
                                                    {msg.product && (
                                                        <div className="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-100 flex gap-3 items-center">
                                                            <div className="w-12 h-12 bg-gray-200 rounded-md shrink-0" />
                                                            <div className="flex-1">
                                                                <div className="font-bold text-xs">Adidas UltraBoost</div>
                                                                <div className="text-xs text-green-600">$140.00</div>
                                                            </div>
                                                            <button className="p-2 bg-black text-white rounded-full">
                                                                <ShoppingCart size={12} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )
                                    ))}
                                    { msgStep === activeTab.demo.scenario.length && (
                                        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center text-xs text-gray-400 mt-4">
                                            Conversation Ended. Resetting...
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Footer */}
                            <div className="p-3 border-t border-gray-100 bg-white">
                                <div className="h-10 bg-gray-100 rounded-full px-4 flex items-center text-sm text-gray-400">
                                    Type your message...
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div>
      </div>
    </section>
  );
}
