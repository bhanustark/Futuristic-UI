import React, { useEffect, useState, useRef, useCallback } from "react";

interface GlitchTextProps {
  children: string;
  intensity?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'medium' | 'fast';
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  children,
  intensity = 'medium',
  speed = 'medium',
  color = 'primary',
  size = 'md',
  className = '',
}) => {
  const [glitchedText, setGlitchedText] = useState(children);
  const intervalRef = useRef<number | null>(null);

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?`~';
  
  const colorClasses = {
    primary: 'text-cyan-400',
    secondary: 'text-purple-400', 
    danger: 'text-red-400',
    success: 'text-green-400',
    warning: 'text-yellow-400',
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const glitch = useCallback(() => {
    const intensitySettings = {
      low: { probability: 0.1, duration: 100 },
      medium: { probability: 0.2, duration: 150 },
      high: { probability: 0.3, duration: 200 },
    };

    const { probability, duration } = intensitySettings[intensity];
    
    const glitchedChars = children
      .split('')
      .map(char => {
        if (char === ' ') return ' ';
        return Math.random() < probability 
          ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
          : char;
      })
      .join('');
    
    setGlitchedText(glitchedChars);
    
    setTimeout(() => {
      setGlitchedText(children);
    }, duration);
  }, [children, intensity, glitchChars]);

  useEffect(() => {
    const speedSettings = {
      slow: 2000,
      medium: 1000,
      fast: 500,
    };

    intervalRef.current = window.setInterval(glitch, speedSettings[speed]);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [glitch, speed]);

  return (
    <span 
      className={`
        font-mono font-bold tracking-wide
        ${colorClasses[color]}
        ${sizeClasses[size]}
        drop-shadow-[0_0_10px_currentColor]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {glitchedText}
    </span>
  );
};

interface TypewriterTextProps {
  children: string;
  speed?: number;
  delay?: number;
  repeat?: boolean;
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCursor?: boolean;
  className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  children,
  speed = 100,
  delay = 0,
  repeat = false,
  color = 'primary',
  size = 'md',
  showCursor = true,
  className = '',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const colorClasses = {
    primary: 'text-cyan-400',
    secondary: 'text-purple-400',
    danger: 'text-red-400',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    white: 'text-white',
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl',
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && currentIndex < children.length) {
        setDisplayedText(children.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (isDeleting && currentIndex > 0) {
        setDisplayedText(children.slice(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else if (!isDeleting && currentIndex === children.length && repeat) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
      }
    }, delay + (isDeleting ? speed / 2 : speed));

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, children, speed, delay, repeat]);

  return (
    <span 
      className={`
        font-mono
        ${colorClasses[color]}
        ${sizeClasses[size]}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {displayedText}
      {showCursor && (
        <span className="animate-pulse ml-1 text-current">|</span>
      )}
    </span>
  );
};

interface MatrixTextProps {
  children: string;
  color?: 'green' | 'cyan' | 'purple';
  speed?: 'slow' | 'medium' | 'fast';
  density?: 'low' | 'medium' | 'high';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const MatrixText: React.FC<MatrixTextProps> = ({
  children,
  color = 'green',
  speed = 'medium',
  density = 'medium',
  size = 'md',
  className = '',
}) => {
  const [matrixChars, setMatrixChars] = useState<string[]>([]);
  const intervalRef = useRef<number | null>(null);

  const matrixCharSet = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ0123456789';
  
  const colorClasses = {
    green: 'text-green-400',
    cyan: 'text-cyan-400',
    purple: 'text-purple-400',
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const generateMatrixEffect = useCallback(() => {
    const densitySettings = {
      low: 0.1,
      medium: 0.2,
      high: 0.4,
    };

    const probability = densitySettings[density];
    
    const chars = children
      .split('')
      .map(char => {
        if (char === ' ') return ' ';
        return Math.random() < probability
          ? matrixCharSet[Math.floor(Math.random() * matrixCharSet.length)]
          : char;
      });
    
    setMatrixChars(chars);
  }, [children, density, matrixCharSet]);

  useEffect(() => {
    const speedSettings = {
      slow: 200,
      medium: 100,
      fast: 50,
    };

    intervalRef.current = window.setInterval(generateMatrixEffect, speedSettings[speed]);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [generateMatrixEffect, speed]);

  return (
    <span 
      className={`
        font-mono font-bold
        ${colorClasses[color]}
        ${sizeClasses[size]}
        drop-shadow-[0_0_8px_currentColor]
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {matrixChars.map((char, index) => (
        <span
          key={index}
          className={char !== children[index] ? 'opacity-60 animate-pulse' : ''}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

interface ScanlineTextProps {
  children: string;
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  speed?: 'slow' | 'medium' | 'fast';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ScanlineText: React.FC<ScanlineTextProps> = ({
  children,
  color = 'primary',
  speed = 'medium',
  size = 'md',
  className = '',
}) => {
  const colorClasses = {
    primary: 'text-cyan-400',
    secondary: 'text-purple-400',
    danger: 'text-red-400', 
    success: 'text-green-400',
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const speedClasses = {
    slow: 'animate-pulse',
    medium: 'animate-pulse',
    fast: 'animate-ping',
  };

  return (
    <div className="relative inline-block">
      <span 
        className={`
          font-mono font-bold
          ${colorClasses[color]}
          ${sizeClasses[size]}
          relative z-10
          ${className}
        `.replace(/\s+/g, ' ').trim()}
      >
        {children}
      </span>
      
      {/* Animated scanline overlay */}
      <div 
        className={`
          absolute inset-0 
          bg-gradient-to-b from-transparent via-current to-transparent
          opacity-30
          ${speedClasses[speed]}
        `}
      />
    </div>
  );
};