import React, { useState, useEffect } from 'react';

interface CodeInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'neutral';
  maxLength?: number;
  className?: string;
}

interface TerminalInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  prompt?: string;
  history?: string[];
  disabled?: boolean;
  className?: string;
}

interface ScannerInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  scanning?: boolean;
  scanDelay?: number;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'neutral';
  className?: string;
}

export const CodeInput: React.FC<CodeInputProps> = ({
  value = '',
  onChange,
  placeholder = 'Enter code...',
  disabled = false,
  variant = 'primary',
  maxLength = 8,
  className = '',
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
    if (newValue.length <= maxLength) {
      setInputValue(newValue);
      onChange?.(newValue);
    }
  };

  const variantClasses = {
    primary: {
      border: 'border-cyan-400',
      glow: 'shadow-[0_0_20px_rgba(34,211,238,0.4)]',
      text: 'text-cyan-100',
      accent: 'bg-cyan-400',
    },
    secondary: {
      border: 'border-purple-400',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.4)]',
      text: 'text-purple-100',
      accent: 'bg-purple-400',
    },
    neutral: {
      border: 'border-slate-400',
      glow: 'shadow-[0_0_20px_rgba(148,163,184,0.4)]',
      text: 'text-slate-100',
      accent: 'bg-slate-400',
    },
  };

  const styles = variantClasses[variant];

  return (
    <div className={`relative ${className}`}>
      {/* Corner accents */}
      <div className={`absolute -top-1 -left-1 w-3 h-3 ${styles.accent} opacity-80`} 
           style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
      <div className={`absolute -top-1 -right-1 w-3 h-3 ${styles.accent} opacity-80`} 
           style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
      <div className={`absolute -bottom-1 -left-1 w-3 h-3 ${styles.accent} opacity-80`} 
           style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }} />
      <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${styles.accent} opacity-80`} 
           style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />

      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-3 bg-black/70 ${styles.border} border-2 
            ${styles.text} font-mono text-xl tracking-[0.3em] text-center
            focus:outline-none focus:${styles.glow}
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            placeholder:text-gray-500 placeholder:tracking-normal
          `}
        />
        
        {/* Code segments visualization */}
        <div className="absolute inset-x-4 bottom-1 flex justify-center space-x-2">
          {Array.from({ length: maxLength }).map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full transition-all duration-200 ${
                i < inputValue.length 
                  ? `${styles.accent}` 
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const TerminalInput: React.FC<TerminalInputProps> = ({
  value = '',
  onChange,
  onSubmit,
  prompt = '$',
  history = [],
  disabled = false,
  className = '',
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled) {
      onSubmit?.(inputValue);
      setInputValue('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp' && history.length > 0) {
      e.preventDefault();
      const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIndex);
      const command = history[history.length - 1 - newIndex];
      setInputValue(command || '');
    } else if (e.key === 'ArrowDown' && historyIndex >= 0) {
      e.preventDefault();
      const newIndex = historyIndex > 0 ? historyIndex - 1 : -1;
      setHistoryIndex(newIndex);
      setInputValue(newIndex >= 0 ? history[history.length - 1 - newIndex] : '');
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Terminal frame */}
      <div className="border border-green-400 bg-black/90 font-mono">
        {/* Terminal header */}
        <div className="flex items-center justify-between px-3 py-2 bg-green-400/10 border-b border-green-400/30">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <div className="text-green-400 text-xs">TERMINAL</div>
        </div>

        {/* Input area */}
        <div className="p-3 flex items-center space-x-2">
          <span className="text-green-400 font-bold">{prompt}</span>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className="
              flex-1 bg-transparent text-green-400 font-mono text-sm
              focus:outline-none
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            placeholder="Type command..."
          />
          <div className="w-2 h-5 bg-green-400 animate-pulse"></div>
        </div>

        {/* Scan lines effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-b from-transparent via-green-400/5 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export const ScannerInput: React.FC<ScannerInputProps> = ({
  value = '',
  onChange,
  placeholder = 'Scanning...',
  scanning = false,
  scanDelay = 2000,
  disabled = false,
  variant = 'primary',
  className = '',
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(scanning);

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setIsScanning(false);
            return 0;
          }
          return prev + 2;
        });
      }, scanDelay / 50);

      return () => clearInterval(interval);
    }
  }, [isScanning, scanDelay]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  const handleFocus = () => {
    if (!disabled && !isScanning) {
      setIsScanning(true);
      setScanProgress(0);
    }
  };

  const variantClasses = {
    primary: {
      border: 'border-cyan-400',
      glow: 'shadow-[0_0_20px_rgba(34,211,238,0.4)]',
      text: 'text-cyan-100',
      accent: 'bg-cyan-400',
      scan: 'bg-cyan-400',
    },
    secondary: {
      border: 'border-purple-400',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.4)]',
      text: 'text-purple-100',
      accent: 'bg-purple-400',
      scan: 'bg-purple-400',
    },
    neutral: {
      border: 'border-slate-400',
      glow: 'shadow-[0_0_20px_rgba(148,163,184,0.4)]',
      text: 'text-slate-100',
      accent: 'bg-slate-400',
      scan: 'bg-slate-400',
    },
  };

  const styles = variantClasses[variant];

  return (
    <div className={`relative ${className}`}>
      {/* Corner accents */}
      <div className={`absolute -top-1 -left-1 w-3 h-3 ${styles.accent} opacity-80`} 
           style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
      <div className={`absolute -top-1 -right-1 w-3 h-3 ${styles.accent} opacity-80`} 
           style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
      <div className={`absolute -bottom-1 -left-1 w-3 h-3 ${styles.accent} opacity-80`} 
           style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }} />
      <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${styles.accent} opacity-80`} 
           style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />

      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          disabled={disabled || isScanning}
          className={`
            w-full px-4 py-3 bg-black/70 ${styles.border} border-2 
            ${styles.text} font-mono
            focus:outline-none focus:${styles.glow}
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed
            placeholder:text-gray-500
          `}
        />

        {/* Scanning overlay */}
        {isScanning && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Scan line */}
            <div 
              className={`absolute top-0 left-0 h-full ${styles.scan} opacity-30 transition-all duration-100`}
              style={{ width: `${scanProgress}%` }}
            />
            
            {/* Moving scan line */}
            <div 
              className={`absolute top-0 w-1 h-full ${styles.scan} opacity-80 animate-pulse`}
              style={{ left: `${scanProgress}%` }}
            />
          </div>
        )}

        {/* Status indicator */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className={`
            w-2 h-2 rounded-full transition-all duration-300
            ${isScanning ? `${styles.scan} animate-pulse` : 'bg-gray-600'}
          `} />
        </div>
      </div>

      {/* Scanning status */}
      {isScanning && (
        <div className="absolute -bottom-6 left-0 right-0 text-center">
          <div className={`text-xs ${styles.text} opacity-60`}>
            Scanning... {Math.round(scanProgress)}%
          </div>
        </div>
      )}
    </div>
  );
};