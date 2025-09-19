import React, { useState, useEffect } from 'react';

interface DataCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  dataStream?: boolean;
  downloadProgress?: number; // 0-100
  className?: string;
}

interface CircuitCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  circuitAnimation?: boolean;
  nodes?: number;
  className?: string;
}

interface HologramCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  projectionEffect?: boolean;
  flicker?: boolean;
  className?: string;
}

export const DataCheckbox: React.FC<DataCheckboxProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  variant = 'primary',
  size = 'md',
  label,
  dataStream = true,
  downloadProgress = 100,
  className = '',
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [streamOffset, setStreamOffset] = useState(0);
  
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  useEffect(() => {
    if (checked && dataStream) {
      const interval = setInterval(() => {
        setStreamOffset(prev => (prev + 5) % 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [checked, dataStream]);

  const handleToggle = () => {
    if (disabled) return;
    
    const newChecked = !checked;
    
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    
    onChange?.(newChecked);
  };

  const variantClasses = {
    primary: {
      border: 'border-cyan-400',
      background: 'bg-cyan-900/20',
      check: 'text-cyan-400',
      data: 'text-cyan-400',
      glow: 'shadow-[0_0_20px_rgba(34,211,238,0.6)]',
    },
    secondary: {
      border: 'border-purple-400',
      background: 'bg-purple-900/20',
      check: 'text-purple-400',
      data: 'text-purple-400',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.6)]',
    },
    danger: {
      border: 'border-red-400',
      background: 'bg-red-900/20',
      check: 'text-red-400',
      data: 'text-red-400',
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.6)]',
    },
  };

  const sizeClasses = {
    sm: { box: 'w-6 h-6', container: 'w-24' },
    md: { box: 'w-8 h-8', container: 'w-32' },
    lg: { box: 'w-10 h-10', container: 'w-40' },
  };

  const styles = variantClasses[variant];
  const sizes = sizeClasses[size];

  const generateHexData = () => {
    return Array.from({ length: 8 }, () => 
      Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0')
    ).join(' ');
  };

  return (
    <div className={`relative inline-flex flex-col items-center gap-2 ${className}`}>
      {label && (
        <div className="text-sm font-mono text-gray-300 mb-1">{label}</div>
      )}
      
      {/* Data progress bar */}
      <div className={`${sizes.container} h-1 bg-gray-800 rounded-full overflow-hidden mb-2`}>
        <div 
          className={`h-full ${styles.check.replace('text-', 'bg-')} transition-all duration-500`}
          style={{ width: `${checked ? downloadProgress : 0}%` }}
        />
      </div>

      {/* Checkbox container */}
      <div
        onClick={handleToggle}
        className={`
          ${sizes.box}
          relative inline-flex items-center justify-center rounded border-2 
          cursor-pointer transition-all duration-300
          ${checked ? `${styles.border} ${styles.background} ${styles.glow}` : 'border-gray-600 bg-gray-800'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {/* Data stream background */}
        {checked && dataStream && (
          <div className="absolute inset-0 overflow-hidden rounded">
            <div 
              className={`absolute inset-0 font-mono text-xs ${styles.data} opacity-20 whitespace-nowrap`}
              style={{
                transform: `translateX(-${streamOffset}%)`,
                fontSize: '0.5rem',
                lineHeight: '1rem',
              }}
            >
              {generateHexData()}
            </div>
          </div>
        )}

        {/* Check icon */}
        {checked && (
          <svg 
            className={`w-2/3 h-2/3 ${styles.check} animate-pulse`}
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            viewBox="0 0 24 24"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}

        {/* Data nodes */}
        {checked && (
          <div className="absolute inset-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 ${styles.check.replace('text-', 'bg-')} rounded-full animate-ping`}
                style={{
                  top: `${20 + (i * 15)}%`,
                  right: `${10 + (i * 20)}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Status display */}
      <div className="text-xs font-mono mt-1">
        <span className={checked ? styles.data : 'text-gray-500'}>
          {checked ? `${downloadProgress}% LOADED` : 'NO DATA'}
        </span>
      </div>
    </div>
  );
};

export const CircuitCheckbox: React.FC<CircuitCheckboxProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  variant = 'primary',
  size = 'md',
  label,
  circuitAnimation = true,
  nodes = 6,
  className = '',
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    
    const newChecked = !checked;
    
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    
    onChange?.(newChecked);
  };

  const variantClasses = {
    primary: {
      border: 'border-cyan-400',
      background: 'bg-cyan-900/20',
      check: 'text-cyan-400',
      circuit: 'stroke-cyan-400',
      glow: 'shadow-[0_0_20px_rgba(34,211,238,0.6)]',
    },
    secondary: {
      border: 'border-purple-400',
      background: 'bg-purple-900/20',
      check: 'text-purple-400',
      circuit: 'stroke-purple-400',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.6)]',
    },
    success: {
      border: 'border-green-400',
      background: 'bg-green-900/20',
      check: 'text-green-400',
      circuit: 'stroke-green-400',
      glow: 'shadow-[0_0_20px_rgba(34,197,94,0.6)]',
    },
  };

  const sizeClasses = {
    sm: { box: 'w-8 h-8', svg: 'w-6 h-6' },
    md: { box: 'w-10 h-10', svg: 'w-8 h-8' },
    lg: { box: 'w-12 h-12', svg: 'w-10 h-10' },
  };

  const styles = variantClasses[variant];
  const sizes = sizeClasses[size];

  return (
    <div className={`relative inline-flex flex-col items-center gap-2 ${className}`}>
      {label && (
        <div className="text-sm font-mono text-gray-300 mb-1">{label}</div>
      )}

      {/* Checkbox container */}
      <div
        onClick={handleToggle}
        className={`
          ${sizes.box}
          relative inline-flex items-center justify-center rounded border-2 
          cursor-pointer transition-all duration-300 overflow-hidden
          ${checked ? `${styles.border} ${styles.background} ${styles.glow}` : 'border-gray-600 bg-gray-800'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {/* Circuit board background */}
        {checked && (
          <svg 
            className={`${sizes.svg} absolute inset-0 m-auto opacity-30`}
            viewBox="0 0 40 40"
          >
            {/* Circuit paths */}
            <path
              d="M5,5 L35,5 L35,35 L5,35 Z M5,20 L35,20 M20,5 L20,35"
              className={`${styles.circuit} fill-none stroke-1`}
              opacity="0.6"
            />
            
            {/* Circuit nodes */}
            {Array.from({ length: nodes }).map((_, i) => {
              const angle = (i / nodes) * 2 * Math.PI;
              const x = 20 + Math.cos(angle) * 10;
              const y = 20 + Math.sin(angle) * 10;
              
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="1.5"
                  className={`${styles.circuit.replace('stroke-', 'fill-')} ${circuitAnimation ? 'animate-pulse' : ''}`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              );
            })}
          </svg>
        )}

        {/* Check icon */}
        {checked && (
          <svg 
            className={`w-1/2 h-1/2 ${styles.check} z-10`}
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            viewBox="0 0 24 24"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}

        {/* Energy flow effect */}
        {checked && circuitAnimation && (
          <div className="absolute inset-0">
            <div className={`w-full h-full border ${styles.border} opacity-20 animate-ping rounded`} />
          </div>
        )}
      </div>

      {/* Circuit status */}
      <div className="text-xs font-mono mt-1">
        <span className={checked ? styles.check : 'text-gray-500'}>
          {checked ? 'CIRCUIT ACTIVE' : 'CIRCUIT INACTIVE'}
        </span>
      </div>
    </div>
  );
};

export const HologramCheckbox: React.FC<HologramCheckboxProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  variant = 'primary',
  size = 'md',
  label,
  projectionEffect = true,
  flicker = true,
  className = '',
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [flickerState, setFlickerState] = useState(true);
  
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  useEffect(() => {
    if (checked && flicker) {
      const interval = setInterval(() => {
        setFlickerState(prev => Math.random() > 0.15 ? true : !prev);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [checked, flicker]);

  const handleToggle = () => {
    if (disabled) return;
    
    const newChecked = !checked;
    
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    
    onChange?.(newChecked);
  };

  const variantClasses = {
    primary: {
      border: 'border-cyan-400',
      background: 'bg-cyan-900/10',
      check: 'text-cyan-400',
      hologram: 'text-cyan-400',
      glow: 'shadow-[0_0_25px_rgba(34,211,238,0.8)]',
    },
    secondary: {
      border: 'border-purple-400',
      background: 'bg-purple-900/10',
      check: 'text-purple-400',
      hologram: 'text-purple-400',
      glow: 'shadow-[0_0_25px_rgba(168,85,247,0.8)]',
    },
    neutral: {
      border: 'border-slate-400',
      background: 'bg-slate-800/20',
      check: 'text-slate-400',
      hologram: 'text-slate-400',
      glow: 'shadow-[0_0_25px_rgba(148,163,184,0.8)]',
    },
  };

  const sizeClasses = {
    sm: { box: 'w-6 h-6' },
    md: { box: 'w-8 h-8' },
    lg: { box: 'w-10 h-10' },
  };

  const styles = variantClasses[variant];
  const sizes = sizeClasses[size];

  return (
    <div className={`relative inline-flex flex-col items-center gap-2 ${className}`}>
      {label && (
        <div className="text-sm font-mono text-gray-300 mb-1">{label}</div>
      )}
      
      {/* Hologram projection beams */}
      {checked && projectionEffect && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-px h-6 ${styles.hologram.replace('text-', 'bg-')} opacity-40
                ${flickerState ? 'animate-pulse' : 'opacity-20'}
              `}
              style={{
                left: `${-10 + (i * 7)}px`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Checkbox container */}
      <div
        onClick={handleToggle}
        className={`
          ${sizes.box}
          relative inline-flex items-center justify-center rounded border-2 
          cursor-pointer transition-all duration-500
          ${checked 
            ? `${styles.border} ${styles.background} ${styles.glow} ${flicker && !flickerState ? 'opacity-60' : ''}` 
            : 'border-gray-600 bg-gray-800'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {/* Holographic interference pattern */}
        {checked && (
          <div className="absolute inset-0 overflow-hidden rounded">
            <div 
              className="w-full h-full opacity-30"
              style={{
                background: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 1px,
                  ${styles.hologram.replace('text-', 'rgba(')}20 1px,
                  ${styles.hologram.replace('text-', 'rgba(')}20 2px
                )`
              }}
            />
          </div>
        )}

        {/* Holographic check icon */}
        {checked && (
          <svg 
            className={`w-2/3 h-2/3 ${styles.check} ${flicker ? 'animate-pulse' : ''}`}
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            viewBox="0 0 24 24"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}

        {/* Projection corners */}
        {checked && (
          <>
            <div className={`absolute top-0 left-0 w-2 h-2 ${styles.hologram.replace('text-', 'border-')} border-t border-l opacity-50`} />
            <div className={`absolute top-0 right-0 w-2 h-2 ${styles.hologram.replace('text-', 'border-')} border-t border-r opacity-50`} />
            <div className={`absolute bottom-0 left-0 w-2 h-2 ${styles.hologram.replace('text-', 'border-')} border-b border-l opacity-50`} />
            <div className={`absolute bottom-0 right-0 w-2 h-2 ${styles.hologram.replace('text-', 'border-')} border-b border-r opacity-50`} />
          </>
        )}
      </div>

      {/* Hologram status */}
      <div className="text-xs font-mono mt-1">
        <span className={checked ? styles.hologram : 'text-gray-500'}>
          {checked ? 'HOLOGRAM ON' : 'HOLOGRAM OFF'}
        </span>
      </div>
    </div>
  );
};