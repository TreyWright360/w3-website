import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { VoiceDemo } from './components/sections/VoiceDemo';
import { InstantDemo } from './components/sections/InstantDemo';
import { ServicesGrid } from './components/sections/ServicesGrid';
import { PricingComparison } from './components/sections/PricingComparison';
import { LiveStatsDashboard } from './components/sections/LiveStatsDashboard';
import { SocialProof } from './components/sections/SocialProof';
import { FAQ } from './components/sections/FAQ';
import { Contact } from './components/sections/Contact';
import { StickyCTA } from './components/layout/StickyCTA';
import { SpeedToLead } from './components/sections/SpeedToLead';
import { RoiCalculator } from './components/sections/RoiCalculator';
import { SocialBotDemo } from './components/sections/SocialBotDemo';
import { AvatarDemo } from './components/sections/AvatarDemo';
import { EcosystemExplainer } from './components/sections/EcosystemExplainer';
import { IndustryDemos } from './components/sections/IndustryDemos';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[--bg-primary] text-[--text-primary] font-sans selection:bg-[--primary] selection:text-white">
      <Header onOpenDemo={() => setIsDemoOpen(true)} />
      
      <main>
        <Hero onOpenDemo={() => setIsDemoOpen(true)} />
        <SpeedToLead />
        <InstantDemo />
        <VoiceDemo />
        <EcosystemExplainer />
        <IndustryDemos />
        <RoiCalculator />
        <AvatarDemo />
        <SocialBotDemo />
        <ServicesGrid />
        <PricingComparison />
        <LiveStatsDashboard />
        <SocialProof />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <StickyCTA onOpenDemo={() => setIsDemoOpen(true)} />

      {/* Voice Demo Modal */}
      <AnimatePresence>
        {isDemoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[--z-modal] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl"
            >
              <VoiceDemo isModal onClose={() => setIsDemoOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
