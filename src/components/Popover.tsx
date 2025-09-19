import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

export interface PopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  trigger?: 'click' | 'hover' | 'focus';
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  arrow?: boolean;
  glow?: boolean;
  animated?: boolean;
  corners?: boolean;
  scanlines?: boolean;
  backdrop?: boolean;
  disabled?: boolean;
  offset?: number;
  className?: string;
  contentClassName?: string;
  onOpenChange?: (open: boolean) => void;
}

const Popover: React.FC<PopoverProps> = ({
  children,
  content,
  trigger = 'click',
  placement = 'bottom',
  variant = 'primary',
  size = 'md',
  arrow = true,
  glow = false,
  animated = true,
  corners = false,
  scanlines = false,
  backdrop = false,
  disabled = false,
  offset = 8,
  className = '',
  contentClassName = '',
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: -9999, left: -9999 }); // Start off-screen
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);

  const variantClasses = {
    primary: {
      background: 'bg-cyan-900/95 border-cyan-400',
      glow: 'shadow-[0_0_25px_rgba(34,211,238,0.6)]',
      accent: 'bg-cyan-400',
      arrow: 'border-cyan-400',
    },
    secondary: {
      background: 'bg-purple-900/95 border-purple-400',
      glow: 'shadow-[0_0_25px_rgba(168,85,247,0.6)]',
      accent: 'bg-purple-400',
      arrow: 'border-purple-400',
    },
    danger: {
      background: 'bg-red-900/95 border-red-400',
      glow: 'shadow-[0_0_25px_rgba(239,68,68,0.6)]',
      accent: 'bg-red-400',
      arrow: 'border-red-400',
    },
    success: {
      background: 'bg-green-900/95 border-green-400',
      glow: 'shadow-[0_0_25px_rgba(34,197,94,0.6)]',
      accent: 'bg-green-400',
      arrow: 'border-green-400',
    },
    warning: {
      background: 'bg-orange-900/95 border-orange-400',
      glow: 'shadow-[0_0_25px_rgba(251,146,60,0.6)]',
      accent: 'bg-orange-400',
      arrow: 'border-orange-400',
    },
    neutral: {
      background: 'bg-slate-800/95 border-slate-400',
      glow: 'shadow-[0_0_25px_rgba(148,163,184,0.6)]',
      accent: 'bg-slate-400',
      arrow: 'border-slate-400',
    },
  };

  const sizeClasses = {
    sm: 'max-w-xs p-3 text-sm',
    md: 'max-w-sm p-4 text-base',
    lg: 'max-w-md p-5 text-lg',
  };

  const styles = variantClasses[variant];
  const sizeClass = sizeClasses[size];

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'top':
        top = triggerRect.top + scrollY - popoverRect.height - offset;
        left = triggerRect.left + scrollX + (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'top-start':
        top = triggerRect.top + scrollY - popoverRect.height - offset;
        left = triggerRect.left + scrollX;
        break;
      case 'top-end':
        top = triggerRect.top + scrollY - popoverRect.height - offset;
        left = triggerRect.right + scrollX - popoverRect.width;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollY + offset;
        left = triggerRect.left + scrollX + (triggerRect.width - popoverRect.width) / 2;
        break;
      case 'bottom-start':
        top = triggerRect.bottom + scrollY + offset;
        left = triggerRect.left + scrollX;
        break;
      case 'bottom-end':
        top = triggerRect.bottom + scrollY + offset;
        left = triggerRect.right + scrollX - popoverRect.width;
        break;
      case 'left':
        top = triggerRect.top + scrollY + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.left + scrollX - popoverRect.width - offset;
        break;
      case 'right':
        top = triggerRect.top + scrollY + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.right + scrollX + offset;
        break;
    }

    // Keep within viewport bounds
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 0) left = 8;
    if (left + popoverRect.width > viewportWidth) left = viewportWidth - popoverRect.width - 8;
    if (top < scrollY) top = scrollY + 8;
    if (top + popoverRect.height > scrollY + viewportHeight) top = scrollY + viewportHeight - popoverRect.height - 8;

    setPopoverPosition({ top, left });
  }, [placement, offset]);

  const handleOpen = () => {
    console.log('handleOpen called, disabled:', disabled);
    if (disabled) return;
    setIsOpen(true);
    
    // Set initial position near the trigger immediately
    if (triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      
      console.log('Setting initial position near trigger:', { 
        triggerRect, 
        scrollY, 
        scrollX 
      });
      
      // Set a rough initial position to prevent flashing
      setPopoverPosition({
        top: triggerRect.bottom + scrollY + 8,
        left: triggerRect.left + scrollX
      });
    }
    
    onOpenChange?.(true);
  };

  const handleClose = useCallback(() => {
    console.log('handleClose called');
    setIsOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      handleOpen();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      timeoutRef.current = setTimeout(handleClose, 150);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    console.log('Popover handleClick called, trigger:', trigger, 'isOpen:', isOpen);
    if (trigger === 'click') {
      e.stopPropagation(); // Prevent event bubbling
      if (isOpen) {
        handleClose();
      } else {
        handleOpen();
      }
    }
  };

  const handleFocus = () => {
    if (trigger === 'focus') {
      handleOpen();
    }
  };

  const handleBlur = () => {
    if (trigger === 'focus') {
      handleClose();
    }
  };

  const handleBackdropClick = () => {
    if (backdrop) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Multiple attempts to ensure proper positioning
      const timers = [
        setTimeout(calculatePosition, 0),
        setTimeout(calculatePosition, 10),
        setTimeout(calculatePosition, 50),
      ];
      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [isOpen, content, calculatePosition]);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) calculatePosition();
    };

    const handleResize = () => {
      if (isOpen) calculatePosition();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        trigger === 'click' &&
        isOpen &&
        triggerRef.current &&
        popoverRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, trigger, calculatePosition, handleClose]);

  const renderCornerAccents = () => {
    if (!corners) return null;
    return (
      <>
        <div className={`absolute -top-0.5 -left-0.5 w-2 h-2 ${styles.accent} opacity-80`} 
             style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
        <div className={`absolute -top-0.5 -right-0.5 w-2 h-2 ${styles.accent} opacity-80`} 
             style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
        <div className={`absolute -bottom-0.5 -left-0.5 w-2 h-2 ${styles.accent} opacity-80`} 
             style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }} />
        <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 ${styles.accent} opacity-80`} 
             style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
      </>
    );
  };

  const renderScanlines = () => {
    if (!scanlines) return null;
    return (
      <div className="absolute inset-0 overflow-hidden rounded">
        <div 
          className="w-full h-full opacity-10"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              ${styles.accent.replace('bg-', 'rgba(')}40 2px,
              ${styles.accent.replace('bg-', 'rgba(')}40 4px
            )`
          }}
        />
      </div>
    );
  };

  const renderArrow = () => {
    if (!arrow) return null;

    const arrowClasses = `absolute w-0 h-0 ${styles.arrow}`;
    
    switch (placement) {
      case 'top':
      case 'top-start':
      case 'top-end':
        return (
          <div 
            className={`${arrowClasses} border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent`}
            style={{ 
              bottom: '-8px',
              left: placement === 'top-start' ? '16px' : placement === 'top-end' ? 'calc(100% - 32px)' : '50%',
              transform: placement === 'top' ? 'translateX(-50%)' : 'none'
            }}
          />
        );
      case 'bottom':
      case 'bottom-start':
      case 'bottom-end':
        return (
          <div 
            className={`${arrowClasses} border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent`}
            style={{ 
              top: '-8px',
              left: placement === 'bottom-start' ? '16px' : placement === 'bottom-end' ? 'calc(100% - 32px)' : '50%',
              transform: placement === 'bottom' ? 'translateX(-50%)' : 'none'
            }}
          />
        );
      case 'left':
        return (
          <div 
            className={`${arrowClasses} border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent`}
            style={{ 
              right: '-8px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />
        );
      case 'right':
        return (
          <div 
            className={`${arrowClasses} border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent`}
            style={{ 
              left: '-8px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />
        );
      default:
        return null;
    }
  };

  const popoverContent = isOpen && (
    <>
      {backdrop && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={handleBackdropClick}
        />
      )}
      <div
        ref={popoverRef}
        className={`
          fixed z-50 font-mono border-2 backdrop-blur-sm rounded-lg
          ${styles.background}
          ${sizeClass}
          ${glow ? styles.glow : ''}
          ${animated ? 'animate-in fade-in-0 zoom-in-95 duration-200' : ''}
          ${contentClassName}
          ${popoverPosition.top === -9999 ? 'invisible' : 'visible'}
        `}
        style={{
          top: `${popoverPosition.top}px`,
          left: `${popoverPosition.left}px`,
        }}
        onMouseEnter={trigger === 'hover' ? handleMouseEnter : undefined}
        onMouseLeave={trigger === 'hover' ? handleMouseLeave : undefined}
      >
        {renderArrow()}
        {renderCornerAccents()}
        {renderScanlines()}
        
        <div className="relative z-10 text-gray-100">
          {content}
        </div>
      </div>
    </>
  );

  return (
    <>
      <div
        ref={triggerRef}
        className={`inline-block ${className}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={trigger === 'focus' ? 0 : undefined}
      >
        {children}
      </div>
      
      {typeof document !== 'undefined' && createPortal(
        popoverContent,
        document.body
      )}
    </>
  );
};

export default Popover;
export { Popover };