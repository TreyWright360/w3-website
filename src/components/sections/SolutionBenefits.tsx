import { motion } from 'framer-motion';
import { Globe, Phone, MessageCircle, Video, Target, Zap, ArrowRight } from 'lucide-react';

export function SolutionBenefits() {
  const scrollToForm = () => {
    const formSection = document.getElementById('get-demo');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const benefits = [
    {
      icon: Globe,
      title: 'Custom AI-Powered Website',
      headline: 'See Your Brand Running on AI',
      description: 'Test a real website built for YOUR business—not a generic template with your logo slapped on. Real copy. Real design. Real AI integration.',
      color: '#4CAF50',
    },
    {
      icon: Phone,
      title: 'AI Voice Receptionist',
      headline: 'Never Miss a Lead Again',
      description: 'Answers calls 24/7. Books appointments. Answers FAQs. Sounds human. Knows your business. Works weekends. Never takes vacation.',
      metric: 'Capture 3x more leads without hiring',
      color: '#2196F3',
    },
    {
      icon: MessageCircle,
      title: 'Intelligent Website Chatbot',
      headline: 'Turn Browsers Into Buyers—Instantly',
      description: 'Visitor lands on your site → Gets instant answers → Becomes a lead. All while you\'re asleep, in meetings, or on vacation.',
      metric: '40% more conversions from website traffic',
      color: '#9C27B0',
    },
    {
      icon: Video,
      title: '3 Professional Marketing Videos',
      headline: 'Content Ready to Post Today',
      description: '• 15-sec Hero Hook — Grab attention fast\n• 30-sec Social Proof — Build trust with results\n• 45-sec Explainer — Show how it works\n\nPost to Instagram. Run as ads. Send to prospects. All included.',
      color: '#FF6B6B',
    },
    {
      icon: Target,
      title: 'Industry-Specific AI',
      headline: 'Built For Your World',
      description: 'Healthcare? HIPAA-compliant language.\nReal Estate? Property details, showings, disclosures.\nLegal? Intake questions, case types, confidentiality.\n\nWe speak your industry\'s language—not generic chatbot speak.',
      color: '#FF9800',
    },
    {
      icon: Zap,
      title: 'Zero Technical Headaches',
      headline: 'You Do Nothing. We Build Everything.',
      description: 'Fill out 5-minute form → We build your AI → You test it.\nNo coding. No configuration. No IT team needed.',
      color: '#4CAF50',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-white to-[#F5EFE7]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#213555] mb-6">
            Your AI Twin: Works 24/7, Never Calls in Sick, Costs $0 to Try
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-xl text-[#3E5879] font-semibold">
              We don't pitch AI. We build it and hand it to you.
            </p>
            <p className="text-lg text-[#666666]">
              48 hours from now, you'll have a working AI system with YOUR brand, YOUR services, YOUR voice. Try it. Test it. Show your team.
            </p>
            <p className="text-lg text-[#666666] font-medium">
              Love it? Great. Don't? You got free AI and marketing videos anyway.
            </p>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-[#213555]/10 group"
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ background: `linear-gradient(135deg, ${benefit.color}20, ${benefit.color}10)` }}
                >
                  <Icon className="w-8 h-8" style={{ color: benefit.color }} />
                </div>

                {/* Title */}
                <div className="text-sm font-semibold text-[#3E5879] uppercase tracking-wider mb-2">
                  {benefit.title}
                </div>

                {/* Headline */}
                <h3 className="text-2xl font-bold text-[#213555] mb-4">
                  {benefit.headline}
                </h3>

                {/* Description */}
                <p className="text-[#666666] mb-4 whitespace-pre-line leading-relaxed">
                  {benefit.description}
                </p>

                {/* Metric (if exists) */}
                {benefit.metric && (
                  <div className="mt-4 pt-4 border-t border-[#213555]/10">
                    <p className="text-lg font-bold" style={{ color: benefit.color }}>
                      📊 {benefit.metric}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <button
            onClick={scrollToForm}
            className="group px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-[#4CAF50] to-[#45a049] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 flex items-center gap-3 mx-auto"
          >
            Get My Free AI Demo Now
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
