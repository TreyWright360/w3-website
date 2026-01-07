import { useEffect, useState, useRef } from 'react';
import { Phone, Calendar, Clock, ThumbsUp, TrendingUp } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import siteData from '../../data/index.json';
import { motion, useInView } from 'framer-motion';

const StatCard = ({ label, value, icon, unit = '', delay = 0 }: any) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView && typeof value === 'number') {
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const icons = {
    'phone': <Phone className="text-[--primary]" size={24} />,
    'calendar': <Calendar className="text-[--accent]" size={24} />,
    'clock': <Clock className="text-[--success]" size={24} />,
    'thumbs-up': <ThumbsUp className="text-[--warning]" size={24} />,
    'trending-up': <TrendingUp className="text-[--secondary]" size={24} />
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
      className="card flex flex-col items-center justify-center text-center p-6 bg-[--bg-tertiary]/50 border-[--border-default]"
    >
      <div className="w-12 h-12 rounded-full bg-[--bg-glass] flex items-center justify-center mb-4">
        {icons[icon as keyof typeof icons]}
      </div>
      <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-1">
        {typeof value === 'number' ? displayValue.toLocaleString() : value}
        <span className="text-sm text-[--text-muted] ml-1">{unit}</span>
      </div>
      <div className="text-sm text-[--text-secondary] font-medium tracking-wide uppercase">
        {label}
      </div>
    </motion.div>
  );
};

export const LiveStatsDashboard = () => {
  const { liveStats } = siteData;

  const stats = [
    { label: "Calls Handled", value: liveStats.totalCallsHandled, icon: "phone", unit: "" },
    { label: "Revenue Generated", value: liveStats.totalRevenueGenerated, icon: "trending-up", unit: "$" },
    { label: "Avg Response Time", value: liveStats.avgResponseTime, icon: "clock", unit: "" },
    { label: "Satisfaction", value: liveStats.satisfactionScore, icon: "thumbs-up", unit: "%" },
  ];

  return (
    <Section id="stats" className="bg-[--bg-primary] py-12 border-y border-[--border-default]">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[--success] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[--success]"></span>
            </span>
            <span className="text-[--text-secondary] font-mono text-sm uppercase tracking-wider">
              System Status: <span className="text-[--success] font-bold">Online</span>
            </span>
          </div>
          <p className="text-[--text-muted] text-sm">
            Live Metrics Updated: {new Date(liveStats.lastUpdated).toLocaleTimeString()}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} delay={i * 0.1} />
          ))}
        </div>
      </Container>
    </Section>
  );
};
