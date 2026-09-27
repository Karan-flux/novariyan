import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ResilientImageProps
extends React.ImgHTMLAttributes<HTMLImageElement> {
fallbackLabel?: string;
containerClassName?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
src,
alt,
fallbackLabel,
className = '',
containerClassName = '',
onError,
...props
}) => {
const [failed, setFailed] = useState(false);

useEffect(() => {
setFailed(false);
}, [src]);

const handleError = (
event: React.SyntheticEvent<HTMLImageElement, Event>,
) => {
setFailed(true);
onError?.(event);
};

if (failed || !src) {
return (
<div
className={`relative flex flex-col items-center justify-center overflow-hidden bg-[#141414] p-8 text-[#F5F5F2] ${containerClassName}`}
role="img"
aria-label={
fallbackLabel ||
alt ||
'NOVARIYAN visual asset placeholder'
}
> <div
       className="absolute inset-0 bg-architectural-grid-dark opacity-40"
       aria-hidden="true"
     />

    <div className="relative z-10 flex max-w-xs flex-col items-center text-center">
      <div
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20"
        aria-hidden="true"
      >
        <ArrowUpRight className="h-4 w-4 text-white/70" />
      </div>

      <span className="font-display text-xl uppercase tracking-wide text-white/90">
        {fallbackLabel ||
          alt ||
          'NOVARIYAN STUDIO'}
      </span>

      <span className="mt-1 font-mono-tech text-[11px] text-white/50">
        Visual Asset Placeholder
      </span>
    </div>
  </div>
);


}

return (
<img
src={src}
alt={alt || 'Novariyan visual asset'}
onError={handleError}
className={className}
{...props}
/>
);
};
