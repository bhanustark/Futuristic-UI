import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

// Holographic Tabs with 3D projection effects
interface HolographicTabsProps {
  tabs: Array<{
    value: string;
    label: string;
    content: React.ReactNode;
  }>;
  defaultValue?: string;
  glitchEffect?: boolean;
  projectionLines?: boolean;
  hologramFlicker?: boolean;
  className?: string;
}

export const HolographicTabs: React.FC<HolographicTabsProps> = ({
  tabs,
  defaultValue,
  glitchEffect = true,
  projectionLines = true,
  hologramFlicker = true,
  className = '',
}) => {
  const [currentValue, setCurrentValue] = useState(defaultValue || tabs[0]?.value || '');

  return (
    <div className={`relative ${className}`}>
      {/* Holographic projection overlay */}
      {projectionLines && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`absolute h-px bg-cyan-500 animate-pulse`}
                style={{
                  top: `${(i + 1) * 12.5}%`,
                  left: '0',
                  right: '0',
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s',
                }}
              />
            ))}
          </div>
        </div>
      )}

      <Tabs
        value={currentValue}
        onValueChange={setCurrentValue}
        variant="primary"
        glow
        animated
        corners
      >
        <TabsList className="relative bg-black/30 border-cyan-500/50">
          {/* Holographic shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent translate-x-[-100%] animate-[shimmer_3s_infinite] rounded-lg" />
          
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.value} 
              value={tab.value}
              className={`
                relative z-10
                ${hologramFlicker ? 'animate-pulse' : ''}
                ${glitchEffect && currentValue === tab.value ? 'animate-bounce' : ''}
              `}
            >
              <span className="relative">
                {tab.label}
                
                {/* Glitch effect for active tab */}
                {glitchEffect && currentValue === tab.value && (
                  <>
                    <span className="absolute inset-0 text-cyan-300 animate-pulse" style={{ animationDelay: '0.1s' }}>
                      {tab.label}
                    </span>
                    <span className="absolute inset-0 text-blue-300 animate-pulse" style={{ animationDelay: '0.2s' }}>
                      {tab.label}
                    </span>
                  </>
                )}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            <div className="relative">
              {/* Content projection effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/5 via-transparent to-cyan-500/5 rounded-lg animate-pulse" />
              <div className="relative bg-black/20 rounded-lg border border-cyan-500/30 p-6">
                {tab.content}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

// Data Tabs with streaming data visualization
interface DataTabsProps {
  tabs: Array<{
    value: string;
    label: string;
    content: React.ReactNode;
    dataPoints?: number;
    status?: 'active' | 'loading' | 'error' | 'success';
  }>;
  defaultValue?: string;
  showDataStream?: boolean;
  realtimeUpdates?: boolean;
  className?: string;
}

export const DataTabs: React.FC<DataTabsProps> = ({
  tabs,
  defaultValue,
  showDataStream = true,
  realtimeUpdates = true,
  className = '',
}) => {
  const [currentValue, setCurrentValue] = useState(defaultValue || tabs[0]?.value || '');

  const getStatusColor = (status: string = 'active') => {
    switch (status) {
      case 'loading': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'success': return 'text-green-400';
      default: return 'text-cyan-400';
    }
  };

  const getStatusIcon = (status: string = 'active') => {
    switch (status) {
      case 'loading': return '⟳';
      case 'error': return '⚠';
      case 'success': return '✓';
      default: return '●';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Tabs
        value={currentValue}
        onValueChange={setCurrentValue}
        variant="secondary"
        glow
        animated
      >
        <TabsList className="bg-black/40 border-purple-500/30">
          {tabs.map((tab) => {
            const isActive = currentValue === tab.value;
            const statusColor = getStatusColor(tab.status);
            const statusIcon = getStatusIcon(tab.status);

            return (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className="relative"
              >
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${statusColor} ${realtimeUpdates ? 'animate-pulse' : ''}`}>
                    {statusIcon}
                  </span>
                  <span>{tab.label}</span>
                  {tab.dataPoints !== undefined && (
                    <span className="text-xs text-purple-300 font-mono">
                      ({tab.dataPoints})
                    </span>
                  )}
                </div>

                {/* Data stream visualization for active tab */}
                {isActive && showDataStream && (
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 bg-purple-400 rounded-full animate-pulse`}
                        style={{
                          height: `${Math.random() * 8 + 4}px`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: '1s',
                        }}
                      />
                    ))}
                  </div>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            <div className="relative">
              {/* Data stream background */}
              {showDataStream && (
                <div className="absolute top-0 right-0 w-32 h-16 opacity-10">
                  <div className="grid grid-cols-8 h-full gap-px">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-purple-400 animate-pulse rounded-sm"
                        style={{
                          animationDelay: `${(i * 50) % 2000}ms`,
                          animationDuration: '2s',
                          opacity: Math.random() * 0.5 + 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-black/30 rounded-lg border border-purple-500/30 p-6">
                {tab.content}
                
                {/* Real-time data indicator */}
                {realtimeUpdates && (
                  <div className="flex items-center justify-end mt-4 text-xs text-purple-300">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse mr-2" />
                    Live Data
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

// Terminal Tabs with command-line interface styling
interface TerminalTabsProps {
  tabs: Array<{
    value: string;
    label: string;
    content: React.ReactNode;
    prompt?: string;
    status?: 'connected' | 'disconnected' | 'error';
  }>;
  defaultValue?: string;
  showPrompt?: boolean;
  terminalTheme?: 'green' | 'amber' | 'cyan';
  className?: string;
}

export const TerminalTabs: React.FC<TerminalTabsProps> = ({
  tabs,
  defaultValue,
  showPrompt = true,
  terminalTheme = 'green',
  className = '',
}) => {
  const [currentValue, setCurrentValue] = useState(defaultValue || tabs[0]?.value || '');

  const themeColors = {
    green: {
      primary: 'text-green-400',
      secondary: 'text-green-300',
      border: 'border-green-500/30',
      bg: 'bg-green-900/10',
      glow: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]',
    },
    amber: {
      primary: 'text-amber-400',
      secondary: 'text-amber-300',
      border: 'border-amber-500/30',
      bg: 'bg-amber-900/10',
      glow: 'shadow-[0_0_20px_rgba(251,191,36,0.3)]',
    },
    cyan: {
      primary: 'text-cyan-400',
      secondary: 'text-cyan-300',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-900/10',
      glow: 'shadow-[0_0_20px_rgba(34,211,238,0.3)]',
    },
  };

  const theme = themeColors[terminalTheme];

  const getStatusSymbol = (status: string = 'connected') => {
    switch (status) {
      case 'disconnected': return '○';
      case 'error': return '✕';
      default: return '●';
    }
  };

  const getStatusColor = (status: string = 'connected') => {
    switch (status) {
      case 'disconnected': return 'text-gray-500';
      case 'error': return 'text-red-400';
      default: return theme.primary;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Tabs
        value={currentValue}
        onValueChange={setCurrentValue}
        variant="success"
        glow
        animated
      >
        <TabsList className={`bg-black/80 ${theme.border} ${theme.glow} font-mono`}>
          {tabs.map((tab) => {
            const statusColor = getStatusColor(tab.status);
            const statusSymbol = getStatusSymbol(tab.status);

            return (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className={`${theme.secondary} hover:${theme.primary}`}
              >
                <div className="flex items-center space-x-2">
                  <span className={`${statusColor} animate-pulse`}>
                    {statusSymbol}
                  </span>
                  {showPrompt && tab.prompt && (
                    <span className={`text-xs ${theme.secondary}`}>
                      {tab.prompt}
                    </span>
                  )}
                  <span>{tab.label}</span>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            <div className={`bg-black/90 rounded-lg ${theme.border} p-4 font-mono text-sm ${theme.bg}`}>
              {/* Terminal header */}
              <div className={`flex items-center justify-between pb-2 border-b ${theme.border} mb-4`}>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className={`${theme.secondary} text-xs`}>
                    Terminal - {tab.label}
                  </span>
                </div>
                <div className={`${getStatusColor(tab.status)} text-xs flex items-center space-x-1`}>
                  <span>{getStatusSymbol(tab.status)}</span>
                  <span>{tab.status || 'connected'}</span>
                </div>
              </div>

              {/* Terminal content */}
              <div className={`${theme.secondary}`}>
                {tab.content}
              </div>

              {/* Blinking cursor */}
              <div className="flex items-center mt-2">
                <span className={`${theme.primary} mr-2`}>
                  {tab.prompt || '$'}
                </span>
                <div className={`w-2 h-4 ${theme.primary.replace('text-', 'bg-')} animate-pulse`} />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

// Circuit Tabs with electronic circuit styling
interface CircuitTabsProps {
  tabs: Array<{
    value: string;
    label: string;
    content: React.ReactNode;
    circuitActive?: boolean;
    powerLevel?: number;
  }>;
  defaultValue?: string;
  showCircuits?: boolean;
  animateCircuits?: boolean;
  className?: string;
}

export const CircuitTabs: React.FC<CircuitTabsProps> = ({
  tabs,
  defaultValue,
  showCircuits = true,
  animateCircuits = true,
  className = '',
}) => {
  const [currentValue, setCurrentValue] = useState(defaultValue || tabs[0]?.value || '');

  return (
    <div className={`relative ${className}`}>
      {/* Circuit background pattern */}
      {showCircuits && (
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 200 100">
            <defs>
              <pattern id="circuit" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="#22d3ee" opacity="0.6">
                  {animateCircuits && <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />}
                </circle>
                <line x1="20" y1="0" x2="20" y2="18" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
                <line x1="20" y1="22" x2="20" y2="40" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
                <line x1="0" y1="20" x2="18" y2="20" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
                <line x1="22" y1="20" x2="40" y2="20" stroke="#22d3ee" strokeWidth="1" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>
      )}

      <Tabs
        value={currentValue}
        onValueChange={setCurrentValue}
        variant="primary"
        glow
        animated
        corners
      >
        <TabsList className="bg-black/50 border-cyan-500/40 relative overflow-hidden">
          {/* Circuit connection lines */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
          
          {tabs.map((tab, index) => {
            const isActive = currentValue === tab.value;
            const powerLevel = tab.powerLevel || 100;

            return (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className="relative"
              >
                <div className="flex items-center space-x-2">
                  {/* Circuit node */}
                  <div className="relative">
                    <div className={`w-3 h-3 rounded-full border-2 ${
                      isActive ? 'border-cyan-400 bg-cyan-400/30' : 'border-cyan-600 bg-transparent'
                    } ${tab.circuitActive ? 'animate-pulse' : ''}`} />
                    
                    {/* Power level indicator */}
                    {isActive && (
                      <div className="absolute -inset-1 rounded-full border border-cyan-400/50 animate-ping" />
                    )}
                  </div>
                  
                  <span>{tab.label}</span>
                  
                  {/* Power level display */}
                  <span className="text-xs text-cyan-300 font-mono">
                    {powerLevel}%
                  </span>
                </div>

                {/* Connection line to next tab */}
                {index < tabs.length - 1 && (
                  <div className="absolute top-1/2 -right-4 w-8 h-px bg-cyan-500/30 transform -translate-y-1/2">
                    {animateCircuits && (
                      <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
                    )}
                  </div>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            <div className="relative bg-black/30 rounded-lg border border-cyan-500/30 p-6">
              {/* Circuit corner decorations */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400/60" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400/60" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400/60" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400/60" />

              {tab.content}

              {/* Power status indicator */}
              <div className="absolute top-4 right-4 flex items-center space-x-2 text-xs text-cyan-300">
                <div className={`w-2 h-2 rounded-full ${
                  tab.circuitActive ? 'bg-green-400 animate-pulse' : 'bg-gray-500'
                }`} />
                <span>{tab.circuitActive ? 'ACTIVE' : 'STANDBY'}</span>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};