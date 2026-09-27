import React from 'react';
import { Link } from 'react-router-dom';
import {
ArrowRight,
Box,
Code2,
Layout,
Search,
ShieldCheck,
ShoppingBag,
} from 'lucide-react';

import { ServiceItem } from '../data/services';

interface ServiceCardProps {
service: ServiceItem;
theme?: 'dark' | 'light';
}

const iconMap = {
code: Code2,
layout: Layout,
'shopping-bag': ShoppingBag,
box: Box,
search: Search,
shield: ShieldCheck,
} as const;

type ServiceIconName = keyof typeof iconMap;

export const ServiceCard: React.FC<ServiceCardProps> = ({
service,
theme = 'dark',
}) => {
const iconName = service.iconName as ServiceIconName;
const IconComponent = iconMap[iconName] ?? Code2;
const isDark = theme === 'dark';

return (
<Link
to={`/services/${service.slug}`}
aria-label={`Explore ${service.title} service`}
className={`group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        isDark
          ? 'bg-[#111111] border-white/10 hover:border-white/30 hover:bg-[#161616] text-[#F5F5F2] focus-visible:ring-white focus-visible:ring-offset-[#0A0A0A]'
          : 'bg-white border-[#0A0A0A]/12 hover:border-[#0A0A0A]/40 text-[#0A0A0A] focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-[#F5F5F2]'
      }`}
> <div> <div className="flex items-center justify-between mb-8">
<div
className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-colors duration-200 ${
              isDark
                ? 'border-white/15 bg-white/[0.03] group-hover:bg-white group-hover:text-[#0A0A0A]'
                : 'border-[#0A0A0A]/15 bg-[#F5F5F2] group-hover:bg-[#0A0A0A] group-hover:text-[#F5F5F2]'
            }`}
aria-hidden="true"
> <IconComponent className="w-5 h-5" /> </div>

      <span
        className={`font-mono-tech text-xs tracking-widest ${
          isDark
            ? 'text-neutral-500'
            : 'text-neutral-400'
        }`}
        aria-hidden="true"
      >
        {service.number}
      </span>
    </div>

    <h3 className="text-xl font-semibold tracking-tight mb-3">
      {service.title}
    </h3>

    <p
      className={`text-sm leading-relaxed ${
        isDark
          ? 'text-neutral-400'
          : 'text-neutral-600'
      }`}
    >
      {service.shortDescription}
    </p>
  </div>

  <div className="mt-8 pt-5 border-t border-current/10 flex items-center justify-between">
    <span
      className={`font-mono-tech text-xs tracking-wider uppercase ${
        isDark
          ? 'text-neutral-400 group-hover:text-white'
          : 'text-neutral-500 group-hover:text-[#0A0A0A]'
      } transition-colors`}
    >
      Explore Service
    </span>

    <span
      className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 ${
        isDark
          ? 'border-white/20 group-hover:bg-white group-hover:text-[#0A0A0A] group-hover:translate-x-0.5'
          : 'border-[#0A0A0A]/20 group-hover:bg-[#0A0A0A] group-hover:text-[#F5F5F2] group-hover:translate-x-0.5'
      }`}
      aria-hidden="true"
    >
      <ArrowRight className="w-4 h-4" />
    </span>
  </div>
</Link>

);
};
