// W3 AI Solutions - TypeScript Interfaces

// ========== SERVICES ==========

export interface Service {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  priceDisplay: string;
  priceValue: number;
  features: string[];
  ctaText: string;
  ctaLink: string;
  highlighted: boolean;
}

// ========== PRICING ==========

export interface PricingTier {
  id: string;
  name: string;
  monthlyPrice: number;
  setupFee: number;
  description: string;
  features: PricingFeature[];
  savings: string;
  recommended: boolean;
  ctaText: string;
}

export interface PricingFeature {
  name: string;
  included: boolean;
  tooltip?: string;
}

export interface ComparisonFeature {
  name: string;
  competitor: string;
  us: string;
}

export interface PricingComparison {
  competitor: string;
  competitorMonthly: number;
  ourMonthly: number;
  savingsPercent: number;
  annualSavings: number;
  features: ComparisonFeature[];
}

// ========== TESTIMONIALS ==========

export interface Testimonial {
  id: string;
  clientName: string;
  clientTitle: string;
  clientCompany: string;
  clientImage: string;
  quote: string;
  videoUrl?: string;
  metrics?: Metric[];
}

export interface Metric {
  label: string;
  value: number;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
  animated?: boolean;
}

// ========== LIVE STATS ==========

export interface LiveStats {
  callsToday: number;
  appointmentsBooked: number;
  avgResponseTime: string;
  satisfactionScore: number;
  totalCallsHandled: number;
  totalRevenueGenerated: number;
  lastUpdated: string;
}

// ========== FAQ ==========

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

// ========== CONTACT ==========

export interface ContactOption {
  id: string;
  type: 'voice' | 'whatsapp' | 'email' | 'calendar';
  label: string;
  description: string;
  icon: string;
  action: string;
  primary: boolean;
}

// ========== VOICE DEMO ==========

export interface VoiceDemoConfig {
  agentName: string;
  agentAvatar: string;
  phoneNumber: string;
  widgetType: 'vapi' | 'retell';
  greeting: string;
  suggestedQuestions: string[];
}

export type VoiceDemoState = 'idle' | 'connecting' | 'active' | 'listening';

export interface VoiceDemoCallbacks {
  onCallStart?: () => void;
  onCallEnd?: () => void;
  onTranscript?: (text: string, speaker: 'user' | 'agent') => void;
  onError?: (error: Error) => void;
}

// ========== COMPANY INFO ==========

export interface CompanyInfo {
  name: string;
  tagline: string;
  location: string;
  coverage: string;
  email: string;
  phone: string;
  founded: number;
  certifications: string[];
}

// ========== FOOTER ==========

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: 'linkedin' | 'youtube' | 'twitter' | 'instagram';
  href: string;
}

export interface FooterData {
  logo: string;
  tagline: string;
  services: FooterLink[];
  resources: FooterLink[];
  contactInfo: {
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
  };
  socialLinks: SocialLink[];
  legalLinks: FooterLink[];
  copyright: string;
}

// ========== COMPONENT PROPS ==========

export interface HeroProps {
  badge?: string;
  headline: string;
  highlightedText: string;
  subheadline: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    onClick: () => void;
  };
}

export interface VoiceDemoProps extends VoiceDemoConfig, VoiceDemoCallbacks {}

export interface ServicesGridProps {
  services: Service[];
  onServiceClick: (serviceId: string) => void;
}

export interface PricingComparisonProps {
  comparison: PricingComparison;
  onCtaClick: () => void;
}

export interface LiveStatsProps {
  stats: Metric[];
  lastUpdated: Date;
  animateOnView?: boolean;
}

export interface SocialProofProps {
  featuredTestimonial: Testimonial;
  testimonials: Testimonial[];
  clientLogos: { src: string; alt: string }[];
  totalClients: number;
}

export interface FAQProps {
  faqs: FAQ[];
  allowMultiple?: boolean;
}

export interface ContactSectionProps {
  title: string;
  options: ContactOption[];
  onOptionClick: (optionId: string) => void;
}

export interface StickyCTAProps {
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
  showAfterScrollY?: number;
}

export interface FooterProps extends FooterData {}

// ========== CLIENT LOGOS ==========

export interface ClientLogo {
  src: string;
  alt: string;
}

// ========== STAT CARD PROPS ==========

export interface StatCardProps {
  value: number | string;
  label: string;
  icon: string;
  suffix?: string;
  animate?: boolean;
}

// ========== SITE DATA ==========

export interface SiteData {
  services: Service[];
  pricingTiers: PricingTier[];
  comparison: PricingComparison;
  testimonials: Testimonial[];
  liveStats: LiveStats;
  faqs: FAQ[];
  contactOptions: ContactOption[];
  voiceDemo: VoiceDemoConfig;
  companyInfo: CompanyInfo;
  footer: FooterData;
  clientLogos: ClientLogo[];
}
