import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline-dark' | 'outline-light';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: 'button' | 'submit';
  icon?: 'arrow-right' | 'arrow-up-right' | 'none';
  className?: string;
  disabled?: boolean;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  icon = 'arrow-right',
  className = '',
  disabled = false,
  target,
  rel,
  ariaLabel,
}) => {
  const baseClasses =
    'group inline-flex items-center justify-center gap-3 rounded-full font-medium transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs tracking-wider uppercase',
    md: 'px-6 py-3.5 text-xs tracking-wider uppercase',
    lg: 'px-8 py-4 text-xs sm:text-sm tracking-wider uppercase',
  }[size];

  const variantClasses = {
    primary:
      'bg-[#0A0A0A] text-[#F5F5F2] border border-[#0A0A0A] hover:bg-[#1F1F1F] focus-visible:ring-[#0A0A0A]',

    secondary:
      'bg-[#F5F5F2] text-[#0A0A0A] border border-[#F5F5F2] hover:bg-white focus-visible:ring-[#0A0A0A]',

    'outline-dark':
      'bg-transparent text-[#0A0A0A] border border-[#0A0A0A]/25 hover:border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#F5F5F2] focus-visible:ring-[#0A0A0A]',

    'outline-light':
      'bg-transparent text-[#F5F5F2] border border-white/25 hover:border-white hover:bg-[#F5F5F2] hover:text-[#0A0A0A] focus-visible:ring-[#F5F5F2]',
  }[variant];

  const combined = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`;

  const renderIcon = () => {
    if (icon === 'none') {
      return null;
    }

    if (icon === 'arrow-up-right') {
      return (
        <span
          className="inline-flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        >
          <ArrowUpRight className="w-4 h-4" />
        </span>
      );
    }

    return (
      <span
        className="inline-flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      >
        <ArrowRight className="w-4 h-4" />
      </span>
    );
  };

  const content = (
    <>
      <span>{children}</span>
      {renderIcon()}
    </>
  );

  // Internal React Router navigation.
  if (to) {
    return (
      <Link
        to={to}
        className={combined}
        onClick={disabled ? undefined : onClick}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onKeyDown={
          disabled
            ? (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                }
              }
            : undefined
        }
      >
        {content}
      </Link>
    );
  }

  // Regular/external URL.
  if (href) {
    const isExternal =
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('//');

    const resolvedTarget = target ?? (isExternal ? '_blank' : undefined);

    const resolvedRel =
      rel ?? (resolvedTarget === '_blank' ? 'noopener noreferrer' : undefined);

    return (
      <a
        href={disabled ? undefined : href}
        target={resolvedTarget}
        rel={resolvedRel}
        className={combined}
        onClick={disabled ? undefined : onClick}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onKeyDown={
          disabled
            ? (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                }
              }
            : undefined
        }
      >
        {content}
      </a>
    );
  }

  // Native button.
  return (
    <button
      type={type}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement> | undefined}
      disabled={disabled}
      className={combined}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
};
