import React, { useState, useEffect } from 'react';

interface DataStreamSkeletonProps {
  width?: string | number;
  height?: string | number;
  theme?: 'primary' | 'secondary' | 'danger' | 'neutral';
  speed?: 'slow' | 'normal' | 'fast';
  density?: 'low' | 'medium' | 'high';
  className?: string;
}

interface CircuitSkeletonProps {
  width?: string | number;
  height?: string | number;
  theme?: 'primary' | 'secondary' | 'danger' | 'neutral';
  nodes?: number;
  animated?: boolean;
  className?: string;
}

interface HologramSkeletonProps {
  width?: string | number;
  height?: string | number;
  theme?: 'primary' | 'secondary' | 'danger' | 'neutral';
  lines?: number;
  flicker?: boolean;
  className?: string;
}

interface GlitchSkeletonProps {
  width?: string | number;
  height?: string | number;
  theme?: 'primary' | 'secondary' | 'danger' | 'neutral';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export const DataStreamSkeleton: React.FC<DataStreamSkeletonProps> = ({
  width = '100%',
  height = '60px',
  theme = 'primary',
  speed = 'normal',
  density = 'medium',
  className = '',
}) => {
  const themeClasses = {
    primary: {
      base: 'bg-cyan-900/20',
      stream: 'text-cyan-400',
      glow: 'shadow-[0_0_15px_rgba(34,211,238,0.3)]',
    },
    secondary: {
      base: 'bg-purple-900/20',
      stream: 'text-purple-400',
      glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    },
    danger: {
      base: 'bg-red-900/20',
      stream: 'text-red-400',
      glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]',
    },
    neutral: {
      base: 'bg-slate-800/30',
      stream: 'text-slate-400',
      glow: 'shadow-[0_0_15px_rgba(148,163,184,0.3)]',
    },
  };

  const speedClasses = {
    slow: 'animate-[dataFlow_4s_infinite]',
    normal: 'animate-[dataFlow_2s_infinite]',
    fast: 'animate-[dataFlow_1s_infinite]',
  };

  const densitySettings = {
    low: { streams: 3, chars: 8 },
    medium: { streams: 5, chars: 12 },
    high: { streams: 8, chars: 16 },
  };

  const styles = themeClasses[theme];
  const setting = densitySettings[density];

