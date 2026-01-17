import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function LandingPageHero() {
  const scrollToForm = () => {
    const formSection = document.getElementById('get-demo');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 px-4 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#213555] via-[#3E5879] to-[#213555]" />

      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4CAF50] rounded-full opacity-10 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D8C4B6] rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
            <span className="text-sm font-medium text-white">100% Free Custom Demo • No Credit Card Required</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
          >
            Never Lose Another Lead.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CAF50] to-[#45a049]">
              See Your Business Running on AI
            </span>
            <br />
            <span className="text-4xl md:text-5xl lg:text-6xl">
              — Custom Demo Built in 48 Hours.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#D8C4B6] mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Your brand. Your services. Your customers.
            <br />
            Complete AI demo package — website, voice agent, chatbot, and videos.
            <br />
            <strong className="text-white">100% free. Zero commitment.</strong>
          </motion.p>

          {/* Benefit Bullets */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 max-w-4xl mx-auto"
          >
            {[
              { icon: '⚡', text: 'Custom Demo Built For YOUR Business — Not generic templates' },
              { icon: '🤖', text: 'AI That Works 24/7 — Capture leads while you sleep' },
              { icon: '🎥', text: '3 Ready-to-Post Videos — Start marketing immediately' },
              { icon: '⏱️', text: '48-Hour Delivery — See it working this week, not next quarter' },
              { icon: '💯', text: '100% Free — No card, no catch, no commitment' },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 hover:bg-white/20 transition-all"
              >
                <span className="text-2xl">{benefit.icon}</span>
                <span className="text-left text-white font-medium text-sm md:text-base max-w-xs">
                  {benefit.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col items-center gap-4"
          >
            <button
              onClick={scrollToForm}
              className="group relative px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-[#4CAF50] to-[#45a049] rounded-2xl shadow-2xl hover:shadow-[0_0_40px_rgba(76,175,80,0.6)] transition-all duration-300 hover:-translate-y-1 active:translate-y-0 flex items-center gap-3"
            >
              Get My Free AI Demo Now
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Trust Signal */}
            <div className="flex items-center gap-2 text-[#D8C4B6]">
              <CheckCircle2 className="w-5 h-5 text-[#4CAF50]" />
              <span className="text-sm">
                🔒 Trusted by 50+ businesses across healthcare, real estate, and finance
              </span>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
              <div className="w-1 h-3 rounded-full bg-white/50" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
