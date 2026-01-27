import { Play, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenDemo: () => void;
}

export const Hero = ({ onOpenDemo }: HeroProps) => {
  return (
    <Section id="hero" className="min-h-screen flex items-center pt-24 pb-16 bg-[--gradient-hero]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,transparent_70%)] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[--bg-glass] border border-[--glass-border] mb-6">
              <span className="w-2 h-2 rounded-full bg-[--success] animate-pulse" />
              <span className="text-sm font-medium text-[--text-secondary]">AI-Powered Automation</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              We Don't Build <span className="gradient-text">Demo Code</span>. We Build Systems That Scale.
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-[--text-secondary] mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Vibe Coding + Claude Skills + Agentic Workflows = Ship-Ready Applications in Days, Not Months.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                href="#get-demo"
                variant="primary"
                size="lg"
                className="shadow-[--shadow-glow] hover:shadow-[--shadow-glow-lg]"
                icon={<ArrowRight size={18} />}
              >
                Get Your Free Demo
              </Button>
              <Button
                onClick={onOpenDemo}
                variant="secondary"
                size="lg"
                icon={<Play size={18} />}
              >
                Talk to Mia
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-[--text-muted]">
              <div className="flex items-center gap-2">
                <span className="text-[--success]">✓</span>
                <span>24/7 AI Receptionist</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[--success]">✓</span>
                <span>Custom Demo in 48hrs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[--success]">✓</span>
                <span>No Code Required</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - GIF Animation */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Glow effect behind */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(99,102,241,0.3)_0%,transparent_60%)] blur-3xl" />
            
            {/* Glass card frame */}
            <div className="relative rounded-2xl bg-[--bg-glass] border border-[--glass-border] p-2 backdrop-blur-sm overflow-hidden">
              <img
                src="/hero-animation.gif"
                alt="W3 AI Solutions - AI-powered business automation visualization"
                className="w-full h-auto rounded-xl"
                loading="eager"
              />
              
              {/* Floating badge */}
              <div className="absolute -bottom-3 -right-3 px-4 py-2 rounded-full bg-[--primary] text-white text-sm font-semibold shadow-lg">
                Powered by AI
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator - hide on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[--text-muted] hidden lg:block"
        >
          <div className="w-6 h-10 rounded-full border-2 border-[--text-muted] flex justify-center pt-2">
            <div className="w-1 h-3 rounded-full bg-[--text-muted]" />
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};
