import { LandingPageHero } from '../components/sections/LandingPageHero';
import { ProblemAgitation } from '../components/sections/ProblemAgitation';
import { SolutionBenefits } from '../components/sections/SolutionBenefits';
import { SocialProof } from '../components/sections/SocialProof';
import { FAQ } from '../components/sections/FAQ';
import { ResearchForm } from '../components/forms/ResearchForm';
import { motion } from 'framer-motion';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5EFE7]">
      {/* Hero Section */}
      <LandingPageHero />

      {/* Problem/Agitation Section */}
      <ProblemAgitation />

      {/* Solution/Benefits Section */}
      <SolutionBenefits />

      {/* Social Proof Section */}
      <SocialProof />

      {/* How It Works Timeline */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#213555] mb-4">
              From Sign-Up to Demo in 48 Hours — Here's How
            </h2>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                step: 1,
                title: 'You Fill Out Our Simple Form (5 Minutes)',
                description: 'Tell us about your business, your industry, your customers, and what you need. No technical knowledge required — just answer a few questions.',
                icon: '📝',
                time: '5 min',
              },
              {
                step: 2,
                title: 'We Build Your Custom Demo (24 Hours)',
                description: 'Our team researches your industry, analyzes your competitors, and builds a complete AI solution demo tailored specifically to your business.',
                icon: '⚙️',
                time: '24 hours',
              },
              {
                step: 3,
                title: 'You Receive Your Demo Package (48 Hours)',
                description: 'Get your custom website, AI agents, and promotional videos. Test it, show your team, try the features — it\'s all yours to explore.',
                icon: '🎁',
                time: '48 hours',
              },
              {
                step: 4,
                title: 'Schedule a Walkthrough (Optional)',
                description: 'Want to see how it works behind the scenes? We\'ll walk you through the demo, answer questions, and discuss implementation — only if you\'re interested.',
                icon: '🤝',
                time: 'Optional',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 items-start"
              >
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#45a049] flex items-center justify-center text-3xl shadow-lg">
                    {item.icon}
                  </div>
                  {index < 3 && (
                    <div className="w-1 h-20 bg-gradient-to-b from-[#4CAF50] to-[#45a049]/30 my-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-[#4CAF50] bg-[#4CAF50]/10 px-3 py-1 rounded-full">
                      {item.time}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#213555] mb-3">
                    Step {item.step}: {item.title}
                  </h3>
                  <p className="text-lg text-[#666666] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiation Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#F5EFE7] to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#213555] mb-4">
              Most AI Demos Are Useless. Ours Aren't.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Other Vendors */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 border-2 border-[#FF6B6B]/20"
            >
              <h3 className="text-2xl font-bold text-[#FF6B6B] mb-6">Other AI Vendors</h3>
              <div className="space-y-4">
                {[
                  'Show you someone else\'s chatbot',
                  '"Trust us, it\'ll work for you"',
                  'Cookie-cutter templates',
                  'Weeks of sales calls before seeing anything',
                  'Hidden setup fees',
                  'You need a developer',
                  'Pick one: voice OR chat',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF6B6B]/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-[#FF6B6B] text-lg">✗</span>
                    </div>
                    <p className="text-[#666666]">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* W3 AI Solutions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-[#4CAF50]/5 to-[#4CAF50]/10 rounded-2xl p-8 border-2 border-[#4CAF50]"
            >
              <h3 className="text-2xl font-bold text-[#4CAF50] mb-6">W3 AI Solutions</h3>
              <div className="space-y-4">
                {[
                  'Custom demo with YOUR brand in 48 hours',
                  'See it working before you buy',
                  'Built from scratch for your industry',
                  'Working demo this week',
                  '100% free demo, transparent pricing',
                  'We build it. You test it.',
                  'Complete package: website + voice + chat + videos',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#4CAF50] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-lg">✓</span>
                    </div>
                    <p className="text-[#213555] font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Final CTA + Form Section */}
      <section id="get-demo" className="py-20 px-4 bg-gradient-to-br from-[#213555] to-[#3E5879]">
        <div className="max-w-6xl mx-auto">
          {/* Final CTA Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your AI Demo Awaits.
            </h2>
            <p className="text-xl text-[#D8C4B6] mb-4 max-w-3xl mx-auto">
              48 hours from now, you'll have a working AI system with your brand.
              Website. Voice agent. Chatbot. Videos. All custom-built. All free.
            </p>
            <p className="text-2xl font-semibold text-white">
              What are you waiting for?
            </p>

            {/* Value Recap */}
            <div className="flex flex-wrap justify-center gap-4 mt-8 max-w-3xl mx-auto">
              {[
                'Custom demo built specifically for your business',
                'See AI working with YOUR brand and services',
                'Complete package: website + voice + chat + videos',
                'Delivered in 48 hours',
                '100% free with no strings attached',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-left text-white">
                  <span className="text-[#4CAF50] text-xl">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Urgency */}
            <div className="mt-8 inline-block bg-[#FF6B6B]/20 border border-[#FF6B6B] rounded-xl px-6 py-3">
              <p className="text-[#FFB6B6] font-semibold">
                ⚠️ Limited availability: We only accept 20 custom demos per month to ensure quality
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <ResearchForm onSubmitSuccess={(jobId) => {
              console.log('Research started:', jobId);
            }} />
          </motion.div>

          {/* Trust Signal Below Form */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8"
          >
            <p className="text-[#D8C4B6] flex items-center justify-center gap-2">
              <span className="text-2xl">🔒</span>
              Your information is secure and will never be shared
            </p>
          </motion.div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 px-4 bg-[#213555] text-center">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#D8C4B6] mb-4">
            W3 AI Solutions — Transforming customer engagement with intelligent AI
          </p>
          <p className="text-[#999999] text-sm">
            © 2026 W3 AI Solutions. All rights reserved.
          </p>
          <div className="flex justify-center gap-6 mt-4 text-sm text-[#D8C4B6]">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/security" className="hover:text-white transition-colors">Security & Compliance</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