  const generateDataChars = () => {
    const chars = '0123456789ABCDEF';
    return Array.from({ length: setting.chars }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  return (
    <div
      className={`relative overflow-hidden border border-gray-700/50 ${styles.base} ${styles.glow} ${className}`}
      style={{ width, height }}
    >
      {/* Data streams */}
      {Array.from({ length: setting.streams }).map((_, i) => (
        <div
          key={i}
          className={`absolute font-mono text-xs ${styles.stream} ${speedClasses[speed]} opacity-60`}
          style={{
            top: `${(i * 100) / setting.streams}%`,
            left: '-100%',
            animationDelay: `${i * 0.3}s`,
          }}
        >
          {generateDataChars()}
        </div>
      ))}

      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(${styles.stream.replace('text-', 'rgba(')}40 1px, transparent 1px),
              linear-gradient(90deg, ${styles.stream.replace('text-', 'rgba(')}40 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-1 right-2">
        <div className={`w-2 h-2 ${styles.stream.replace('text-', 'bg-')} rounded-full animate-pulse`} />
      </div>
    </div>
  );
};

export const CircuitSkeleton: React.FC<CircuitSkeletonProps> = ({
  width = '100%',
  height = '80px',
  theme = 'primary',
  nodes = 8,
  animated = true,
  className = '',
}) => {
  const themeClasses = {
    primary: {
      base: 'bg-cyan-900/20',
      circuit: 'stroke-cyan-400',
      node: 'fill-cyan-400',
      glow: 'shadow-[0_0_15px_rgba(34,211,238,0.3)]',
    },
    secondary: {
      base: 'bg-purple-900/20',
      circuit: 'stroke-purple-400',
      node: 'fill-purple-400',
      glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    },
    danger: {
      base: 'bg-red-900/20',
      circuit: 'stroke-red-400',
      node: 'fill-red-400',
      glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]',
    },
    neutral: {
      base: 'bg-slate-800/30',
      circuit: 'stroke-slate-400',
      node: 'fill-slate-400',
      glow: 'shadow-[0_0_15px_rgba(148,163,184,0.3)]',
    },
  };

  const styles = themeClasses[theme];

  const generateCircuitPath = () => {
    const points = [];
    for (let i = 0; i < nodes; i++) {
      points.push({
        x: (i / (nodes - 1)) * 200,
        y: 20 + Math.sin(i * 0.8) * 10,
      });
    }
    return points;
  };

  const circuitPoints = generateCircuitPath();

  return (
    <div
      className={`relative overflow-hidden border border-gray-700/50 ${styles.base} ${styles.glow} ${className}`}
      style={{ width, height }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 40"
        preserveAspectRatio="none"
      >
        {/* Circuit paths */}
        <path
          d={`M ${circuitPoints.map(p => `${p.x},${p.y}`).join(' L ')}`}
          className={`${styles.circuit} fill-none stroke-1 ${animated ? 'animate-pulse' : ''}`}
          opacity="0.6"
        />
        
        {/* Vertical connection lines */}
        {circuitPoints.map((point, i) => (
          <line
            key={`v-${i}`}
            x1={point.x}
            y1={point.y - 5}
            x2={point.x}
            y2={point.y + 5}
            className={`${styles.circuit} stroke-1`}
            opacity="0.4"
          />
        ))}

        {/* Circuit nodes */}
        {circuitPoints.map((point, i) => (
          <circle
            key={`node-${i}`}
            cx={point.x}
            cy={point.y}
            r="2"
            className={`${styles.node} ${animated ? 'animate-pulse' : ''}`}
            style={{
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}

        {/* Data flow indicator */}
        {animated && (
          <circle
            cx="0"
            cy="20"
            r="1.5"
            className={styles.node}
          >
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              path={`M ${circuitPoints.map(p => `${p.x},${p.y}`).join(' L ')}`}
            />
          </circle>
        )}
      </svg>

      {/* Corner indicators */}
      <div className="absolute top-1 left-1 w-1 h-1 bg-current rounded-full animate-pulse" />
      <div className="absolute top-1 right-1 w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-1 left-1 w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1 right-1 w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
    </div>
  );
};

export const HologramSkeleton: React.FC<HologramSkeletonProps> = ({
  width = '100%',
  height = '100px',
  theme = 'primary',
  lines = 5,
  flicker = true,
  className = '',
}) => {
  const [flickerState, setFlickerState] = useState(true);

  useEffect(() => {
    if (flicker) {
      const interval = setInterval(() => {
        setFlickerState(prev => !prev);
      }, Math.random() * 2000 + 500);
      return () => clearInterval(interval);
    }
  }, [flicker]);

  const themeClasses = {
    primary: {
      base: 'bg-cyan-900/10',
      lines: 'border-cyan-400',
      glow: 'shadow-[0_0_20px_rgba(34,211,238,0.4)]',
    },
    secondary: {
      base: 'bg-purple-900/10',
      lines: 'border-purple-400',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.4)]',
    },
    danger: {
      base: 'bg-red-900/10',
      lines: 'border-red-400',
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.4)]',
    },
    neutral: {
      base: 'bg-slate-800/20',
      lines: 'border-slate-400',
      glow: 'shadow-[0_0_20px_rgba(148,163,184,0.4)]',
    },
  };

  const styles = themeClasses[theme];

  return (
    <div
      className={`relative overflow-hidden ${styles.base} ${styles.glow} ${className} 
        ${flicker && !flickerState ? 'opacity-70' : 'opacity-100'}
        transition-opacity duration-100`}
      style={{ width, height }}
    >
      {/* Hologram scan lines */}
      {Array.from({ length: lines }).map((_, i) => {
        const lineHeight = 100 / lines;
        const delay = i * 0.2;
        
        return (
          <div
            key={i}
            className={`absolute w-full border-t ${styles.lines} opacity-30 animate-pulse`}
            style={{
              top: `${i * lineHeight}%`,
              height: '1px',
              animationDelay: `${delay}s`,
              animationDuration: '2s',
            }}
          />
        );
      })}

      {/* Holographic interference pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full animate-pulse"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              ${styles.lines.replace('border-', 'rgba(')}20 2px,
              ${styles.lines.replace('border-', 'rgba(')}20 4px
            )`
          }}
        />
      </div>

      {/* Projection corners */}
      <div className={`absolute top-0 left-0 w-3 h-3 ${styles.lines} border-t border-l opacity-60`} />
      <div className={`absolute top-0 right-0 w-3 h-3 ${styles.lines} border-t border-r opacity-60`} />
      <div className={`absolute bottom-0 left-0 w-3 h-3 ${styles.lines} border-b border-l opacity-60`} />
      <div className={`absolute bottom-0 right-0 w-3 h-3 ${styles.lines} border-b border-r opacity-60`} />

      {/* Hologram status indicator */}
      <div className="absolute top-1 right-1">
        <div className={`w-2 h-2 ${styles.lines.replace('border-', 'bg-')} rounded-full ${flicker ? 'animate-ping' : 'animate-pulse'}`} />
      </div>
    </div>
  );
};

export const GlitchSkeleton: React.FC<GlitchSkeletonProps> = ({
  width = '100%',
  height = '60px',
  theme = 'primary',
  intensity = 'medium',
  className = '',
}) => {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const intensitySettings = {
      low: { frequency: 3000, duration: 150 },
      medium: { frequency: 2000, duration: 200 },
      high: { frequency: 1000, duration: 300 },
    };

    const setting = intensitySettings[intensity];
    
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), setting.duration);
    }, setting.frequency);

    return () => clearInterval(glitchInterval);
  }, [intensity]);

  const themeClasses = {
    primary: {
      base: 'bg-cyan-900/20',
      glitch1: 'text-cyan-400',
      glitch2: 'text-red-400',
      glow: 'shadow-[0_0_15px_rgba(34,211,238,0.3)]',
    },
    secondary: {
      base: 'bg-purple-900/20',
      glitch1: 'text-purple-400',
      glitch2: 'text-yellow-400',
      glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    },
    danger: {
      base: 'bg-red-900/20',
      glitch1: 'text-red-400',
      glitch2: 'text-cyan-400',
      glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]',
    },
    neutral: {
      base: 'bg-slate-800/30',
      glitch1: 'text-slate-400',
      glitch2: 'text-white',
      glow: 'shadow-[0_0_15px_rgba(148,163,184,0.3)]',
    },
  };

  const styles = themeClasses[theme];

  const glitchText = '████ ████ ████ ████ ████';

  return (
    <div
      className={`relative overflow-hidden border border-gray-700/50 ${styles.base} ${styles.glow} ${className}`}
      style={{ width, height }}
    >
      {/* Base content */}
      <div className="absolute inset-2 flex items-center">
        <div className="w-full space-y-2">
          <div className={`h-3 ${styles.base} rounded animate-pulse`} />
          <div className={`h-3 ${styles.base} rounded animate-pulse w-3/4`} style={{ animationDelay: '0.5s' }} />
          <div className={`h-3 ${styles.base} rounded animate-pulse w-1/2`} style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Glitch overlays */}
      {glitchActive && (
        <>
          <div 
            className={`absolute inset-0 ${styles.glitch1} font-mono text-xs flex items-center px-2 opacity-60`}
            style={{
              transform: 'translateX(2px)',
              filter: 'blur(0.5px)',
            }}
          >
            {glitchText}
          </div>
          <div 
            className={`absolute inset-0 ${styles.glitch2} font-mono text-xs flex items-center px-2 opacity-40`}
            style={{
              transform: 'translateX(-2px)',
              filter: 'blur(0.5px)',
            }}
          >
            {glitchText}
          </div>
        </>
      )}

      {/* Static noise overlay */}
      {glitchActive && (
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
      )}

      {/* Error indicator */}
      <div className="absolute top-1 right-1">
        <div className={`w-2 h-2 ${styles.glitch2.replace('text-', 'bg-')} rounded-full ${glitchActive ? 'animate-ping' : 'animate-pulse'}`} />
      </div>
    </div>
  );
};

// Additional CSS for custom animations
const specializedSkeletonStyles = `
@keyframes dataFlow {
  0% { transform: translateX(-100%); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateX(200%); opacity: 0; }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = specializedSkeletonStyles;
  if (!document.head.querySelector('style[data-specialized-skeleton-styles]')) {
    style.setAttribute('data-specialized-skeleton-styles', 'true');
    document.head.appendChild(style);
  }
}