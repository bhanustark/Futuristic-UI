import React, { useState } from 'react';

interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  labelPosition?: 'left' | 'right';
  indeterminate?: boolean;
  glow?: boolean;
  animated?: boolean;
  corners?: boolean;
  scanlines?: boolean;
  checkStyle?: 'check' | 'cross' | 'dot' | 'square';
  className?: string;
  id?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  variant = 'primary',
  size = 'md',
  label,
  labelPosition = 'right',
  indeterminate = false,
  glow = false,
  animated = true,
  corners = false,
  scanlines = false,
  checkStyle = 'check',
  className = '',
  id,
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;
  const isChecked = indeterminate ? false : checked;
  const showIndeterminate = indeterminate && !checked;

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
      border: {
        unchecked: 'border-slate-600',
        checked: 'border-cyan-400',
        indeterminate: 'border-cyan-400',
      },
      background: {
        unchecked: 'bg-slate-800',
        checked: 'bg-cyan-900/50',
        indeterminate: 'bg-cyan-900/30',
      },
      check: 'text-cyan-400',
      glow: 'shadow-[0_0_15px_rgba(34,211,238,0.6)]',
      accent: 'bg-cyan-400',
    },
    secondary: {
      border: {
        unchecked: 'border-slate-600',
        checked: 'border-purple-400',
        indeterminate: 'border-purple-400',
      },
      background: {
        unchecked: 'bg-slate-800',
        checked: 'bg-purple-900/50',
        indeterminate: 'bg-purple-900/30',
      },
      check: 'text-purple-400',
      glow: 'shadow-[0_0_15px_rgba(168,85,247,0.6)]',
      accent: 'bg-purple-400',
    },
    danger: {
      border: {
        unchecked: 'border-slate-600',
        checked: 'border-red-400',
        indeterminate: 'border-red-400',
      },
      background: {
        unchecked: 'bg-slate-800',
        checked: 'bg-red-900/50',
        indeterminate: 'bg-red-900/30',
      },
      check: 'text-red-400',
      glow: 'shadow-[0_0_15px_rgba(239,68,68,0.6)]',
      accent: 'bg-red-400',
    },
    success: {
      border: {
        unchecked: 'border-slate-600',
        checked: 'border-green-400',
        indeterminate: 'border-green-400',
      },
      background: {
        unchecked: 'bg-slate-800',
        checked: 'bg-green-900/50',
        indeterminate: 'bg-green-900/30',
      },
      check: 'text-green-400',
      glow: 'shadow-[0_0_15px_rgba(34,197,94,0.6)]',
      accent: 'bg-green-400',
    },
    warning: {
      border: {
        unchecked: 'border-slate-600',
        checked: 'border-orange-400',
        indeterminate: 'border-orange-400',
      },
      background: {
        unchecked: 'bg-slate-800',
        checked: 'bg-orange-900/50',
        indeterminate: 'bg-orange-900/30',
      },
      check: 'text-orange-400',
      glow: 'shadow-[0_0_15px_rgba(251,146,60,0.6)]',
      accent: 'bg-orange-400',
    },
    neutral: {
      border: {
        unchecked: 'border-slate-600',
        checked: 'border-slate-400',
        indeterminate: 'border-slate-400',
      },
      background: {
        unchecked: 'bg-slate-800',
        checked: 'bg-slate-700',
        indeterminate: 'bg-slate-700/50',
      },
      check: 'text-slate-300',
      glow: 'shadow-[0_0_15px_rgba(148,163,184,0.6)]',
      accent: 'bg-slate-400',
    },
  };

  const sizeClasses = {
    sm: {
      box: 'w-4 h-4',
      icon: 'w-3 h-3',
      label: 'text-sm',
      gap: 'gap-2',
    },
    md: {
      box: 'w-5 h-5',
      icon: 'w-4 h-4',
      label: 'text-base',
      gap: 'gap-3',
    },
    lg: {
      box: 'w-6 h-6',
      icon: 'w-5 h-5',
      label: 'text-lg',
      gap: 'gap-4',
    },
  };

  const styles = variantClasses[variant];
  const sizes = sizeClasses[size];

  const getCheckboxState = () => {
    if (showIndeterminate) return 'indeterminate';
    if (isChecked) return 'checked';
    return 'unchecked';
  };

  const state = getCheckboxState();

  const renderCornerAccents = () => {
    if (!corners || state === 'unchecked') return null;
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

  const renderScanlines = () => {
    if (!scanlines || state === 'unchecked') return null;
    return (
      <div className="absolute inset-0 overflow-hidden rounded">
        <div 
          className="w-full h-full opacity-20"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 1px,
              ${styles.check.replace('text-', 'rgba(')}30 1px,
              ${styles.check.replace('text-', 'rgba(')}30 2px
            )`
          }}
        />
      </div>
    );
  };

  const renderCheckIcon = () => {
    if (showIndeterminate) {
      return (
        <div className={`${sizes.icon} ${styles.check} flex items-center justify-center`}>
          <div className={`w-2/3 h-0.5 ${styles.accent} rounded`} />
        </div>
      );
    }

    if (!isChecked) return null;

    const iconProps = {
      className: `${sizes.icon} ${styles.check} ${animated ? 'animate-pulse' : ''}`,
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2.5',
      viewBox: '0 0 24 24',
    };

    switch (checkStyle) {
      case 'cross':
        return (
          <svg {...iconProps}>
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        );
      case 'dot':
        return (
          <svg {...iconProps}>
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
        );
      case 'square':
        return (
          <svg {...iconProps}>
            <rect x="6" y="6" width="12" height="12" fill="currentColor" />
          </svg>
        );
      case 'check':
      default:
        return (
          <svg {...iconProps}>
            <path d="M20 6L9 17l-5-5" />
          </svg>
        );
    }
  };

  const checkboxElement = (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Hidden input for accessibility */}
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={handleToggle}
        disabled={disabled}
        className="sr-only"
        ref={(input) => {
          if (input) input.indeterminate = showIndeterminate;
        }}
      />
      
      {/* Checkbox box */}
      <div
        onClick={handleToggle}
        className={`
          ${sizes.box}
          relative inline-flex items-center justify-center rounded border-2 
          cursor-pointer transition-all duration-300 ease-in-out
          ${styles.border[state]}
          ${styles.background[state]}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${glow && state !== 'unchecked' ? styles.glow : ''}
          ${animated ? 'transform hover:scale-105' : ''}
        `}
      >
        {/* Check icon with animation */}
        <div className={`transition-all duration-200 ${isChecked || showIndeterminate ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
          {renderCheckIcon()}
        </div>

        {/* Pulse effect when checked */}
        {(isChecked || showIndeterminate) && animated && (
          <div className={`absolute inset-0 rounded border-2 ${styles.border[state]} opacity-50 animate-ping`} />
        )}

        {/* Corner accents */}
        {renderCornerAccents()}
        
        {/* Scanlines effect */}
        {renderScanlines()}
      </div>
    </div>
  );

  // Render with or without label
  if (label) {
    return (
      <div className={`flex items-center ${sizes.gap} ${className}`}>
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
        
        {checkboxElement}
        
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

  return checkboxElement;
};

export default Checkbox;