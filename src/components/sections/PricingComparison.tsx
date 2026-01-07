import { Check, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import siteData from '../../data/index.json';
import { cn } from '../../lib/utils';

export const PricingComparison = () => {
  const { comparison, pricingTiers } = siteData;

  return (
    <Section id="pricing" className="bg-[--bg-secondary]">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Brain vs <span className="text-[--error]">Bot</span>
          </h2>
          <p className="text-[--text-secondary] text-xl max-w-2xl mx-auto">
            Most AI agents have "Amnesia." Ours build relationships, remember preferences, and close deals.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto mb-20 overflow-hidden rounded-[--radius-2xl] border border-[--border-default] bg-[--bg-tertiary]">
          <div className="grid grid-cols-3 bg-[--bg-secondary] border-b border-[--border-default] p-4 text-[--text-sm] font-semibold tracking-wider uppercase text-[--text-muted]">
            <div className="flex items-center">Feature</div>
            <div className="text-center text-[--error]">Generic Bot</div>
            <div className="text-center text-[--success] font-bold">W3 Smart System</div>
          </div>
          
          {comparison.features.map((feature, i) => (
            <div 
              key={i} 
              className="grid grid-cols-3 p-6 border-b border-[--border-default] last:border-0 hover:bg-[--bg-glass] transition-colors items-center"
            >
              <div className="font-medium">{feature.name}</div>
              <div className="text-center text-[--text-secondary]">{feature.competitor}</div>
              <div className="text-center font-bold text-[--success]">{feature.us}</div>
            </div>
          ))}

          <div className="grid grid-cols-3 p-6 bg-[--primary-dark]/10">
            <div className="font-bold text-lg">Monthly Cost</div>
            <div className="text-center text-[--text-secondary] line-through text-lg">${comparison.competitorMonthly}</div>
            <div className="text-center font-bold text-2xl text-[--primary]">${comparison.ourMonthly}</div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.id}
              className={cn(
                "card relative flex flex-col",
                tier.recommended && "border-[--primary] shadow-[--shadow-glow] scale-105 z-10 bg-[--bg-secondary]"
              )}
            >
              {tier.recommended && (
                <div className="absolute top-0 right-0 -mt-3 -mr-3">
                  <span className="bg-[--primary] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Best Value
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold">${tier.monthlyPrice}</span>
                  <span className="text-[--text-secondary]">/month</span>
                </div>
                <div className="text-[--text-sm] text-[--text-muted] mt-2">
                  + ${tier.setupFee} setup fee
                </div>
              </div>

              <p className="text-[--text-secondary] mb-8 pb-8 border-b border-[--border-default]">
                {tier.description}
              </p>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check size={18} className="text-[--success] mt-1 shrink-0" />
                    ) : (
                      <X size={18} className="text-[--text-muted] mt-1 shrink-0" />
                    )}
                    <span className={cn("text-sm", !feature.included && "text-[--text-muted]")}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="space-y-4">
                <Button 
                  variant={tier.recommended ? 'primary' : 'outline'} 
                  className="w-full"
                  href="#contact"
                >
                  {tier.ctaText}
                </Button>
                {tier.savings && (
                  <div className="text-center text-[--text-sm] text-[--success] font-medium">
                    {tier.savings}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
