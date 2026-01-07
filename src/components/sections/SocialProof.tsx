import { Play, TrendingUp, Clock, Calendar } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import siteData from '../../data/index.json';

export const SocialProof = () => {
  const { testimonials, clientLogos } = siteData;
  // Use the second testimonial (Marcus) as the featured one since it has a video URL
  const featured = testimonials[1];
  const others = [testimonials[0], testimonials[2]];

  const metricIcons = {
    '$': <TrendingUp size={16} />,
    '%': <TrendingUp size={16} />,
    'hrs/week': <Clock size={16} />,
    '/month': <Calendar size={16} />,
    'weeks': <Clock size={16} />
  };

  return (
    <Section id="testimonials" className="bg-[--bg-primary]">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Real Results from <span className="gradient-text">Real Businesses</span>
          </h2>
          <p className="text-[--text-secondary] text-xl max-w-2xl mx-auto">
            See how companies are saving thousands and growing faster with W3 AI Solutions.
          </p>
        </div>

        {/* Featured Case Study */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-black group cursor-pointer shadow-[--shadow-glow-lg]">
            <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-40 transition-opacity duration-300" style={{ backgroundImage: 'url(/images/office-bg.jpg)' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[--primary]/90 backdrop-blur-sm flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Play fill="white" className="text-white" size={32} />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-white font-bold text-lg">{featured.clientCompany} Case Study</div>
              <div className="text-[--text-secondary] text-sm">How they made $47K in 30 days</div>
            </div>
          </div>

          <div className="space-y-8">
            <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed">
              "{featured.quote}"
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden">
                {/* Placeholder for avatar */}
                <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800" />
              </div>
              <div>
                <div className="font-bold text-lg">{featured.clientName}</div>
                <div className="text-[--text-secondary]">{featured.clientTitle}, {featured.clientCompany}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[--border-default]">
              {featured.metrics?.map((metric, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-bold text-[--success] mb-1">
                    {metric.unit === '$' && '$'}{metric.value}{metric.unit === '%' && '%'}
                  </div>
                  <div className="text-sm text-[--text-secondary] leading-tight">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Other Testimonials */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {others.map((t) => (
            <div key={t.id} className="card bg-[--bg-secondary]">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gray-700 shrink-0 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800" />
                </div>
                <div>
                  <div className="font-bold">{t.clientName}</div>
                  <div className="text-sm text-[--text-secondary]">{t.clientCompany}</div>
                </div>
              </div>
              
              <p className="text-lg text-[--text-secondary] mb-6 italic">"{t.quote}"</p>
              
              <div className="flex gap-6 pt-6 border-t border-[--border-default]">
                {t.metrics?.map((metric, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[--success]">
                      {metricIcons[metric.unit as keyof typeof metricIcons] || <TrendingUp size={16} />}
                    </span>
                    <span className="font-bold">
                       {metric.unit === '$' && '$'}{metric.value}{metric.unit !== '$' && metric.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="border-t border-[--border-default] pt-16">
          <p className="text-center text-[--text-muted] text-sm uppercase tracking-widest mb-8">
            Trusted by forward-thinking companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {clientLogos.map((_, i) => (
              <div key={i} className="h-8 md:h-10 w-32 bg-[--text-secondary]/20 rounded content-center text-center text-xs">
                {/* Logo Placeholder */}
                LOGO {i+1}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};
