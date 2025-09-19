import React from 'react';
import { Popover } from './Popover';
import type { PopoverProps } from './Popover';

// Info Popover with data visualization styling
interface InfoPopoverProps extends Omit<PopoverProps, 'variant' | 'content'> {
  title?: string;
  info: string | string[];
}

export const InfoPopover: React.FC<InfoPopoverProps> = ({
  title,
  info,
  children,
  ...props
}) => {
  const infoArray = Array.isArray(info) ? info : [info];
  
  const content = (
    <div className="space-y-3">
      {title && (
        <h4 className="text-cyan-400 font-semibold text-sm flex items-center">
          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
          {title}
        </h4>
      )}
      <div className="space-y-2">
        {infoArray.map((item, index) => (
          <div key={index} className="flex items-start space-x-2 text-sm">
            <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-300">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Popover
      variant="secondary"
      content={content}
      {...props}
    >
      {children}
    </Popover>
  );
};

// Alert Popover with warning/danger styling
interface AlertPopoverProps extends Omit<PopoverProps, 'variant' | 'content'> {
  type: 'warning' | 'danger' | 'success';
  title: string;
  message: string;
  actions?: React.ReactNode;
}

export const AlertPopover: React.FC<AlertPopoverProps> = ({
  type,
  title,
  message,
  actions,
  children,
  ...props
}) => {
  const typeConfig = {
    warning: {
      icon: '⚠',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/30',
      glowColor: 'shadow-yellow-400/20'
    },
    danger: {
      icon: '⚡',
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
      borderColor: 'border-red-400/30',
      glowColor: 'shadow-red-400/20'
    },
    success: {
      icon: '✓',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/30',
      glowColor: 'shadow-green-400/20'
    }
  };

  const config = typeConfig[type];

  const content = (
    <div className="space-y-4">
      <div className={`p-3 rounded ${config.bgColor} border ${config.borderColor} ${config.glowColor} shadow-lg`}>
        <div className="flex items-center space-x-2 mb-2">
          <span className={`text-lg ${config.color}`}>{config.icon}</span>
          <h4 className={`font-semibold ${config.color}`}>{title}</h4>
        </div>
        <p className="text-gray-300 text-sm">{message}</p>
      </div>
      {actions && (
        <div className="flex justify-end space-x-2">
          {actions}
        </div>
      )}
    </div>
  );

  return (
    <Popover
      variant={type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'danger'}
      content={content}
      corners
      {...props}
    >
      {children}
    </Popover>
  );
};

// Hologram Popover with advanced sci-fi effects
interface HologramPopoverProps extends Omit<PopoverProps, 'variant'> {
  glitchEffect?: boolean;
  scanlines?: boolean;
}

export const HologramPopover: React.FC<HologramPopoverProps> = ({
  glitchEffect = true,
  scanlines = true,
  children,
  content,
  ...props
}) => {
  const enhancedContent = (
    <div className="relative">
      {/* Holographic grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 h-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              key={i}
              className="border border-cyan-500 animate-pulse"
              style={{
                animationDelay: `${(i * 50) % 2000}ms`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Scanlines effect */}
      {scanlines && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full w-full opacity-20"
               style={{
                 backgroundImage: `repeating-linear-gradient(
                   0deg,
                   transparent,
                   transparent 2px,
                   rgba(34, 211, 238, 0.1) 2px,
                   rgba(34, 211, 238, 0.1) 4px
                 )`
               }} />
        </div>
      )}

      {/* Content with glitch effect */}
      <div className={`relative z-10 ${glitchEffect ? 'animate-pulse' : ''}`}>
        {content}
      </div>

      {/* Holographic shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent 
                      translate-x-[-100%] animate-[shimmer_2s_infinite]" />
    </div>
  );

  return (
    <Popover
      variant="primary"
      content={enhancedContent}
      corners
      glow
      {...props}
    >
      {children}
    </Popover>
  );
};

// Data Stream Popover for real-time information
interface DataStreamPopoverProps extends Omit<PopoverProps, 'variant' | 'content'> {
  title: string;
  data: { label: string; value: string | number; status?: 'online' | 'offline' | 'warning' }[];
  streaming?: boolean;
}

export const DataStreamPopover: React.FC<DataStreamPopoverProps> = ({
  title,
  data,
  streaming = true,
  children,
  ...props
}) => {
  const content = (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
        <h4 className="text-cyan-400 font-semibold flex items-center">
          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
          {title}
        </h4>
        {streaming && (
          <div className="flex items-center text-xs text-green-400">
            <div className="w-1 h-1 bg-green-400 rounded-full mr-1 animate-pulse"></div>
            LIVE
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-1">
            <span className="text-gray-400 text-sm">{item.label}</span>
            <div className="flex items-center space-x-2">
              <span className="text-white font-mono text-sm">{item.value}</span>
              {item.status && (
                <div className={`w-2 h-2 rounded-full ${
                  item.status === 'online' ? 'bg-green-400' :
                  item.status === 'warning' ? 'bg-yellow-400' :
                  'bg-red-400'
                } ${streaming ? 'animate-pulse' : ''}`} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Data stream visualization */}
      {streaming && (
        <div className="border-t border-cyan-500/30 pt-2">
          <div className="flex items-center space-x-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-1 h-4 bg-cyan-400/30 animate-pulse"
                style={{
                  animationDelay: `${i * 100}ms`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Popover
      variant="primary"
      content={content}
      corners
      {...props}
    >
      {children}
    </Popover>
  );
};

// Terminal Popover for command-line style interactions
interface TerminalPopoverProps extends Omit<PopoverProps, 'variant' | 'content'> {
  commands: string[];
  prompt?: string;
  onCommand?: (command: string) => void;
}

export const TerminalPopover: React.FC<TerminalPopoverProps> = ({
  commands,
  prompt = '$',
  children,
  ...props
}) => {
  const content = (
    <div className="font-mono text-sm">
      <div className="bg-black/50 p-3 rounded border border-green-400/30">
        <div className="space-y-1">
          {commands.map((command, index) => (
            <div key={index} className="flex items-start space-x-2">
              <span className="text-green-400 flex-shrink-0">{prompt}</span>
              <span className="text-gray-300">{command}</span>
            </div>
          ))}
          
          {/* Blinking cursor */}
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-green-400">{prompt}</span>
            <div className="w-2 h-4 bg-green-400 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Popover
      variant="success"
      content={content}
      corners
      {...props}
    >
      {children}
    </Popover>
  );
};