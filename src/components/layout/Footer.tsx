import { Container } from '../ui/Container';
import { Linkedin, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import siteData from '../../data/index.json';

export const Footer = () => {
  const { footer } = siteData;

  const socialIcons = {
    linkedin: <Linkedin size={20} />,
    youtube: <Youtube size={20} />,
    twitter: <Twitter size={20} />,
    instagram: null
  };

  return (
    <footer className="bg-[#050510] pt-20 pb-8 border-t border-[--glass-border]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <span className="text-[1.5rem] font-bold gradient-text">W3 AI Solutions</span>
            <p className="text-[--text-secondary] leading-relaxed max-w-[250px]">
              {footer.tagline}
            </p>
            <div className="flex gap-4">
              {footer.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[--glass-bg] border border-[--glass-border] flex items-center justify-center text-[--text-secondary] hover:bg-[--primary] hover:text-white transition-all"
                >
                  {socialIcons[link.platform as keyof typeof socialIcons]}
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-[--text-sm] font-bold uppercase tracking-wider text-[--text-muted] mb-6">Services</h4>
            <ul className="space-y-4">
              {footer.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[--text-secondary] hover:text-[--primary] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-[--text-sm] font-bold uppercase tracking-wider text-[--text-muted] mb-6">Resources</h4>
            <ul className="space-y-4">
              {footer.resources.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[--text-secondary] hover:text-[--primary] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-[--text-sm] font-bold uppercase tracking-wider text-[--text-muted] mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[--text-secondary]">
                <Mail size={18} className="mt-1 text-[--primary]" />
                <a href={`mailto:${footer.contactInfo.email}`} className="hover:text-[--primary] transition-colors">
                  {footer.contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-[--text-secondary]">
                <Phone size={18} className="mt-1 text-[--primary]" />
                <a href={`tel:${footer.contactInfo.phone}`} className="hover:text-[--primary] transition-colors">
                  {footer.contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-[--text-secondary]">
                <MapPin size={18} className="mt-1 text-[--primary]" />
                <span>{footer.contactInfo.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[--glass-border] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[--text-muted] text-sm text-center md:text-left">
            {footer.copyright}
          </p>
          <div className="flex gap-6">
            {footer.legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[--text-muted] hover:text-[--text-primary] text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};
