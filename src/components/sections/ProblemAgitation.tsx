import { motion } from 'framer-motion';
import { X, DollarSign, Clock, Users, MessageSquare, TrendingDown } from 'lucide-react';

export function ProblemAgitation() {
  const problems = [
    {
      icon: Clock,
      title: '7 PM inquiry → 9 AM response',
      subtitle: 'Deal lost to faster competitor',
      color: '#FF6B6B',
    },
    {
      icon: Users,
      title: 'Your team wastes 4 hours daily',
      subtitle: 'on "What are your hours?"',
      color: '#FF6B6B',
    },
    {
      icon: TrendingDown,
      title: 'Customer A gets amazing service',
      subtitle: 'Customer B gets voicemail. It\'s a coin flip.',
      color: '#FF6B6B',
    },
    {
      icon: MessageSquare,
      title: 'Instagram DMs pile up',
      subtitle: 'Facebook messages ignored. Website chat empty.',
      color: '#FF6B6B',
    },
    {
      icon: DollarSign,
      title: 'Hiring means $50K+ per agent',
      subtitle: 'Plus training. Plus turnover.',
      color: '#FF6B6B',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#F5EFE7] to-white">
      <div className="max-w-6xl mx-auto">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#213555] mb-4">
            Bleeding Revenue After Hours?
          </h2>
          <p className="text-2xl text-[#3E5879] font-medium">
            You're Not Alone.
          </p>
        </motion.div>

        {/* Opening Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-center text-[#213555] font-semibold mb-12 max-w-3xl mx-auto"
        >
          Every day, your competitors answer leads while you're closed.
        </motion.p>

        {/* Problem Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-white rounded-2xl p-6 shadow-lg border-l-4 hover:shadow-xl transition-all"
                style={{ borderColor: problem.color }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                    <X className="w-6 h-6" style={{ color: problem.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#213555] mb-1">
                      {problem.title}
                    </h3>
                    <p className="text-[#666666]">{problem.subtitle}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Consequence Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF6B6B]/5 rounded-2xl p-8 mb-8"
        >
          <p className="text-2xl font-bold text-[#213555] mb-2">
            The cost?
          </p>
          <p className="text-xl text-[#666666]">
            Lost deals. Frustrated customers. Burned-out teams.
          </p>
        </motion.div>

        {/* Hope Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-2xl font-semibold text-[#3E5879] max-w-3xl mx-auto">
            What if you could deliver instant, perfect service 24/7 without hiring anyone?
          </p>
        </motion.div>
      </div>
    </section>
  );
}
