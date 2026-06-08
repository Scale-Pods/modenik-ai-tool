import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'banner' | 'light' | 'dark';
  showText?: boolean;
  collapsed?: boolean;
}

export default function Logo({ className = '', size = 'md', collapsed = false }: LogoProps) {
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

  // If collapsed, display only the stylized M monogram on a red background badge
  if (collapsed) {
    const monogramSize = {
      sm: 'w-8 h-8 rounded-lg',
      md: 'w-11 h-11 rounded-xl',
      lg: 'w-14 h-14 rounded-2xl',
      xl: 'w-20 h-20 rounded-3xl',
    };
    const monogramSvgHeight = {
      sm: 'h-4',
      md: 'h-6',
      lg: 'h-8',
      xl: 'h-12',
    };

    return (
      <div className={`flex items-center justify-center bg-[#ED1C24] shadow-md select-none transition-all hover:brightness-105 shrink-0 ${monogramSize[size]} ${className}`}>
        <svg 
          className={`${monogramSvgHeight[size]} w-auto aspect-[1.1/1]`} 
          viewBox="0 0 110 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left slanted white bar */}
          <path d="M15 85 L38 15 L58 15 L35 85 Z" fill="white" />
          {/* Right slanted white bar */}
          <path d="M48 85 L71 15 L91 15 L68 85 Z" fill="white" />
          {/* Middle V cutout back to red background */}
          <path d="M35 15 L54.5 65 L74 15 L64 15 L54.5 40 L45 15 Z" fill="#ED1C24" />
        </svg>
      </div>
    );
  }

  // Always render the official red brand banner version for maximum visibility and brand fidelity
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
