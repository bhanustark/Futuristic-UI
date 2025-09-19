import React from "react";

interface TextProps {
  children: React.ReactNode;
  variant?: 'heading' | 'subheading' | 'body' | 'caption' | 'code' | 'terminal' | 'display';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'neutral' | 'white';
  weight?: 'light' | 'normal' | 'medium' | 'bold' | 'black';
  glow?: boolean;
  animated?: boolean;
  uppercase?: boolean;
  monospace?: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'code';
}

const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  size,
  color = 'white',
  weight = 'normal',
  glow = false,
  animated = false,
  uppercase = false,
  monospace = false,
  className = '',
  as,
}) => {
  // Determine the HTML element based on variant or explicit 'as' prop
  const getElement = () => {
    if (as) return as;
    
    switch (variant) {
      case 'display':
      case 'heading':
        return 'h1';
      case 'subheading':
        return 'h2';
      case 'code':
      case 'terminal':
        return 'code';
      default:
        return 'p';
    }
  };

  // Size classes based on variant defaults or explicit size
  const getSizeClasses = () => {
    const explicitSize = size;
    const defaultSizes: Record<string, TextProps['size']> = {
      display: '4xl',
      heading: '3xl',
      subheading: '2xl',
      body: 'md',
      caption: 'sm',
      code: 'sm',
      terminal: 'sm',
    };
    
    const finalSize = explicitSize || defaultSizes[variant] || 'md';
    
    const sizeClasses: Record<NonNullable<TextProps['size']>, string> = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
    };
    
    return sizeClasses[finalSize];
  };

  // Color classes
  const colorClasses = {
    primary: 'text-cyan-400',
    secondary: 'text-purple-400',
    danger: 'text-red-400',
    success: 'text-green-400',
    warning: 'text-yellow-400',
    neutral: 'text-gray-400',
    white: 'text-white',
  };

  // Weight classes
  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
    black: 'font-black',
  };

  // Glow effects based on color
  const glowClasses = {
    primary: 'drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]',
    secondary: 'drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]',
    danger: 'drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]',
    success: 'drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]',
    warning: 'drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]',
    neutral: 'drop-shadow-[0_0_10px_rgba(156,163,175,0.5)]',
    white: 'drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]',
  };

  // Variant-specific styling
  const variantClasses = {
    display: 'font-mono tracking-wider',
    heading: 'font-mono tracking-wide',
    subheading: 'font-mono tracking-wide',
    body: '',
    caption: 'opacity-80',
    code: 'font-mono bg-gray-900/50 px-2 py-1 rounded border border-gray-700',
    terminal: 'font-mono bg-black px-3 py-2 border border-green-500/50 rounded text-green-400',
  };

  // Build the final className
  const finalClassName = `
    ${getSizeClasses()}
    ${colorClasses[color]}
    ${weightClasses[weight]}
    ${variantClasses[variant]}
    ${glow ? glowClasses[color] : ''}
    ${animated ? 'transition-all duration-300 hover:scale-105' : ''}
    ${uppercase ? 'uppercase' : ''}
    ${monospace || ['display', 'heading', 'subheading', 'code', 'terminal'].includes(variant) ? 'font-mono' : ''}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  const Component = getElement();

  return (
    <Component className={finalClassName}>
      {children}
    </Component>
  );
};

export default Text;