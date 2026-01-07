import React from 'react';
import { cn } from '../../lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

type ButtonComponentProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
} & Omit<HTMLMotionProps<"button"> & HTMLMotionProps<"a">, "ref">;

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonComponentProps>(
  ({ className, variant = 'primary', size = 'md', icon, children, href, ...props }, ref) => {
    
    const variants = {
      primary: 'bg-gradient-to-r from-[--primary] to-[--secondary] text-[--text-primary] shadow-[--shadow-glow] hover:shadow-[--shadow-glow-lg]',
      secondary: 'bg-[--bg-tertiary] text-[--text-primary] border border-[--border-default] hover:bg-[--bg-secondary]',
      outline: 'bg-transparent border-2 border-[--primary] text-[--text-primary] hover:bg-[rgba(99,102,241,0.1)]',
      ghost: 'bg-transparent text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--bg-glass]',
    };

    const sizes = {
      sm: 'px-[--space-3] py-[--space-2] text-[--text-sm]',
      md: 'px-[--space-6] py-[--space-3] text-[--text-base]',
      lg: 'px-[--space-8] py-[--space-4] text-[--text-lg]',
    };

    const classes = cn(
      'inline-flex items-center justify-center gap-[--space-2] rounded-[--radius-lg] font-[--font-semibold] transition-all cursor-pointer',
      variants[variant],
      sizes[size],
      className
    );

    if (href) {
      return (
        <motion.a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={classes}
          {...props}
        >
          {icon && <span className="w-5 h-5 flex items-center">{icon}</span>}
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref as React.Ref<HTMLButtonElement>}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={classes}
        {...props}
      >
        {icon && <span className="w-5 h-5 flex items-center">{icon}</span>}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
