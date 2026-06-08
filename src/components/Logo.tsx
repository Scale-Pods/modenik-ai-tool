import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'banner' | 'light' | 'dark';
  showText?: boolean;
}

export default function Logo({ className = '', size = 'md', variant = 'banner' }: LogoProps) {
  // Height class mapping for container layout
  const heightClasses = {
    sm: 'h-8 px-3 py-1.5 rounded-lg',
    md: 'h-11 px-4 py-2 rounded-xl',
    lg: 'h-14 px-5 py-2.5 rounded-2xl',
    xl: 'h-20 px-7 py-3 rounded-3xl',
  };

  const svgHeights = {
    sm: 'h-5',
    md: 'h-7',
    lg: 'h-9',
    xl: 'h-14',
  };

  // Render the official red brand banner version or direct transparent shapes
  if (variant === 'banner') {
    return (
      <div className={`flex items-center bg-[#ED1C24] shadow-md select-none transition-all hover:brightness-105 shrink-0 ${heightClasses[size]} ${className}`}>
        <svg 
          className={`${svgHeights[size]} w-auto aspect-[4/1]`} 
          viewBox="0 0 420 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left slanted white bar */}
          <path d="M15 85 L38 15 L58 15 L35 85 Z" fill="white" />
          
          {/* Right slanted white bar */}
          <path d="M48 85 L71 15 L91 15 L68 85 Z" fill="white" />
          
          {/* Middle V cutout back to red background */}
          <path d="M35 15 L54.5 65 L74 15 L64 15 L54.5 40 L45 15 Z" fill="#ED1C24" />
          
          {/* MODENIK Text */}
          <text 
            x="115" 
            y="54" 
            fill="white" 
            fontWeight="900" 
            fontSize="46" 
            fontFamily="Inter, system-ui, sans-serif" 
            letterSpacing="2"
          >
            MODENIK
          </text>
          
          {/* LIFESTYLE PVT LTD Subtext */}
          <text 
            x="116" 
            y="82" 
            fill="white" 
            fontWeight="700" 
            fontSize="18" 
            fontFamily="Inter, system-ui, sans-serif" 
            letterSpacing="6.5"
            opacity="0.95"
          >
            LIFESTYLE PVT LTD
          </text>
        </svg>
      </div>
    );
  }

  // Flat transparent fallback for other uses
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <svg 
        className={`${svgHeights[size]} w-auto aspect-[1.3/1] shrink-0`} 
        viewBox="0 0 110 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 90 L38 10 L58 10 L30 90 Z" fill="#ED1C24" />
        <path d="M48 90 L76 10 L96 10 L68 90 Z" fill="#ED1C24" />
        <path d="M30 10 L53 65 L76 10 L66 10 L53 40 L40 10 Z" fill="#f8fafc" />
      </svg>
      <div className="flex flex-col text-left leading-none">
        <span className="font-black tracking-wider text-xl text-slate-900">MODENIK</span>
        <span className="font-bold tracking-[0.25em] text-[8.5px] mt-1.5 text-slate-500">LIFESTYLE PVT LTD</span>
      </div>
    </div>
  );
}
