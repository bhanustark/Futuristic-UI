import React, { useState, useEffect } from 'react';

interface PowerSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  powerLevel?: number; // 0-100
  criticalMode?: boolean;
  className?: string;
}

interface SecuritySwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  securityLevel?: 'low' | 'medium' | 'high' | 'critical';
  scanAnimation?: boolean;
  className?: string;
}

interface HologramSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  projectionLines?: number;
  flicker?: boolean;
  className?: string;
}

export const PowerSwitch: React.FC<PowerSwitchProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  variant = 'primary',
  size = 'md',
  label,
  powerLevel = 100,
  criticalMode = false,
  className = '',
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [energyPulse, setEnergyPulse] = useState(0);
  
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  useEffect(() => {
    if (checked) {
      const interval = setInterval(() => {
        setEnergyPulse(prev => (prev + 1) % 100);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [checked]);

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
      track: 'bg-cyan-900/20 border-cyan-400',
      thumb: 'bg-cyan-400',
      energy: 'bg-cyan-400',
      glow: 'shadow-[0_0_30px_rgba(34,211,238,0.8)]',
    },
    secondary: {
      track: 'bg-purple-900/20 border-purple-400',
      thumb: 'bg-purple-400',
      energy: 'bg-purple-400',
      glow: 'shadow-[0_0_30px_rgba(168,85,247,0.8)]',
    },
    danger: {
      track: 'bg-red-900/20 border-red-400',
      thumb: 'bg-red-400',
      energy: 'bg-red-400',
      glow: 'shadow-[0_0_30px_rgba(239,68,68,0.8)]',
    },
  };

  const sizeClasses = {
    sm: { container: 'w-16 h-8', thumb: 'w-6 h-6', translate: 'translate-x-8' },
    md: { container: 'w-20 h-10', thumb: 'w-8 h-8', translate: 'translate-x-10' },
    lg: { container: 'w-24 h-12', thumb: 'w-10 h-10', translate: 'translate-x-12' },
  };

  const styles = variantClasses[variant];
  const sizes = sizeClasses[size];

  return (
    <div className={`relative inline-flex flex-col items-center gap-2 ${className}`}>
      {label && (
        <div className="text-sm font-mono text-gray-300 mb-1">{label}</div>
      )}
      
      {/* Power level indicator */}
      <div className="w-full max-w-20 h-1 bg-gray-800 rounded-full overflow-hidden mb-2">
        <div 
          className={`h-full ${styles.energy} transition-all duration-500`}
          style={{ width: `${powerLevel}%` }}
        />
      </div>

      {/* Switch container */}
      <div
        onClick={handleToggle}
        className={`
          ${sizes.container}
          relative inline-flex items-center rounded-full border-2 
          cursor-pointer transition-all duration-500
          ${styles.track}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${checked ? styles.glow : 'border-gray-600 bg-gray-800'}
          ${criticalMode && checked ? 'animate-pulse' : ''}
        `}
      >
        {/* Energy core */}
        <div
          className={`
            ${sizes.thumb}
            relative inline-block rounded-full transition-all duration-500
            transform ${checked ? sizes.translate : 'translate-x-1'}
            ${checked ? styles.thumb : 'bg-gray-500'}
          `}
        >
          {/* Energy pulse effect */}
          {checked && (
            <>
              <div className={`absolute inset-0 rounded-full ${styles.thumb} opacity-30 animate-ping`} />
              <div 
                className={`absolute inset-1 rounded-full ${styles.energy} opacity-60`}
                style={{ 
                  transform: `scale(${0.8 + (energyPulse / 100) * 0.4})`,
                  transition: 'transform 0.05s ease-in-out'
                }}
              />
            </>
          )}
          
          {/* Power symbol */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              width="60%" 
              height="60%" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              className={`${checked ? 'text-black' : 'text-gray-400'}`}
            >
              <path d="M18.36 6.64A9 9 0 1 1 5.64 19.36" />
              <line x1="12" x2="12" y1="2" y2="12" />
            </svg>
          </div>
        </div>

        {/* Energy flow lines */}
        {checked && (
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`absolute inset-0 rounded-full border ${styles.energy} opacity-20 animate-ping`}
                style={{ animationDelay: `${i * 0.3}s`, animationDuration: '2s' }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Status indicators */}
      <div className="flex gap-1 mt-1">
        {['POWER', 'CORE', 'STABLE'].map((status) => (
          <div
            key={status}
            className={`
              text-xs font-mono px-2 py-0.5 rounded border
              ${checked 
                ? `${styles.energy.replace('bg-', 'text-')} ${styles.track.replace('bg-', 'border-')} bg-black/50` 
                : 'text-gray-500 border-gray-600 bg-gray-800'
              }
            `}
          >
            {status}
          </div>
        ))}
      </div>
    </div>
  );
};

export const SecuritySwitch: React.FC<SecuritySwitchProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  variant = 'primary',
  size = 'md',
  label,
  securityLevel = 'medium',
  scanAnimation = true,
  className = '',
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [scanLine, setScanLine] = useState(0);
  
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  useEffect(() => {
    if (checked && scanAnimation) {
      const interval = setInterval(() => {
        setScanLine(prev => (prev + 2) % 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [checked, scanAnimation]);

  const handleToggle = () => {
    if (disabled) return;
    
    const newChecked = !checked;
    
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    
    onChange?.(newChecked);
  };

  const securityColors = {
    low: { color: 'green', intensity: 'rgba(34,197,94,0.6)' },
    medium: { color: 'orange', intensity: 'rgba(251,146,60,0.6)' },
    high: { color: 'red', intensity: 'rgba(239,68,68,0.6)' },
    critical: { color: 'purple', intensity: 'rgba(168,85,247,0.6)' },
  };

  const variantClasses = {
    primary: {
      track: 'bg-cyan-900/20 border-cyan-400',
      thumb: 'bg-cyan-400',
      glow: 'shadow-[0_0_25px_rgba(34,211,238,0.6)]',
    },
    secondary: {
      track: 'bg-purple-900/20 border-purple-400',
      thumb: 'bg-purple-400',
      glow: 'shadow-[0_0_25px_rgba(168,85,247,0.6)]',
    },
    danger: {
      track: 'bg-red-900/20 border-red-400',
      thumb: 'bg-red-400',
      glow: 'shadow-[0_0_25px_rgba(239,68,68,0.6)]',
    },
  };

  const sizeClasses = {
    sm: { container: 'w-14 h-7', thumb: 'w-5 h-5', translate: 'translate-x-7' },
    md: { container: 'w-16 h-8', thumb: 'w-6 h-6', translate: 'translate-x-8' },
    lg: { container: 'w-18 h-9', thumb: 'w-7 h-7', translate: 'translate-x-10' },
  };

  const styles = variantClasses[variant];
  const sizes = sizeClasses[size];
  const security = securityColors[securityLevel];

  return (
    <div className={`relative inline-flex flex-col items-center gap-2 ${className}`}>
      {label && (
        <div className="text-sm font-mono text-gray-300 mb-1">{label}</div>
      )}
      
      {/* Security level indicator */}
      <div className="flex items-center gap-2 mb-2">
        <div className={`text-xs font-mono text-${security.color}-400 uppercase`}>
          {securityLevel}
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`
                w-2 h-1 rounded
                ${i <= Object.keys(securityColors).indexOf(securityLevel) 
                  ? `bg-${security.color}-400` 
                  : 'bg-gray-600'
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Switch container */}
      <div
        onClick={handleToggle}
        className={`
          ${sizes.container}
          relative inline-flex items-center rounded-full border-2 
          cursor-pointer transition-all duration-300 overflow-hidden
          ${styles.track}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${checked ? styles.glow : 'border-gray-600 bg-gray-800'}
        `}
      >
        {/* Security scan line */}
        {checked && scanAnimation && (
          <div
            className={`absolute top-0 bottom-0 w-0.5 bg-${security.color}-400 opacity-80`}
            style={{ left: `${scanLine}%`, transition: 'left 0.1s ease-in-out' }}
          />
        )}

        {/* Biometric pattern background */}
        {checked && (
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" className="text-current">
              <defs>
                <pattern id="biometric" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#biometric)" />
            </svg>
          </div>
        )}

        {/* Switch thumb */}
        <div
          className={`
            ${sizes.thumb}
            relative inline-block rounded-full transition-all duration-300 z-10
            transform ${checked ? sizes.translate : 'translate-x-1'}
            ${checked ? styles.thumb : 'bg-gray-500'}
          `}
        >
          {/* Fingerprint icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              width="70%" 
              height="70%" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
              className={`${checked ? 'text-black' : 'text-gray-400'}`}
            >
              <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
              <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
              <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
              <path d="M9 16c.85.38 2.8 1.27 4 2" />
              <path d="M12.2 6.05A2 2 0 0 1 14 8c0 1.02-.1 2.51-.26 4" />
              <path d="M16.99 11c0 1.02-.1 2.51-.26 4" />
              <path d="M20.99 11c0 1.02-.1 2.51-.26 4" />
            </svg>
          </div>
        </div>

        {/* Security indicators */}
        <div className="absolute top-1 right-1">
          <div className={`w-1.5 h-1.5 rounded-full ${checked ? `bg-${security.color}-400 animate-pulse` : 'bg-gray-600'}`} />
        </div>
      </div>

      {/* Access status */}
      <div className="text-xs font-mono mt-1">
        <span className={`${checked ? `text-${security.color}-400` : 'text-gray-500'}`}>
          {checked ? 'ACCESS GRANTED' : 'ACCESS DENIED'}
        </span>
      </div>
    </div>
  );
};

export const HologramSwitch: React.FC<HologramSwitchProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  variant = 'primary',
  size = 'md',
  label,
  projectionLines = 5,
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
        setFlickerState(prev => Math.random() > 0.1 ? true : !prev);
      }, 150);
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
      track: 'bg-cyan-900/10 border-cyan-400',
      thumb: 'bg-cyan-400',
      hologram: 'text-cyan-400',
      glow: 'shadow-[0_0_20px_rgba(34,211,238,0.6)]',
    },
    secondary: {
      track: 'bg-purple-900/10 border-purple-400',
      thumb: 'bg-purple-400',
      hologram: 'text-purple-400',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.6)]',
    },
    neutral: {
      track: 'bg-slate-800/20 border-slate-400',
      thumb: 'bg-slate-400',
      hologram: 'text-slate-400',
      glow: 'shadow-[0_0_20px_rgba(148,163,184,0.6)]',
    },
  };

  const sizeClasses = {
    sm: { container: 'w-14 h-7', thumb: 'w-5 h-5', translate: 'translate-x-7' },
    md: { container: 'w-16 h-8', thumb: 'w-6 h-6', translate: 'translate-x-8' },
    lg: { container: 'w-18 h-9', thumb: 'w-7 h-7', translate: 'translate-x-10' },
  };

  const styles = variantClasses[variant];
  const sizes = sizeClasses[size];

  return (
    <div className={`relative inline-flex flex-col items-center gap-2 ${className}`}>
      {label && (
        <div className="text-sm font-mono text-gray-300 mb-1">{label}</div>
      )}
      
      {/* Hologram projection lines */}
      {checked && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-full">
          {Array.from({ length: projectionLines }).map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-px h-6 ${styles.hologram.replace('text-', 'bg-')} opacity-30
                ${flickerState ? 'animate-pulse' : 'opacity-10'}
              `}
              style={{
                left: `${20 + (i * 60) / projectionLines}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.5s',
              }}
            />
          ))}
        </div>
      )}

      {/* Switch container */}
      <div
        onClick={handleToggle}
        className={`
          ${sizes.container}
          relative inline-flex items-center rounded-full border-2 
          cursor-pointer transition-all duration-500 overflow-hidden
          ${styles.track}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${checked ? styles.glow : 'border-gray-600 bg-gray-800'}
          ${checked && flicker && !flickerState ? 'opacity-70' : ''}
        `}
      >
        {/* Holographic interference pattern */}
        {checked && (
          <div className="absolute inset-0 opacity-20">
            <div 
              className="w-full h-full"
              style={{
                background: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 1px,
                  ${styles.hologram.replace('text-', 'rgba(')}20 1px,
                  ${styles.hologram.replace('text-', 'rgba(')}20 2px
                )`
              }}
            />
          </div>
        )}

        {/* Switch thumb */}
        <div
          className={`
            ${sizes.thumb}
            relative inline-block rounded-full transition-all duration-500
            transform ${checked ? sizes.translate : 'translate-x-1'}
            ${checked ? styles.thumb : 'bg-gray-500'}
            ${checked && flicker ? 'animate-pulse' : ''}
          `}
        >
          {/* Hologram symbol */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              width="70%" 
              height="70%" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className={`${checked ? 'text-black' : 'text-gray-400'}`}
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        </div>

        {/* Projection corners */}
        {checked && (
          <>
            <div className={`absolute top-0 left-0 w-2 h-2 ${styles.hologram.replace('text-', 'border-')} border-t border-l opacity-60`} />
            <div className={`absolute top-0 right-0 w-2 h-2 ${styles.hologram.replace('text-', 'border-')} border-t border-r opacity-60`} />
            <div className={`absolute bottom-0 left-0 w-2 h-2 ${styles.hologram.replace('text-', 'border-')} border-b border-l opacity-60`} />
            <div className={`absolute bottom-0 right-0 w-2 h-2 ${styles.hologram.replace('text-', 'border-')} border-b border-r opacity-60`} />
          </>
        )}
      </div>

      {/* Hologram status */}
      <div className="text-xs font-mono mt-1">
        <span className={`${checked ? styles.hologram : 'text-gray-500'}`}>
          {checked ? 'PROJECTION ACTIVE' : 'PROJECTION OFFLINE'}
        </span>
      </div>
    </div>
  );
};