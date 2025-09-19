import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'avatar' | 'card' | 'button' | 'image' | 'rectangle' | 'circle';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  width?: string | number;
  height?: string | number;
  theme?: 'primary' | 'secondary' | 'danger' | 'neutral';
  animation?: 'pulse' | 'wave' | 'dataStream' | 'circuit' | 'static';
  glow?: boolean;
  corners?: boolean;
  lines?: number; // For text variant - number of lines
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  size = 'md',
  width,
  height,
  theme = 'primary',
  animation = 'pulse',
  glow = false,
  corners = false,
  lines = 1,
  className = '',
}) => {
  const themeClasses = {
    primary: {
      base: 'bg-cyan-900/30',
      glow: 'shadow-[0_0_20px_rgba(34,211,238,0.3)]',
      accent: 'bg-cyan-400',
      stream: 'from-cyan-900/20 via-cyan-400/40 to-cyan-900/20',
    },
    secondary: {
      base: 'bg-purple-900/30',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
      accent: 'bg-purple-400',
      stream: 'from-purple-900/20 via-purple-400/40 to-purple-900/20',
    },
    danger: {
      base: 'bg-red-900/30',
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]',
      accent: 'bg-red-400',
      stream: 'from-red-900/20 via-red-400/40 to-red-900/20',
    },
    neutral: {
      base: 'bg-slate-800/40',
      glow: 'shadow-[0_0_20px_rgba(148,163,184,0.3)]',
      accent: 'bg-slate-400',
      stream: 'from-slate-800/20 via-slate-400/40 to-slate-800/20',
    },
  };

  const sizeClasses = {
    sm: {
      text: { height: '12px', lines: '8px' },
      avatar: { size: '32px' },
      button: { height: '32px', width: '80px' },
      card: { height: '120px' },
      image: { height: '100px' },
    },
    md: {
      text: { height: '16px', lines: '12px' },
      avatar: { size: '48px' },
      button: { height: '40px', width: '120px' },
      card: { height: '200px' },
      image: { height: '160px' },
    },
    lg: {
      text: { height: '20px', lines: '16px' },
      avatar: { size: '64px' },
      button: { height: '48px', width: '160px' },
      card: { height: '280px' },
      image: { height: '220px' },
    },
    xl: {
      text: { height: '24px', lines: '20px' },
      avatar: { size: '80px' },
      button: { height: '56px', width: '200px' },
      card: { height: '360px' },
      image: { height: '280px' },
    },
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:animate-[wave_2s_infinite]',
    dataStream: 'relative overflow-hidden',
    circuit: 'relative',
    static: '',
  };

  const styles = themeClasses[theme];
  const sizes = sizeClasses[size];

  const getSkeletonStyle = () => {
    const style: React.CSSProperties = {};
    if (width) style.width = typeof width === 'number' ? `${width}px` : width;
    if (height) style.height = typeof height === 'number' ? `${height}px` : height;
    return style;
  };

  const renderCornerAccents = () => {
    if (!corners) return null;
    return (
      <>
        <div className={`absolute -top-0.5 -left-0.5 w-2 h-2 ${styles.accent} opacity-60`} 
             style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
        <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 ${styles.accent} opacity-60`} 
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
        <div className={`absolute -bottom-0.5 -left-0.5 w-2 h-2 ${styles.accent} opacity-60`} 
             style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }} />
        <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 ${styles.accent} opacity-60`} 
             style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
      </>
    );
  };

  const renderDataStreamAnimation = () => {
    if (animation !== 'dataStream') return null;
    return (
      <div className={`absolute inset-0 bg-gradient-to-r ${styles.stream} animate-[dataStream_2s_infinite]`} />
    );
  };

  const renderCircuitAnimation = () => {
    if (animation !== 'circuit') return null;
    return (
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-8 grid-rows-4 h-full w-full gap-1">
          {Array.from({ length: 32 }).map((_, i) => (
            <div 
              key={i} 
              className={`${styles.accent} rounded-full animate-pulse`}
              style={{ 
                animationDelay: `${i * 0.1}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
        <div className={`absolute inset-0 border ${styles.accent} opacity-30 animate-pulse`} />
      </div>
    );
  };

  const renderTextSkeleton = () => {
    const textLines = [];
    for (let i = 0; i < lines; i++) {
      const isLastLine = i === lines - 1;
      const lineWidth = isLastLine && lines > 1 ? '60%' : '100%';
      
      textLines.push(
        <div
          key={i}
          className={`
            ${styles.base} ${animationClasses[animation]}
            ${glow ? styles.glow : ''}
            relative
          `}
          style={{
            height: sizes.text.height,
            width: lineWidth,
            marginBottom: i < lines - 1 ? sizes.text.lines : '0',
            ...getSkeletonStyle(),
          }}
        >
          {renderCornerAccents()}
          {renderDataStreamAnimation()}
          {renderCircuitAnimation()}
        </div>
      );
    }
    return <div className={className}>{textLines}</div>;
  };

  const renderBasicSkeleton = () => {
    let skeletonClass = '';
    let defaultStyle: React.CSSProperties = {};

    switch (variant) {
      case 'avatar':
      case 'circle':
        skeletonClass = 'rounded-full';
        defaultStyle = {
          width: sizes.avatar.size,
          height: sizes.avatar.size,
        };
        break;
      case 'button':
        skeletonClass = 'rounded-md';
        defaultStyle = {
          height: sizes.button.height,
          width: sizes.button.width,
        };
        break;
      case 'card':
        skeletonClass = 'rounded-lg';
        defaultStyle = {
          height: sizes.card.height,
          width: '100%',
        };
        break;
      case 'image':
        skeletonClass = 'rounded-md';
        defaultStyle = {
          height: sizes.image.height,
          width: '100%',
        };
        break;
      case 'rectangle':
      default:
        skeletonClass = 'rounded-md';
        defaultStyle = {
          height: sizes.text.height,
          width: '100%',
        };
        break;
    }

    return (
      <div
        className={`
          ${styles.base} ${animationClasses[animation]} ${skeletonClass}
          ${glow ? styles.glow : ''}
          relative ${className}
        `}
        style={{ ...defaultStyle, ...getSkeletonStyle() }}
      >
        {renderCornerAccents()}
        {renderDataStreamAnimation()}
        {renderCircuitAnimation()}
      </div>
    );
  };

  if (variant === 'text') {
    return renderTextSkeleton();
  }

  return renderBasicSkeleton();
};

// Custom CSS for animations (add to your global CSS or style tag)
const skeletonStyles = `
@keyframes wave {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes dataStream {
  0% { transform: translateX(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = skeletonStyles;
  if (!document.head.querySelector('style[data-skeleton-styles]')) {
    style.setAttribute('data-skeleton-styles', 'true');
    document.head.appendChild(style);
  }
}

export default Skeleton;