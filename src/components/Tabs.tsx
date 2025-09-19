import React, { useState, useRef, useEffect } from 'react';

export interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'neutral';
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  glow?: boolean;
  corners?: boolean;
  scanlines?: boolean;
  activator?: 'click' | 'hover';
  className?: string;
}

export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export interface TabsTriggerProps {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
  className?: string;
}

export interface TabsContentProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
  variant: string;
  orientation: string;
  size: string;
  animated: boolean;
  glow: boolean;
  corners: boolean;
  scanlines: boolean;
  activator: string;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};

// Main Tabs container
const Tabs: React.FC<TabsProps> = ({
  children,
  defaultValue = '',
  value: controlledValue,
  onValueChange,
  variant = 'primary',
  orientation = 'horizontal',
  size = 'md',
  animated = true,
  glow = false,
  corners = false,
  scanlines = false,
  activator = 'click',
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const contextValue: TabsContextType = {
    value,
    onValueChange: handleValueChange,
    variant,
    orientation,
    size,
    animated,
    glow,
    corners,
    scanlines,
    activator,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        className={`
          tabs-root
          ${orientation === 'vertical' ? 'flex' : ''}
          ${className}
        `}
        data-orientation={orientation}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// TabsList component
const TabsList: React.FC<TabsListProps> = ({ children, className = '' }) => {
  const { orientation, variant, glow, corners, scanlines } = useTabsContext();
  const [activeIndicator, setActiveIndicator] = useState({ width: 0, left: 0, top: 0, height: 0 });
  const listRef = useRef<HTMLDivElement>(null);

  const variantStyles = {
    primary: {
      background: 'bg-blue-900/20 border-cyan-400/30',
      glow: 'shadow-[0_0_20px_rgba(34,211,238,0.3)]',
    },
    secondary: {
      background: 'bg-purple-900/20 border-purple-400/30',
      glow: 'shadow-[0_0_20px_rgba(168,85,247,0.3)]',
    },
    danger: {
      background: 'bg-red-900/20 border-red-400/30',
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]',
    },
    success: {
      background: 'bg-green-900/20 border-green-400/30',
      glow: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]',
    },
    warning: {
      background: 'bg-orange-900/20 border-orange-400/30',
      glow: 'shadow-[0_0_20px_rgba(251,146,60,0.3)]',
    },
    neutral: {
      background: 'bg-slate-800/20 border-slate-400/30',
      glow: 'shadow-[0_0_20px_rgba(148,163,184,0.3)]',
    },
  };

  const styles = variantStyles[variant as keyof typeof variantStyles];

  useEffect(() => {
    const updateIndicator = () => {
      if (!listRef.current) return;
      
      const activeTab = listRef.current.querySelector('[data-state="active"]') as HTMLElement;
      if (activeTab) {
        const listRect = listRef.current.getBoundingClientRect();
        const activeRect = activeTab.getBoundingClientRect();
        
        setActiveIndicator({
          width: activeRect.width,
          height: activeRect.height,
          left: activeRect.left - listRect.left,
          top: activeRect.top - listRect.top,
        });
      }
    };

    updateIndicator();
    
    // Update on window resize
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  });

  return (
    <div
      ref={listRef}
      className={`
        relative
        ${orientation === 'horizontal' ? 'flex' : 'flex flex-col'}
        ${orientation === 'horizontal' ? 'w-full' : 'min-h-full'}
        border-2 backdrop-blur-sm rounded-lg p-1
        ${styles.background}
        ${glow ? styles.glow : ''}
        ${className}
      `}
      role="tablist"
      aria-orientation={orientation as 'horizontal' | 'vertical'}
    >
      {/* Active indicator */}
      <div
        className={`
          absolute transition-all duration-300 ease-out rounded-md
          bg-gradient-to-r from-cyan-500/20 to-blue-500/20
          border border-cyan-400/50
          ${glow ? 'shadow-[0_0_15px_rgba(34,211,238,0.5)]' : ''}
        `}
        style={{
          width: orientation === 'horizontal' ? `${activeIndicator.width}px` : '100%',
          height: orientation === 'vertical' ? `${activeIndicator.height}px` : '100%',
          transform: orientation === 'horizontal' 
            ? `translateX(${activeIndicator.left}px)` 
            : `translateY(${activeIndicator.top}px)`,
        }}
      />

      {/* Corner accents */}
      {corners && (
        <>
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
        </>
      )}

      {/* Scanlines */}
      {scanlines && (
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none rounded-lg"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(34, 211, 238, 0.1) 2px,
              rgba(34, 211, 238, 0.1) 4px
            )`
          }}
        />
      )}

      {children}
    </div>
  );
};

// TabsTrigger component
const TabsTrigger: React.FC<TabsTriggerProps> = ({ 
  children, 
  value, 
  disabled = false, 
  className = '' 
}) => {
  const { 
    value: selectedValue, 
    onValueChange, 
    variant, 
    size, 
    animated, 
    glow,
    activator 
  } = useTabsContext();
  
  const isActive = selectedValue === value;

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const variantStyles = {
    primary: {
      active: 'text-cyan-400',
      inactive: 'text-cyan-300/70 hover:text-cyan-300',
    },
    secondary: {
      active: 'text-purple-400',
      inactive: 'text-purple-300/70 hover:text-purple-300',
    },
    danger: {
      active: 'text-red-400',
      inactive: 'text-red-300/70 hover:text-red-300',
    },
    success: {
      active: 'text-green-400',
      inactive: 'text-green-300/70 hover:text-green-300',
    },
    warning: {
      active: 'text-orange-400',
      inactive: 'text-orange-300/70 hover:text-orange-300',
    },
    neutral: {
      active: 'text-slate-300',
      inactive: 'text-slate-400/70 hover:text-slate-300',
    },
  };

  const styles = variantStyles[variant as keyof typeof variantStyles];
  const sizeClass = sizeStyles[size as keyof typeof sizeStyles];

  const handleInteraction = () => {
    if (!disabled) {
      onValueChange(value);
    }
  };

  return (
    <button
      className={`
        relative z-10
        ${sizeClass}
        font-mono font-medium tracking-wide
        transition-all duration-200
        ${isActive ? styles.active : styles.inactive}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${animated && !disabled ? 'transform hover:scale-105 active:scale-95' : ''}
        ${glow && isActive ? 'text-shadow-glow' : ''}
        whitespace-nowrap
        ${className}
      `}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      tabIndex={isActive ? 0 : -1}
      data-state={isActive ? 'active' : 'inactive'}
      disabled={disabled}
      onClick={activator === 'click' ? handleInteraction : undefined}
      onMouseEnter={activator === 'hover' ? handleInteraction : undefined}
    >
      {/* Holographic effect for active tab */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-pulse" />
      )}
      
      {children}

      {/* Active tab indicator dots */}
      {isActive && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
          <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
          <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      )}
    </button>
  );
};

// TabsContent component
const TabsContent: React.FC<TabsContentProps> = ({ 
  children, 
  value, 
  className = '' 
}) => {
  const { value: selectedValue, animated } = useTabsContext();
  const isActive = selectedValue === value;

  if (!isActive) return null;

  return (
    <div
      className={`
        tabs-content
        ${animated ? 'animate-in fade-in-0 slide-in-from-bottom-2 duration-200' : ''}
        ${className}
      `}
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

// Export all components
export { Tabs, TabsList, TabsTrigger, TabsContent };
export default Tabs;