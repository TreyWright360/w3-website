import { Calendar, Mail, MessageSquare, Phone } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import siteData from '../../data/index.json';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export const Contact = () => {
  const { contactOptions } = siteData;

  const icons = {
    microphone: <Phone size={32} />, // Using Phone as microphone replacement
    whatsapp: <MessageSquare size={32} />,
    envelope: <Mail size={32} />,
    calendar: <Calendar size={32} />
  };

  return (
    <Section id="contact" className="bg-[--bg-primary] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-[--primary] opacity-10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] bg-[--accent] opacity-10 blur-[80px] rounded-full" />
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="gradient-text">Automate?</span>
          </h2>
          <p className="text-[--text-secondary] text-xl">
            Choose how you want to connect with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactOptions.map((option, i) => (
            <motion.a
              key={option.id}
              href={option.action}
              target={option.type !== 'voice' ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={cn(
                "group p-8 rounded-[--radius-2xl] border flex flex-col items-center text-center transition-all duration-300",
                option.primary
                  ? "bg-[--primary] border-[--primary] shadow-[--shadow-glow]"
                  : "bg-[--bg-glass] border-[--glass-border] hover:bg-[--bg-tertiary] hover:border-[--primary]"
              )}
            >
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110",
                option.primary
                  ? "bg-white text-[--primary]"
                  : "bg-[--bg-tertiary] text-[--primary] group-hover:bg-[--primary] group-hover:text-white"
              )}>
                {icons[option.icon as keyof typeof icons]}
              </div>
              
              <h3 className={cn(
                "text-xl font-bold mb-2",
                option.primary ? "text-white" : "text-[--text-primary]"
              )}>
                {option.label}
              </h3>
              
              <p className={cn(
                "text-sm mb-6",
                option.primary ? "text-white/80" : "text-[--text-secondary]"
              )}>
                {option.description}
              </p>

              <div className={cn(
                "mt-auto py-2 px-6 rounded-full font-semibold text-sm transition-colors",
                option.primary
                  ? "bg-white text-[--primary] hover:bg-gray-100"
                  : "bg-[--bg-tertiary] text-[--text-primary] group-hover:bg-[--primary] group-hover:text-white"
              )}>
                Connect Now
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </Section>
  );
};
