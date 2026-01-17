import { useState } from 'react';
import { Hero } from '../components/sections/Hero';
// import { VoiceDemo } from '../components/sections/VoiceDemo';
import { ServicesGrid } from '../components/sections/ServicesGrid';
import { PricingComparison } from '../components/sections/PricingComparison';
import { LiveStatsDashboard } from '../components/sections/LiveStatsDashboard';
import { SocialProof } from '../components/sections/SocialProof';
import { FAQ } from '../components/sections/FAQ';
import { Contact } from '../components/sections/Contact';
import { RoiCalculator } from '../components/sections/RoiCalculator';
import { SocialBotDemo } from '../components/sections/SocialBotDemo';
import { AvatarDemo } from '../components/sections/AvatarDemo';
import { EcosystemExplainer } from '../components/sections/EcosystemExplainer';
import { IndustryDemos } from '../components/sections/IndustryDemos';
import { StickyCTA } from '../components/layout/StickyCTA';
import { MeetMia } from '../components/sections/MeetMia';
import { ResearchForm } from '../components/forms/ResearchForm';
import { AnimatePresence, motion } from 'framer-motion';

export function Home() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <>
      <Hero onOpenDemo={() => setIsDemoOpen(true)} />
      <MeetMia />
      {/* <VoiceDemo /> */}
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

      {/* Get Your Free Demo Package */}
      <section id="get-demo" className="py-20 px-4 bg-gradient-to-b from-[--bg-primary] to-[--bg-secondary]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get Your Free Custom Demo Package
            </h2>
            <p className="text-xl text-[--text-secondary] max-w-3xl mx-auto">
              Tell us about your business and we'll create a complete AI solution demo tailored specifically for you - including a custom website, voice agent, chatbot, and promotional videos.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Custom Demo Website</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>AI Voice Receptionist</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Web Chatbot</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>3 Promotional Videos</span>
              </div>
            </div>
          </div>

          <ResearchForm onSubmitSuccess={(jobId) => {
            console.log('Research started:', jobId);
          }} />
        </div>
      </section>

      <Contact />

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
              {/* <VoiceDemo isModal onClose={() => setIsDemoOpen(false)} /> */}
              <div className="bg-[--bg-secondary] p-8 rounded-2xl text-center">
                <h3 className="text-xl font-bold mb-4">Demo Unavailable</h3>
                <p className="mb-6">The Voice Demo is currently disabled pending API configuration.</p>
                <button onClick={() => setIsDemoOpen(false)} className="bg-[--primary] text-white px-4 py-2 rounded-lg">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
