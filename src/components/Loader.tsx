import React from "react";

interface LoaderProps {
  variant?: 'spinner' | 'pulse' | 'dots' | 'scanner' | 'orbit' | 'quantum';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'white';
  speed?: 'slow' | 'medium' | 'fast';
  text?: string;
  showText?: boolean;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  speed = 'medium',
  text = 'Loading...',
  showText = false,
  className = '',
}) => {
  const colorClasses = {
    primary: 'border-cyan-400 text-cyan-400',
    secondary: 'border-purple-400 text-purple-400',
    danger: 'border-red-400 text-red-400',
    success: 'border-green-400 text-green-400',
    warning: 'border-yellow-400 text-yellow-400',
    white: 'border-white text-white',
  };

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const speedClasses = {
    slow: 'duration-1000',
    medium: 'duration-700',
    fast: 'duration-300',
  };

  const renderSpinner = () => (
    <div className="flex flex-col items-center gap-3">
      <div 
        className={`
          ${sizeClasses[size]}
          border-4 border-transparent
          ${colorClasses[color]}
          border-t-current
          rounded-full
          animate-spin
          ${speedClasses[speed]}
          drop-shadow-[0_0_10px_currentColor]
        `}
      />
      {showText && (
        <span className={`font-mono text-sm ${colorClasses[color].split(' ')[1]} animate-pulse`}>
          {text}
        </span>
      )}
    </div>
  );

  const renderPulse = () => (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizeClasses[size]} relative`}>
        <div 
          className={`
            absolute inset-0
            ${colorClasses[color]}
            rounded-full
            animate-ping
            opacity-75
          `}
        />
        <div 
          className={`
            relative
            w-full h-full
            ${colorClasses[color]}
            rounded-full
            border-2
            border-current
          `}
        />
      </div>
      {showText && (
        <span className={`font-mono text-sm ${colorClasses[color].split(' ')[1]} animate-pulse`}>
          {text}
        </span>
      )}
    </div>
  );

  const renderDots = () => (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`
              w-2 h-2
              ${colorClasses[color]}
              rounded-full
              animate-pulse
              drop-shadow-[0_0_4px_currentColor]
            `}
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
      {showText && (
        <span className={`font-mono text-sm ${colorClasses[color].split(' ')[1]}`}>
          {text}
        </span>
      )}
    </div>
  );

  const renderScanner = () => (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizeClasses[size]} relative`}>
        <div 
          className={`
            absolute inset-0
            border-2
            ${colorClasses[color]}
            rounded-sm
          `}
        >
          <div 
            className={`
              absolute top-0 left-0
              w-full h-0.5
              ${colorClasses[color]}
              animate-pulse
            `}
            style={{ 
              background: `linear-gradient(90deg, transparent, currentColor, transparent)`
            }}
          />
        </div>
        
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-current" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-current" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-current" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-current" />
      </div>
      {showText && (
        <span className={`font-mono text-sm ${colorClasses[color].split(' ')[1]} uppercase tracking-wider`}>
          {text}
        </span>
      )}
    </div>
  );

  const renderOrbit = () => (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizeClasses[size]} relative`}>
        <div 
          className={`
            absolute inset-0
            border
            ${colorClasses[color]}
            border-current
            rounded-full
            opacity-30
          `}
        />
        <div 
          className={`
            absolute top-0 left-1/2 w-2 h-2
            -translate-x-1/2 -translate-y-1
            ${colorClasses[color]}
            rounded-full
            drop-shadow-[0_0_6px_currentColor]
            animate-spin
          `}
          style={{ 
            animationDuration: '1.5s'
          }}
        />
      </div>
      {showText && (
        <span className={`font-mono text-sm ${colorClasses[color].split(' ')[1]} animate-pulse`}>
          {text}
        </span>
      )}
    </div>
  );

  const renderQuantum = () => (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizeClasses[size]} relative`}>
        {/* Outer ring */}
        <div 
          className={`
            absolute inset-0
            border-2
            ${colorClasses[color]}
            border-current
            rounded-full
            animate-spin
            opacity-60
          `}
          style={{ animationDuration: '3s', animationDirection: 'reverse' }}
        />
        
        {/* Middle ring */}
        <div 
          className={`
            absolute inset-2
            border-2
            ${colorClasses[color]}
            border-current
            rounded-full
            animate-spin
            opacity-80
          `}
          style={{ animationDuration: '2s' }}
        />
        
        {/* Inner core */}
        <div 
          className={`
            absolute inset-1/4
            ${colorClasses[color]}
            rounded-full
            animate-pulse
            drop-shadow-[0_0_8px_currentColor]
          `}
        />
        
        {/* Energy particles */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`
              absolute w-1 h-1
              ${colorClasses[color]}
              rounded-full
              animate-ping
            `}
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 90}deg) translateY(-${size === 'sm' ? '16px' : size === 'md' ? '20px' : size === 'lg' ? '28px' : '36px'})`,
              animationDelay: `${i * 0.25}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>
      {showText && (
        <span className={`font-mono text-sm ${colorClasses[color].split(' ')[1]} animate-pulse tracking-wider`}>
          {text}
        </span>
      )}
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return renderSpinner();
      case 'pulse':
        return renderPulse();
      case 'dots':
        return renderDots();
      case 'scanner':
        return renderScanner();
      case 'orbit':
        return renderOrbit();
      case 'quantum':
        return renderQuantum();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {renderLoader()}
    </div>
  );
};

export default Loader;