import React from 'react';

interface IsometricCubeProps {
  size?: number;
  topColor?: string;
  leftColor?: string;
  rightColor?: string;
  strokeColor?: string;
  className?: string;
}

export const IsometricCube: React.FC<IsometricCubeProps> = ({
  size = 120,
  topColor = '#D5BA9E',
  leftColor = '#B24D60',
  rightColor = '#1F2B45',
  strokeColor = '#A3A9AE',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Top Face */}
      <polygon
        points="60,10 108,36 60,62 12,36"
        fill={topColor}
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Left Face */}
      <polygon
        points="12,36 60,62 60,112 12,86"
        fill={leftColor}
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Right Face */}
      <polygon
        points="60,62 108,36 108,86 60,112"
        fill={rightColor}
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const PerspectiveRoomBackdrop: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      className={`w-full h-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#162035" />
          <stop offset="55%" stopColor="#1F2B45" />
          <stop offset="100%" stopColor="#131B2E" />
        </linearGradient>
        <linearGradient id="wallRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#283757" />
          <stop offset="100%" stopColor="#1A243B" />
        </linearGradient>
      </defs>

      <rect width="1920" height="1080" fill="url(#bgGrad)" />

      {/* Perspective Gallery Room Lines inspired by Portafolio 4.0 */}
      <polygon points="0,0 520,220 520,860 0,1080" fill="#19233A" />
      <polygon points="1920,0 1400,220 1400,860 1920,1080" fill="url(#wallRight)" />
      <polygon points="0,1080 520,860 1400,860 1920,1080" fill="#141C2E" />
      <polygon points="0,0 520,220 1400,220 1920,0" fill="#23314F" />
      <rect
        x="520"
        y="220"
        width="880"
        height="640"
        fill="#1F2B45"
        stroke="#A3A9AE"
        strokeOpacity="0.28"
        strokeWidth="2"
      />

      {/* Perspective Edge Guides */}
      <line x1="0" y1="0" x2="520" y2="220" stroke="#A3A9AE" strokeOpacity="0.25" strokeWidth="1.5" />
      <line x1="1920" y1="0" x2="1400" y2="220" stroke="#A3A9AE" strokeOpacity="0.25" strokeWidth="1.5" />
      <line x1="0" y1="1080" x2="520" y2="860" stroke="#A3A9AE" strokeOpacity="0.25" strokeWidth="1.5" />
      <line x1="1920" y1="1080" x2="1400" y2="860" stroke="#A3A9AE" strokeOpacity="0.25" strokeWidth="1.5" />

      {/* Sculptural Floating Perspective Cubes */}
      {/* Top Left Sand Beam Cube */}
      <g transform="translate(210, 120)">
        <polygon points="0,45 480,0 560,55 80,100" fill="#E0C8AF" />
        <polygon points="0,45 80,100 80,210 0,155" fill="#A99076" />
        <polygon points="80,100 560,55 560,165 80,210" fill="#D5BA9E" />
      </g>

      {/* Mid Left Crimson Cube */}
      <g transform="translate(150, 360)">
        <polygon points="0,35 280,0 350,55 70,90" fill="#C96477" />
        <polygon points="0,35 70,90 70,220 0,165" fill="#8B3748" />
        <polygon points="70,90 350,55 350,185 70,220" fill="#B24D60" />
      </g>

      {/* Center Feature Wireframe & Solid Cube */}
      <g transform="translate(800, 320)">
        <polygon
          points="160,0 320,85 160,170 0,85"
          fill="#D5BA9E"
          fillOpacity="0.92"
          stroke="#1F2B45"
          strokeWidth="2"
        />
        <polygon
          points="0,85 160,170 160,360 0,275"
          fill="#B24D60"
          fillOpacity="0.95"
          stroke="#1F2B45"
          strokeWidth="2"
        />
        <polygon
          points="160,170 320,85 320,275 160,360"
          fill="#263554"
          stroke="#A3A9AE"
          strokeWidth="2"
        />
      </g>

      {/* Right Silver & Navy Cube Stack */}
      <g transform="translate(1410, 440)">
        <polygon points="110,0 240,65 110,130 -20,65" fill="#A3A9AE" />
        <polygon points="-20,65 110,130 110,290 -20,225" fill="#7D848A" />
        <polygon points="110,130 240,65 240,225 110,290" fill="#1F2B45" stroke="#A3A9AE" strokeOpacity="0.45" strokeWidth="1.5" />
      </g>

      {/* Subtle 16:9 Architectural Frame Reticle */}
      <path d="M 80 120 L 80 80 L 120 80" stroke="#D5BA9E" strokeWidth="2.5" fill="none" />
      <path d="M 1840 120 L 1840 80 L 1800 80" stroke="#D5BA9E" strokeWidth="2.5" fill="none" />
      <path d="M 80 960 L 80 1000 L 120 1000" stroke="#D5BA9E" strokeWidth="2.5" fill="none" />
      <path d="M 1840 960 L 1840 1000 L 1800 1000" stroke="#D5BA9E" strokeWidth="2.5" fill="none" />
    </svg>
  );
};
