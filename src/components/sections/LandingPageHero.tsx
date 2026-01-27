import { motion } from 'framer-motion';
import { ArrowRight, Clock, Shield, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function LandingPageHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay was prevented, user interaction required
      });
    }
  }, []);

  const scrollToForm = () => {
    const formSection = document.getElementById('get-demo');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-24 pb-16 px-4 bg-[#F5EFE7]">
      <div className="max-w-7xl mx-auto">
        {/* Video Container - Clean and Centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-auto"
              poster="/video/hero-poster.jpg"
            >
              <source src="/video/hero-animation.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>

        {/* Content Below Video - Clean Single Column */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-[#213555] mb-6 leading-tight"
          >
            Never Lose Another Lead.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CAF50] to-[#45a049]">
              See Your Business Running on AI
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl text-[#3E5879] mb-8 leading-relaxed"
          >
            Custom demo built in 48 hours. Your brand. Your services. Your customers.
          </motion.p>

          {/* Key Benefits - 3 Icons Max */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-12"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#4CAF50]/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#4CAF50]" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-[#213555]">48-Hour Delivery</p>
                <p className="text-sm text-[#666666]">See it working this week</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#4CAF50]/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#4CAF50]" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-[#213555]">100% Free Demo</p>
                <p className="text-sm text-[#666666]">No card, no commitment</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#4CAF50]/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#4CAF50]" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-[#213555]">Complete Package</p>
                <p className="text-sm text-[#666666]">Website + Voice + Chat + Videos</p>
              </div>
            </div>
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={scrollToForm}
                className="group px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-[#4CAF50] to-[#45a049] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 flex items-center gap-3"
              >
                Get My Free AI Demo Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                className="group px-10 py-5 text-xl font-bold text-[#213555] bg-white border-2 border-[#D8C4B6] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 flex items-center gap-3 vapi-call-button"
                data-vapi-assistant="demo-w3-ai-consultant"
              >
                Call AI Agent
                <span className="text-2xl">📞</span>
              </button>
            </div>

            {/* Trust Signal */}
            <p className="text-sm text-[#666666]">
              🔒 Trusted by 50+ businesses across healthcare, real estate, and finance
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
