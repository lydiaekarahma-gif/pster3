import React from 'react';
import { PosterData } from '../types';
import { clsx } from 'clsx';

interface PosterPreviewProps {
  data: PosterData;
  className?: string;
}

const PosterPreview: React.FC<PosterPreviewProps> = ({ data, className }) => {
  // Map font style to Tailwind classes
  const fontClass = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono',
  }[data.fontStyle];

  return (
    <div 
      className={clsx(
        "relative w-full aspect-[3/4] overflow-hidden shadow-2xl transition-all duration-300 flex flex-col p-8 md:p-12",
        className,
        fontClass
      )}
      style={{ 
        backgroundColor: data.backgroundColor,
        color: data.primaryColor 
      }}
    >
      {/* Decorative Geometric Elements based on secondary color */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 -translate-y-1/2 translate-x-1/3 blur-3xl"
        style={{ backgroundColor: data.secondaryColor }}
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-20 translate-y-1/3 -translate-x-1/4 blur-3xl"
        style={{ backgroundColor: data.primaryColor }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full border-4" style={{ borderColor: data.secondaryColor }}>
        
        {/* Header Section */}
        <div className="flex-1 flex flex-col justify-center items-center text-center p-6 border-b-2" style={{ borderColor: data.secondaryColor }}>
           <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight uppercase leading-none drop-shadow-sm mb-4">
            {data.title}
          </h1>
          <p className="text-xl md:text-2xl font-medium tracking-wider opacity-90" style={{ color: data.secondaryColor }}>
            {data.tagline}
          </p>
        </div>

        {/* Body Section */}
        <div className="flex-1 flex flex-col justify-center items-center p-8 text-center bg-white/5 backdrop-blur-sm">
           <p className="text-lg md:text-xl leading-relaxed max-w-prose">
            {data.description}
          </p>
        </div>

        {/* Footer / CTA Area */}
        <div className="p-6 text-center border-t-2" style={{ borderColor: data.secondaryColor }}>
          <span className="text-sm font-bold uppercase tracking-widest opacity-75">
            Powered by PosterDigital
          </span>
        </div>
      </div>
    </div>
  );
};

export default PosterPreview;
