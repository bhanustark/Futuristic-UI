import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
  animated?: boolean;
  bordered?: boolean;
  glass?: boolean;
  cornerAccents?: boolean;
  scanlines?: boolean;
  className?: string;
  title?: string;
  subtitle?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  padding = 'md',
  glow = false,
  animated = false,
  bordered = true,
  glass = false,
  cornerAccents = true,
  scanlines = false,
  className = '',
  title,
  subtitle,
}) => {
  const variantClasses = {
    primary: {
      border: 'border-cyan-400/50',
      glow: 'shadow-[0_0_30px_rgba(34,211,238,0.2)]',
      accent: 'text-cyan-400',
      bg: glass ? 'bg-cyan-900/5 backdrop-blur-sm' : 'bg-gradient-to-br from-cyan-900/10 via-black/80 to-blue-900/10',
      headerBg: 'from-cyan-900/20 to-blue-900/20',
      accentBg: 'bg-cyan-400',
    },
    secondary: {
      border: 'border-purple-400/50',
      glow: 'shadow-[0_0_30px_rgba(168,85,247,0.2)]',
      accent: 'text-purple-400',
      bg: glass ? 'bg-purple-900/5 backdrop-blur-sm' : 'bg-gradient-to-br from-purple-900/10 via-black/80 to-pink-900/10',
      headerBg: 'from-purple-900/20 to-pink-900/20',
      accentBg: 'bg-purple-400',
    },
    danger: {
      border: 'border-red-400/50',
      glow: 'shadow-[0_0_30px_rgba(239,68,68,0.2)]',
      accent: 'text-red-400',
      bg: glass ? 'bg-red-900/5 backdrop-blur-sm' : 'bg-gradient-to-br from-red-900/10 via-black/80 to-orange-900/10',
      headerBg: 'from-red-900/20 to-orange-900/20',
      accentBg: 'bg-red-400',
    },
    neutral: {
      border: 'border-gray-400/50',
      glow: 'shadow-[0_0_30px_rgba(156,163,175,0.2)]',
      accent: 'text-gray-400',
      bg: glass ? 'bg-gray-900/5 backdrop-blur-sm' : 'bg-gradient-to-br from-gray-900/20 via-black/80 to-gray-800/20',
      headerBg: 'from-gray-900/20 to-gray-800/20',
      accentBg: 'bg-gray-400',
    }
  };

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'w-full'
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12'
  };

  const currentVariant = variantClasses[variant];
  
  const containerClasses = `
    relative
    ${sizeClasses[size]}
    ${bordered ? `border-2 ${currentVariant.border}` : ''}
    ${currentVariant.bg}
    ${glow ? currentVariant.glow : ''}
    ${animated ? 'transition-all duration-500 hover:scale-[1.02]' : ''}
    overflow-hidden
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <div className={containerClasses}>
      {/* Corner accents */}
      {cornerAccents && (
        <>
          <div className="absolute top-0 left-0 w-4 h-4">
            <div className={`absolute top-0 left-0 w-full h-0.5 ${currentVariant.accentBg} opacity-80`} />
            <div className={`absolute top-0 left-0 h-full w-0.5 ${currentVariant.accentBg} opacity-80`} />
          </div>
          <div className="absolute top-0 right-0 w-4 h-4">
            <div className={`absolute top-0 right-0 w-full h-0.5 ${currentVariant.accentBg} opacity-80`} />
            <div className={`absolute top-0 right-0 h-full w-0.5 ${currentVariant.accentBg} opacity-80`} />
          </div>
          <div className="absolute bottom-0 left-0 w-4 h-4">
            <div className={`absolute bottom-0 left-0 w-full h-0.5 ${currentVariant.accentBg} opacity-80`} />
            <div className={`absolute bottom-0 left-0 h-full w-0.5 ${currentVariant.accentBg} opacity-80`} />
          </div>
          <div className="absolute bottom-0 right-0 w-4 h-4">
            <div className={`absolute bottom-0 right-0 w-full h-0.5 ${currentVariant.accentBg} opacity-80`} />
            <div className={`absolute bottom-0 right-0 h-full w-0.5 ${currentVariant.accentBg} opacity-80`} />
          </div>
        </>
      )}

      {/* Scanlines effect */}
      {scanlines && (
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              ${currentVariant.accent.replace('text-', '')} 2px,
              ${currentVariant.accent.replace('text-', '')} 3px
            )`
          }}
        />
      )}

      {/* Animated scanning line */}
      {animated && (
        <div 
          className={`
            absolute top-0 left-0 w-full h-0.5 
            ${currentVariant.accentBg}
            opacity-60 animate-pulse
          `}
        />
      )}

      {/* Header section */}
      {(title || subtitle) && (
        <div className={`
          ${paddingClasses[padding]} pb-4
          ${bordered ? `border-b ${currentVariant.border}` : ''}
          bg-gradient-to-r ${currentVariant.headerBg}
          relative
        `}>
          {title && (
            <h3 className={`
              text-lg font-mono font-bold 
              ${currentVariant.accent}
              tracking-wider uppercase
              flex items-center gap-2
            `}>
              <span className={`w-2 h-2 ${currentVariant.accentBg} rounded-full animate-pulse`} />
              {title}
            </h3>
          )}
          {subtitle && (
            <p className={`
              text-sm font-mono 
              ${currentVariant.accent} opacity-70
              mt-1 tracking-wide
            `}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Content section */}
      <div className={`${paddingClasses[padding]} ${title || subtitle ? 'pt-4' : ''} relative z-10`}>
        {children}
      </div>

      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-3 left-6 w-1 h-1 bg-current rounded-full animate-pulse" />
        <div className="absolute top-6 right-8 w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-4 left-8 w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-3 right-6 w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Data stream lines */}
      {animated && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div 
            className={`absolute top-4 left-0 h-0.5 ${currentVariant.accentBg} animate-pulse`}
            style={{ 
              width: '30%',
              animationDelay: '2s',
              animationDuration: '3s'
            }}
          />
          <div 
            className={`absolute bottom-6 right-0 h-0.5 ${currentVariant.accentBg} animate-pulse`}
            style={{ 
              width: '40%',
              animationDelay: '2.5s',
              animationDuration: '3s'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Container;