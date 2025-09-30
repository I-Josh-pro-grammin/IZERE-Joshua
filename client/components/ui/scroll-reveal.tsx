import { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  duration?: number;
}

export function ScrollReveal({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up', 
  duration = 1000 
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const getTransformClasses = () => {
    const baseClasses = 'transition-all ease-out';
    const durationClass = `duration-[${duration}ms]`;
    
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
        case 'down':
          return `${baseClasses} ${durationClass} opacity-0 -translate-y-8`;
        case 'left':
          return `${baseClasses} ${durationClass} opacity-0 translate-x-8`;
        case 'right':
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-8`;
        case 'fade':
          return `${baseClasses} ${durationClass} opacity-0`;
        default:
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
      }
    } else {
      return `${baseClasses} ${durationClass} opacity-100 translate-x-0 translate-y-0`;
    }
  };

  return (
    <div ref={ref} className={`${getTransformClasses()} ${className}`}>
      {children}
    </div>
  );
}
