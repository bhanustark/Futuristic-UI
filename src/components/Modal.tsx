import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'danger';
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  variant = 'primary',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeOnEscape, isOpen, onClose]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  const variantClasses = {
    primary: {
      border: 'border-cyan-400',
      glow: 'shadow-[0_0_50px_rgba(34,211,238,0.3)]',
      accent: 'text-cyan-400',
      headerBg: 'from-cyan-900/20 to-blue-900/20',
    },
    secondary: {
      border: 'border-purple-400', 
      glow: 'shadow-[0_0_50px_rgba(168,85,247,0.3)]',
      accent: 'text-purple-400',
      headerBg: 'from-purple-900/20 to-pink-900/20',
    },
    danger: {
      border: 'border-red-400',
      glow: 'shadow-[0_0_50px_rgba(239,68,68,0.3)]',
      accent: 'text-red-400',
      headerBg: 'from-red-900/20 to-orange-900/20',
    }
  };

  const currentVariant = variantClasses[variant];

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Animated Backdrop */}
      <div 
        className={`
          fixed inset-0 
          bg-black/80 
          backdrop-blur-sm
          transition-all duration-300 ease-out
          ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={handleBackdropClick}
      >
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="h-full w-full opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(cyan 1px, transparent 1px),
                linear-gradient(90deg, cyan 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      </div>

      {/* Modal Container */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`
          relative
          w-full
          ${sizeClasses[size]}
          max-h-[90vh]
          ${currentVariant.border}
          ${currentVariant.glow}
          bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95
          border-2
          overflow-hidden
          transition-all duration-300 ease-out
          transform
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'}
          focus:outline-none
        `}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
        }}
      >
        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-8 h-8">
          <div className={`absolute top-0 left-0 w-full h-0.5 ${currentVariant.accent.replace('text-', 'bg-')} opacity-80`} />
          <div className={`absolute top-0 left-0 h-full w-0.5 ${currentVariant.accent.replace('text-', 'bg-')} opacity-80`} />
        </div>
        <div className="absolute top-0 right-0 w-8 h-8">
          <div className={`absolute top-0 right-0 w-full h-0.5 ${currentVariant.accent.replace('text-', 'bg-')} opacity-80`} />
          <div className={`absolute top-0 right-0 h-full w-0.5 ${currentVariant.accent.replace('text-', 'bg-')} opacity-80`} />
        </div>
        <div className="absolute bottom-0 left-0 w-8 h-8">
          <div className={`absolute bottom-0 left-0 w-full h-0.5 ${currentVariant.accent.replace('text-', 'bg-')} opacity-80`} />
          <div className={`absolute bottom-0 left-0 h-full w-0.5 ${currentVariant.accent.replace('text-', 'bg-')} opacity-80`} />
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8">
          <div className={`absolute bottom-0 right-0 w-full h-0.5 ${currentVariant.accent.replace('text-', 'bg-')} opacity-80`} />
          <div className={`absolute bottom-0 right-0 h-full w-0.5 ${currentVariant.accent.replace('text-', 'bg-')} opacity-80`} />
        </div>

        {/* Scanning line animation */}
        <div 
          className={`
            absolute top-0 left-0 w-full h-0.5 
            ${currentVariant.accent.replace('text-', 'bg-')}
            opacity-60 animate-pulse
          `}
        />

        {/* Header */}
        {(title || showCloseButton) && (
          <div className={`
            relative
            px-6 py-4
            bg-gradient-to-r ${currentVariant.headerBg}
            border-b ${currentVariant.border}
            flex items-center justify-between
          `}>
            {title && (
              <h2 className={`
                text-xl font-mono font-bold 
                ${currentVariant.accent}
                tracking-wider uppercase
                flex items-center gap-2
              `}>
                <span className="w-2 h-2 bg-current rounded-full animate-pulse" />
                {title}
              </h2>
            )}
            
            {showCloseButton && (
              <button
                onClick={onClose}
                className={`
                  ml-auto
                  p-2
                  ${currentVariant.accent}
                  hover:bg-white/10
                  transition-all duration-200
                  border ${currentVariant.border}
                  hover:scale-110
                  focus:outline-none
                  focus:ring-2 focus:ring-current
                  group
                `}
                aria-label="Close modal"
              >
                <svg 
                  className="w-5 h-5 transform group-hover:rotate-90 transition-transform duration-200" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="relative overflow-y-auto max-h-[calc(90vh-8rem)]">
          <div className="p-6">
            {children}
          </div>
        </div>

        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-4 left-8 w-1 h-1 bg-current rounded-full animate-pulse" />
          <div className="absolute top-8 right-12 w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-6 left-12 w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-4 right-8 w-1 h-1 bg-current rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;