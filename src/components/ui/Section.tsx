import React from 'react';
import { cn } from '../../lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, children, id, ...props }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          'py-[--space-20] relative w-full overflow-hidden',
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';
