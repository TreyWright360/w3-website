import { ArrowRight, Brain, Phone, Video, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import siteData from '../../data/index.json';
import { cn } from '../../lib/utils';

export const ServicesGrid = () => {
  const { services } = siteData;

  const icons = {
    brain: <Brain size={32} />,
    phone: <Phone size={32} />,
    video: <Video size={32} />,
    search: <Search size={32} />,
    globe: <div className="text-3xl">🌐</div>
  };

  return (
    <Section id="services" className="bg-[--bg-primary]">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Replace <span className="gradient-text">Manual Work</span> with AI
          </h2>
          <p className="text-[--text-secondary] text-xl max-w-2xl mx-auto">
            Our autonomous agents work 24/7, never sleep, and cost 10x less than hiring human staff.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className={cn(
                "card relative group",
                service.highlighted && "border-[--primary] shadow-[--shadow-glow]"
              )}
            >
              {service.highlighted && (
                <div className="absolute top-0 right-0 -mt-3 -mr-3">
                  <span className="bg-[--primary] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="w-16 h-16 rounded-2xl bg-[rgba(99,102,241,0.1)] flex items-center justify-center text-[--primary] mb-8 group-hover:scale-110 transition-transform duration-300">
                {icons[service.icon as keyof typeof icons]}
              </div>

              <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
              <p className="text-[--text-secondary] mb-6 min-h-[50px]">
                {service.description}
              </p>

              <div className="mb-8 p-4 rounded-xl bg-[--bg-secondary] border border-[--border-default]">
                <div className="text-[--text-sm] text-[--text-muted] mb-1">Starting at</div>
                <div className="text-xl font-bold text-[--text-primary]">
                  {service.priceDisplay.split('+')[0]}
                  <span className="text-[--text-sm] font-normal text-[--text-secondary] block md:inline md:ml-1">
                    {service.priceDisplay.split('+')[1] ? `+ ${service.priceDisplay.split('+')[1]}` : ''}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {service.features.slice(0, 5).map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-[--text-secondary]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[--success] mt-2 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={service.highlighted ? 'primary' : 'secondary'} 
                className="w-full"
                href={service.ctaLink}
              >
                {service.ctaText} <ArrowRight size={16} />
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
