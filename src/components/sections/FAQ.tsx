import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import siteData from '../../data/index.json';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export const FAQ = () => {
  const { faqs } = siteData;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" className="bg-[--bg-secondary]">
      <Container className="max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Common <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-[--text-secondary] text-xl">
            Everything you need to know about replacing manual work with AI.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id}
              className={cn(
                "rounded-2xl transition-all duration-300 border",
                openIndex === index 
                  ? "bg-[--bg-tertiary] border-[--primary] shadow-lg" 
                  : "bg-[--bg-glass] border-[--border-default] hover:border-[--border-hover]"
              )}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full p-6 text-left"
              >
                <span className={cn(
                  "text-lg font-medium pr-8",
                  openIndex === index ? "text-[--text-primary]" : "text-[--text-secondary]"
                )}>
                  {faq.question}
                </span>
                <span className={cn(
                  "shrink-0 transition-transform duration-300",
                  openIndex === index ? "text-[--primary] rotate-180" : "text-[--text-muted]"
                )}>
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-[--text-secondary] leading-relaxed border-t border-[--border-default] pt-4 mt-2">
                       {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
