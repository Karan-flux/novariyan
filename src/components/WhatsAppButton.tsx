import React from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

import { createWhatsAppUrl } from '../lib/whatsapp';

interface WhatsAppCTAProps {
  label?: string;
  customMessage?: string;
  variant?: 'dark' | 'light' | 'outline-dark' | 'outline-light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const WhatsAppCTA: React.FC<WhatsAppCTAProps> = ({
  label = 'CHAT ON WHATSAPP',
  customMessage,
  variant = 'light',
  size = 'md',
  className = '',
}) => {
  const location = useLocation();

  const url = createWhatsAppUrl(
    customMessage,
    location.pathname,
  );

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3.5 text-xs',
    lg: 'px-8 py-4 text-xs sm:text-sm',
  }[size];

  const variantClasses = {
    dark:
      'bg-[#0A0A0A] text-[#F5F5F2] border border-[#0A0A0A] hover:bg-[#1F1F1F]',

    light:
      'bg-[#F5F5F2] text-[#0A0A0A] border border-[#F5F5F2] hover:bg-white',

    'outline-dark':
      'bg-transparent text-[#0A0A0A] border border-[#0A0A0A]/25 hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F5F5F2]',

    'outline-light':
      'bg-transparent text-[#F5F5F2] border border-white/25 hover:border-white hover:bg-[#F5F5F2] hover:text-[#0A0A0A]',
  }[variant];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-wider uppercase transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 ${sizeClasses} ${variantClasses} ${className}`}
    >
      <MessageCircle
        className="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
        aria-hidden="true"
      />

      <span>{label}</span>
    </a>
  );
};

export const FloatingWhatsAppButton: React.FC = () => {
  const location = useLocation();

  const url = createWhatsAppUrl(
    undefined,
    location.pathname,
  );

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Novariyan"
        className="group flex items-center gap-2.5 rounded-full bg-[#0A0A0A] text-[#F5F5F2] border border-white/15 px-4 py-2.5 shadow-lg hover:bg-[#1C1C1C] transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F5F2]"
      >
        <MessageCircle
          className="w-4 h-4 text-[#F5F5F2] transition-transform duration-200 group-hover:scale-110"
          aria-hidden="true"
        />

        <span className="hidden sm:inline font-mono-tech text-[11px] tracking-wider uppercase">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
};
