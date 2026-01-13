import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onOpenDemo: () => void;
}

export const Header = ({ onOpenDemo }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('/')) {
      navigate(href);
    } else {
      // If on a different page, go home first then scroll
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const menuItems = [
    { label: 'Services', href: '/#services' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Vibe Coding', href: '/services/production-vibe-coding' },
    { label: 'Claude Skills', href: '/services/claude-skills' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 w-full z-[--z-sticky] transition-all duration-300',
          isScrolled ? 'glass h-20 shadow-sm' : 'bg-transparent h-24'
        )}
      >
        <Container className="h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-[1.5rem] font-bold gradient-text">W3 AI Solutions</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="text-[--text-secondary] hover:text-[--text-primary] text-[--text-sm] font-medium transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button onClick={onOpenDemo} size="sm">Talk to Mia</Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[--text-primary]"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </Container>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[--z-modal] bg-[--bg-primary]"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-8">
                <span className="text-[1.5rem] font-bold gradient-text">W3 AI</span>
                <button
                  className="p-2 text-[--text-primary]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col gap-6 items-center flex-1 justify-center">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleNavClick(item.href)}
                    className="text-[--text-xl] font-medium"
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4"
                >
                  <Button onClick={() => {
                    onOpenDemo();
                    setIsMobileMenuOpen(false);
                  }} size="lg">
                    Talk to Mia
                  </Button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
