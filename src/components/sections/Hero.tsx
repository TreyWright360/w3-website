import { Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenDemo: () => void;
}

export const Hero = ({ onOpenDemo }: HeroProps) => {
  return (
    <Section id="hero" className="min-h-screen flex items-center pt-32 pb-20 bg-[--gradient-hero]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,transparent_70%)] pointer-events-none" />

      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[--bg-glass] border border-[--glass-border] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[--success] animate-pulse" />
          <span className="text-sm font-medium text-[--text-secondary]">AI-Powered Automation</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl"
        >
          We Don't Build <span className="gradient-text">Demo Code</span>. We Build Systems That Scale.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl text-[--text-secondary] mb-12 max-w-2xl leading-relaxed"
        >
          Vibe Coding + Claude Skills + Agentic Workflows = Ship-Ready Applications in Days, Not Months.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button
            href="#contact"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto shadow-[--shadow-glow] hover:shadow-[--shadow-glow-lg]"
          >
            Book Discovery Call
          </Button>
          <Button
            onClick={onOpenDemo}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
            icon={<Play size={18} />}
          >
            Talk to Mia
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[--text-muted]"
        >
          <div className="w-6 h-10 rounded-full border-2 border-[--text-muted] flex justify-center pt-2">
            <div className="w-1 h-3 rounded-full bg-[--text-muted]" />
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};
