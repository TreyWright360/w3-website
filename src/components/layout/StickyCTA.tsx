import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic } from 'lucide-react';
import { Button } from '../ui/Button';

interface StickyCTAProps {
  onOpenDemo: () => void;
}

export const StickyCTA = ({ onOpenDemo }: StickyCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 80% of viewport height
      const showThreshold = window.innerHeight * 0.8;
      setIsVisible(window.scrollY > showThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Desktop Floating Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="hidden md:block fixed bottom-6 right-6 z-[--z-sticky]"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenDemo}
              className="rounded-full shadow-[--shadow-lg] glow"
              icon={<Mic size={20} />}
            >
              Talk to Mia
            </Button>
          </motion.div>

          {/* Mobile Bottom Bar */}
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed bottom-0 left-0 w-full z-[--z-sticky] bg-[--bg-secondary] border-t border-[--glass-border] p-[--space-4] pb-[calc(var(--space-4)+env(safe-area-inset-bottom))]"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenDemo}
              className="w-full rounded-full shadow-[--shadow-lg]"
              icon={<Mic size={20} />}
            >
              Talk to Mia Now
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
