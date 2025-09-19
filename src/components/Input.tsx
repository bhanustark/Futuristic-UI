import React, { useState, useRef, useEffect } from "react";

interface InputProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  success?: string;
  helperText?: string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  glow?: boolean;
  animated?: boolean;
  scanlines?: boolean;
  showCharacterCount?: boolean;
  maxLength?: number;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onEnter?: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  variant = 'primary',
  size = 'md',
  label,
  placeholder,
  value,
  defaultValue,
  disabled = false,
  required = false,
  error,
  success,
  helperText,
  icon,
  endIcon,
  glow = false,
  animated = false,
  scanlines = false,
  showCharacterCount = false,
  maxLength,
  className = '',
  onChange,
  onFocus,
  onBlur,
  onEnter,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const currentValue = value !== undefined ? value : internalValue;
  const isControlled = value !== undefined;

  // Determine the current state (error takes precedence over success)
  const currentState = error ? 'error' : success ? 'success' : 'default';

  const variantClasses = {
    primary: {
      border: 'border-cyan-400/50',
      focusBorder: 'focus:border-cyan-400',
      text: 'text-cyan-100',
      label: 'text-cyan-400',
      placeholder: 'placeholder:text-cyan-300/50',
      glow: 'shadow-[0_0_20px_rgba(34,211,238,0.3)]',
      accent: 'bg-cyan-400',
    },
    secondary: {
      border: 'border-purple-400/50',
      focusBorder: 'focus:border-purple-400',
      text: 'text-purple-100',
      label: 'text-purple-400',
      placeholder: 'placeholder:text-purple-300/50',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
      accent: 'bg-purple-400',
    },
    danger: {
      border: 'border-red-400/50',
      focusBorder: 'focus:border-red-400',
      text: 'text-red-100',
      label: 'text-red-400',
      placeholder: 'placeholder:text-red-300/50',
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]',
      accent: 'bg-red-400',
    },
    success: {
      border: 'border-green-400/50',
      focusBorder: 'focus:border-green-400',
      text: 'text-green-100',
      label: 'text-green-400',
      placeholder: 'placeholder:text-green-300/50',
      glow: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]',
      accent: 'bg-green-400',
    },
    warning: {
      border: 'border-yellow-400/50',
      focusBorder: 'focus:border-yellow-400',
      text: 'text-yellow-100',
      label: 'text-yellow-400',
      placeholder: 'placeholder:text-yellow-300/50',
      glow: 'shadow-[0_0_20px_rgba(234,179,8,0.3)]',
      accent: 'bg-yellow-400',
    },
    neutral: {
      border: 'border-gray-400/50',
      focusBorder: 'focus:border-gray-400',
      text: 'text-gray-100',
      label: 'text-gray-400',
      placeholder: 'placeholder:text-gray-300/50',
      glow: 'shadow-[0_0_20px_rgba(156,163,175,0.3)]',
      accent: 'bg-gray-400',
    },
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm h-9',
    md: 'px-4 py-3 text-base h-12',
    lg: 'px-5 py-4 text-lg h-14',
  };

  const stateClasses = {
    error: {
      border: 'border-red-400',
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.4)]',
      text: 'text-red-400',
      accent: 'bg-red-400',
    },
    success: {
      border: 'border-green-400',
      glow: 'shadow-[0_0_20px_rgba(34,197,94,0.4)]',
      text: 'text-green-400',
      accent: 'bg-green-400',
    },
    default: variantClasses[variant],
  };

  const currentClasses = stateClasses[currentState];
  const currentVariant = variantClasses[variant];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter(currentValue);
    }
  };

  useEffect(() => {
    if (animated && inputRef.current) {
      inputRef.current.style.animation = 'none';
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.style.animation = '';
        }
      }, 10);
    }
  }, [animated]);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className={`
          block mb-2 text-sm font-mono font-medium tracking-wide
          ${currentClasses.text || currentVariant.label}
          ${required ? "after:content-['*'] after:ml-1 after:text-red-400" : ''}
        `}>
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Input Field */}
        <input
          ref={inputRef}
          type={type}
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`
            w-full
            ${sizeClasses[size]}
            ${currentClasses.border || currentVariant.border}
            ${currentClasses.text || currentVariant.text}
            ${currentVariant.placeholder}
            ${currentVariant.focusBorder}
            bg-black/50
            border-2
            font-mono
            transition-all
            duration-300
            focus:outline-none
            focus:ring-0
            ${glow && isFocused ? currentClasses.glow || currentVariant.glow : ''}
            ${animated ? 'hover:scale-[1.02]' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${icon ? 'pl-12' : ''}
            ${endIcon ? 'pr-12' : ''}
          `.replace(/\s+/g, ' ').trim()}
        />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 pointer-events-none">
          <div className={`absolute top-0 left-0 w-full h-0.5 ${currentClasses.accent || currentVariant.accent} opacity-60`} />
          <div className={`absolute top-0 left-0 h-full w-0.5 ${currentClasses.accent || currentVariant.accent} opacity-60`} />
        </div>
        <div className="absolute top-0 right-0 w-3 h-3 pointer-events-none">
          <div className={`absolute top-0 right-0 w-full h-0.5 ${currentClasses.accent || currentVariant.accent} opacity-60`} />
          <div className={`absolute top-0 right-0 h-full w-0.5 ${currentClasses.accent || currentVariant.accent} opacity-60`} />
        </div>
        <div className="absolute bottom-0 left-0 w-3 h-3 pointer-events-none">
          <div className={`absolute bottom-0 left-0 w-full h-0.5 ${currentClasses.accent || currentVariant.accent} opacity-60`} />
          <div className={`absolute bottom-0 left-0 h-full w-0.5 ${currentClasses.accent || currentVariant.accent} opacity-60`} />
        </div>
        <div className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none">
          <div className={`absolute bottom-0 right-0 w-full h-0.5 ${currentClasses.accent || currentVariant.accent} opacity-60`} />
          <div className={`absolute bottom-0 right-0 h-full w-0.5 ${currentClasses.accent || currentVariant.accent} opacity-60`} />
        </div>

        {/* Start Icon */}
        {icon && (
          <div className={`
            absolute left-3 top-1/2 -translate-y-1/2
            ${currentClasses.text || currentVariant.text}
            pointer-events-none
          `}>
            {icon}
          </div>
        )}

        {/* End Icon */}
        {endIcon && (
          <div className={`
            absolute right-3 top-1/2 -translate-y-1/2
            ${currentClasses.text || currentVariant.text}
            pointer-events-none
          `}>
            {endIcon}
          </div>
        )}

        {/* Scanlines effect */}
        {scanlines && (
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                currentColor 2px,
                currentColor 3px
              )`
            }}
          />
        )}

        {/* Focus indicator */}
        {isFocused && (
          <div className={`
            absolute inset-0 border-2 border-transparent
            animate-pulse pointer-events-none
            ${currentClasses.border || currentVariant.border}
          `} />
        )}

        {/* Data stream animation */}
        {animated && isFocused && (
          <div 
            className={`
              absolute bottom-0 left-0 h-0.5 
              ${currentClasses.accent || currentVariant.accent}
              animate-pulse
            `}
            style={{
              width: '30%',
              animationDuration: '1.5s'
            }}
          />
        )}
      </div>

      {/* Helper Text / Error / Success Message */}
      {(error || success || helperText || showCharacterCount) && (
        <div className="mt-2 flex justify-between items-center">
          <div className="text-xs font-mono">
            {error && (
              <span className="text-red-400 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </span>
            )}
            {success && !error && (
              <span className="text-green-400 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {success}
              </span>
            )}
            {helperText && !error && !success && (
              <span className={`${currentVariant.label} opacity-70`}>
                {helperText}
              </span>
            )}
          </div>
          
          {showCharacterCount && maxLength && (
            <span className={`text-xs font-mono ${currentVariant.label} opacity-70`}>
              {currentValue.length}/{maxLength}
            </span>
          )}
        </div>
      )}

      {/* Circuit pattern indicators */}
      {isFocused && (
        <div className="absolute -top-1 -right-1 w-2 h-2 pointer-events-none">
          <div className={`w-1 h-1 ${currentClasses.accent || currentVariant.accent} rounded-full animate-pulse`} />
        </div>
      )}
      {currentValue && (
        <div className="absolute -bottom-1 -left-1 w-2 h-2 pointer-events-none">
          <div className={`w-1 h-1 ${currentClasses.accent || currentVariant.accent} rounded-full animate-pulse`} style={{ animationDelay: '0.5s' }} />
        </div>
      )}
    </div>
  );
};

export default Input;