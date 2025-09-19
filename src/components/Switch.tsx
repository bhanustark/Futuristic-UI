import React, { useState } from 'react';

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  labelPosition?: 'left' | 'right';
  glow?: boolean;
  animated?: boolean;
  powerIndicator?: boolean;
  corners?: boolean;
  className?: string;
  id?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  variant = 'primary',
  size = 'md',
  label,
  labelPosition = 'right',
  glow = false,
  animated = true,
  powerIndicator = false,
  corners = false,
  className = '',
  id,
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
      track: {
        off: 'bg-slate-800 border-slate-600',
        on: 'bg-cyan-900/50 border-cyan-400',
      },
      thumb: {
        off: 'bg-slate-500',
        on: 'bg-cyan-400',
      },
      glow: 'shadow-[0_0_20px_rgba(34,211,238,0.5)]',
      accent: 'bg-cyan-400',
    },
    secondary: {
      track: {
        off: 'bg-slate-800 border-slate-600',
        on: 'bg-purple-900/50 border-purple-400',
      },
      thumb: {
        off: 'bg-slate-500',
        on: 'bg-purple-400',
      },
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.5)]',
      accent: 'bg-purple-400',
    },
    danger: {
      track: {
        off: 'bg-slate-800 border-slate-600',
        on: 'bg-red-900/50 border-red-400',
      },
      thumb: {
        off: 'bg-slate-500',
        on: 'bg-red-400',
      },
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.5)]',
      accent: 'bg-red-400',
    },
    success: {
      track: {
        off: 'bg-slate-800 border-slate-600',
        on: 'bg-green-900/50 border-green-400',
      },
      thumb: {
        off: 'bg-slate-500',
        on: 'bg-green-400',
      },
      glow: 'shadow-[0_0_20px_rgba(34,197,94,0.5)]',
      accent: 'bg-green-400',
    },
    warning: {
      track: {
        off: 'bg-slate-800 border-slate-600',
        on: 'bg-orange-900/50 border-orange-400',
      },
      thumb: {
        off: 'bg-slate-500',
        on: 'bg-orange-400',
      },
      glow: 'shadow-[0_0_20px_rgba(251,146,60,0.5)]',
      accent: 'bg-orange-400',
    },
    neutral: {
      track: {
        off: 'bg-slate-800 border-slate-600',
        on: 'bg-slate-700 border-slate-400',
      },
      thumb: {
        off: 'bg-slate-500',
        on: 'bg-slate-300',
      },
      glow: 'shadow-[0_0_20px_rgba(148,163,184,0.5)]',
      accent: 'bg-slate-400',
    },
  };

  const sizeClasses = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: 'translate-x-4',
      label: 'text-sm',
    },
    md: {
      track: 'w-10 h-5',
      thumb: 'w-4 h-4',
      translate: 'translate-x-5',
      label: 'text-base',
    },
    lg: {
      track: 'w-12 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-6',
      label: 'text-lg',
    },
  };

  const styles = variantClasses[variant];
  const sizes = sizeClasses[size];

  const renderCornerAccents = () => {
    if (!corners || !checked) return null;
    return (
      <>
        <div className={`absolute -top-0.5 -left-0.5 w-1.5 h-1.5 ${styles.accent} opacity-80`} 
             style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
        <div className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 ${styles.accent} opacity-80`} 
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
        <div className={`absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 ${styles.accent} opacity-80`} 
             style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }} />
        <div className={`absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 ${styles.accent} opacity-80`} 
             style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
      </>
    );
  };

  const renderPowerIndicator = () => {
    if (!powerIndicator) return null;
    return (
      <div className="absolute -top-1 -right-1">
        <div 
          className={`
            w-2 h-2 rounded-full transition-all duration-300
            ${checked 
              ? `${styles.accent} animate-pulse` 
              : 'bg-gray-600'
            }
          `} 
        />
      </div>
    );
  };

  const switchElement = (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Hidden input for accessibility */}
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleToggle}
        disabled={disabled}
        className="sr-only"
      />
      
      {/* Switch track */}
      <div
        onClick={handleToggle}
        className={`
          ${sizes.track}
          relative inline-flex items-center rounded-full border-2 
          cursor-pointer transition-all duration-300 ease-in-out
          ${checked ? styles.track.on : styles.track.off}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${glow && checked ? styles.glow : ''}
          ${animated ? 'transform hover:scale-105' : ''}
        `}
      >
        {/* Switch thumb */}
        <div
          className={`
            ${sizes.thumb}
            inline-block rounded-full transition-all duration-300 ease-in-out
            transform ${checked ? sizes.translate : 'translate-x-0.5'}
            ${checked ? styles.thumb.on : styles.thumb.off}
            ${animated ? 'shadow-lg' : ''}
          `}
        >
          {/* Inner glow effect */}
          {checked && animated && (
            <div className={`absolute inset-0 rounded-full ${styles.thumb.on} opacity-50 animate-ping`} />
          )}
        </div>

        {/* Track pattern when on */}
        {checked && animated && (
          <div className="absolute inset-0 rounded-full opacity-20">
            <div 
              className="w-full h-full rounded-full"
              style={{
                background: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 2px,
                  ${styles.thumb.on.replace('bg-', 'rgba(')}30 2px,
                  ${styles.thumb.on.replace('bg-', 'rgba(')}30 4px
                )`
              }}
            />
          </div>
        )}

        {/* Corner accents */}
        {renderCornerAccents()}
        
        {/* Power indicator */}
        {renderPowerIndicator()}
      </div>
    </div>
  );

  // Render with or without label
  if (label) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {labelPosition === 'left' && (
          <label 
            htmlFor={id} 
            className={`
              ${sizes.label} font-mono text-gray-300 cursor-pointer
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {label}
          </label>
        )}
        
        {switchElement}
        
        {labelPosition === 'right' && (
          <label 
            htmlFor={id} 
            className={`
              ${sizes.label} font-mono text-gray-300 cursor-pointer
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {label}
          </label>
        )}
      </div>
    );
  }

  return switchElement;
};

export default Switch;