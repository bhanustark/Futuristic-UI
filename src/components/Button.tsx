import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
}) => {
  const baseClasses = `
    relative
    overflow-hidden
    font-mono
    font-bold
    uppercase
    tracking-wider
    border-2
    transition-all
    duration-300
    ease-in-out
    transform
    cursor-pointer
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    focus:ring-offset-black
    disabled:cursor-not-allowed
    disabled:opacity-50
    disabled:transform-none
    hover:scale-105
    active:scale-95
    before:absolute
    before:inset-0
    before:bg-gradient-to-r
    before:opacity-0
    before:transition-opacity
    before:duration-300
    hover:before:opacity-20
    after:absolute
    after:top-0
    after:left-[-100%]
    after:h-full
    after:w-full
    after:bg-gradient-to-r
    after:from-transparent
    after:via-white/20
    after:to-transparent
    after:transition-all
    after:duration-700
    hover:after:left-[100%]
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-cyan-900/30 via-blue-900/30 to-cyan-900/30
      border-cyan-400
      text-cyan-100
      shadow-[0_0_20px_rgba(34,211,238,0.3)]
      hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]
      hover:border-cyan-300
      hover:text-white
      focus:ring-cyan-400
      before:from-cyan-400
      before:to-blue-400
    `,
    secondary: `
      bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-purple-900/30
      border-purple-400
      text-purple-100
      shadow-[0_0_20px_rgba(168,85,247,0.3)]
      hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]
      hover:border-purple-300
      hover:text-white
      focus:ring-purple-400
      before:from-purple-400
      before:to-pink-400
    `,
    danger: `
      bg-gradient-to-r from-red-900/30 via-orange-900/30 to-red-900/30
      border-red-400
      text-red-100
      shadow-[0_0_20px_rgba(239,68,68,0.3)]
      hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]
      hover:border-red-300
      hover:text-white
      focus:ring-red-400
      before:from-red-400
      before:to-orange-400
    `
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs min-h-[32px]',
    md: 'px-6 py-3 text-sm min-h-[44px]',
    lg: 'px-8 py-4 text-base min-h-[52px]'
  };

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
  `.replace(/\s+/g, ' ').trim();

  return (
    <button
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-current opacity-60" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-current opacity-60" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-current opacity-60" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-current opacity-60" />
      
      {/* Circuit pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-2 left-4 w-1 h-1 bg-current rounded-full animate-pulse" />
        <div className="absolute top-4 right-6 w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-2 left-6 w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </button>
  );
};

export default Button;