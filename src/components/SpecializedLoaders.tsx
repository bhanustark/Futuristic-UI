import React, { useEffect, useState, useRef } from "react";

interface CircuitLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  speed?: 'slow' | 'medium' | 'fast';
  text?: string;
  className?: string;
}

export const CircuitLoader: React.FC<CircuitLoaderProps> = ({
  size = 'md',
  color = 'primary',
  speed = 'medium',
  text = 'Processing...',
  className = '',
}) => {
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const intervalRef = useRef<number | null>(null);

  const colorClasses = {
    primary: 'text-cyan-400 border-cyan-400',
    secondary: 'text-purple-400 border-purple-400',
    danger: 'text-red-400 border-red-400',
    success: 'text-green-400 border-green-400',
  };

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  useEffect(() => {
    const speedSettings = {
      slow: 800,
      medium: 500,
      fast: 300,
    };

    const animateNodes = () => {
      const nodeCount = 8;
      const newActiveNodes = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () =>
        Math.floor(Math.random() * nodeCount)
      );
      setActiveNodes(newActiveNodes);
    };

    intervalRef.current = window.setInterval(animateNodes, speedSettings[speed]);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [speed]);

  const nodes = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 45) * (Math.PI / 180);
    const radius = size === 'sm' ? 28 : size === 'md' ? 40 : 56;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    return { x, y, active: activeNodes.includes(i) };
  });

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className={`${sizeClasses[size]} relative ${colorClasses[color]}`}>
        <svg className="w-full h-full" viewBox="-64 -64 128 128">
          {/* Connection lines */}
          {nodes.map((node, i) => (
            <g key={`connections-${i}`}>
              {nodes.slice(i + 1).map((otherNode, j) => (
                <line
                  key={`line-${i}-${j}`}
                  x1={node.x}
                  y1={node.y}
                  x2={otherNode.x}
                  y2={otherNode.y}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              ))}
            </g>
          ))}
          
          {/* Central core */}
          <circle
            cx="0"
            cy="0"
            r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.6"
          >
            <animate
              attributeName="r"
              values="6;10;6"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Nodes */}
          {nodes.map((node, i) => (
            <circle
              key={`node-${i}`}
              cx={node.x}
              cy={node.y}
              r={node.active ? "4" : "2"}
              fill="currentColor"
              opacity={node.active ? "1" : "0.4"}
              className={node.active ? "drop-shadow-[0_0_8px_currentColor]" : ""}
            >
              {node.active && (
                <animate
                  attributeName="r"
                  values="2;6;2"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              )}
            </circle>
          ))}
          
          {/* Data pulses */}
          {activeNodes.map((nodeIndex, i) => (
            <circle
              key={`pulse-${nodeIndex}-${i}`}
              r="1"
              fill="currentColor"
              opacity="0.8"
            >
              <animateMotion
                dur="2s"
                repeatCount="indefinite"
                path={`M${nodes[nodeIndex].x},${nodes[nodeIndex].y} L0,0`}
              />
            </circle>
          ))}
        </svg>
      </div>
      
      <span className={`font-mono text-sm ${colorClasses[color].split(' ')[0]} animate-pulse tracking-wide`}>
        {text}
      </span>
    </div>
  );
};

interface DataStreamLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  lines?: number;
  text?: string;
  className?: string;
}

export const DataStreamLoader: React.FC<DataStreamLoaderProps> = ({
  size = 'md',
  color = 'primary',
  lines = 5,
  text = 'Streaming data...',
  className = '',
}) => {
  const [streamData, setStreamData] = useState<string[][]>([]);

  const colorClasses = {
    primary: 'text-cyan-400',
    secondary: 'text-purple-400',
    danger: 'text-red-400',
    success: 'text-green-400',
  };

  const sizeClasses = {
    sm: 'text-xs w-32',
    md: 'text-sm w-48',
    lg: 'text-base w-64',
  };

  const characters = '01ABCDEF';

  useEffect(() => {
    const generateStream = () => {
      const newStreamData = Array.from({ length: lines }, () =>
        Array.from({ length: size === 'sm' ? 16 : size === 'md' ? 24 : 32 }, () =>
          characters[Math.floor(Math.random() * characters.length)]
        )
      );
      setStreamData(newStreamData);
    };

    generateStream();
    const interval = setInterval(generateStream, 150);

    return () => clearInterval(interval);
  }, [lines, size]);

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className={`${sizeClasses[size]} ${colorClasses[color]} font-mono`}>
        <div className="border border-current p-3 bg-black/50 backdrop-blur-sm">
          {streamData.map((line, lineIndex) => (
            <div
              key={lineIndex}
              className="flex opacity-80"
              style={{ animationDelay: `${lineIndex * 0.1}s` }}
            >
              <span className="text-current/40 mr-2">{lineIndex.toString().padStart(2, '0')}:</span>
              {line.map((char, charIndex) => (
                <span
                  key={`${lineIndex}-${charIndex}`}
                  className={`
                    transition-all duration-100
                    ${Math.random() > 0.7 ? 'text-current drop-shadow-[0_0_4px_currentColor]' : 'text-current/60'}
                  `}
                  style={{ animationDelay: `${charIndex * 0.02}s` }}
                >
                  {char}
                </span>
              ))}
            </div>
          ))}
          
          {/* Cursor */}
          <div className="flex mt-1">
            <span className="text-current/40 mr-2">&gt;</span>
            <span className="text-current animate-pulse">_</span>
          </div>
        </div>
      </div>
      
      <span className={`font-mono text-sm ${colorClasses[color]} animate-pulse tracking-wide`}>
        {text}
      </span>
    </div>
  );
};

interface HolographicLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  text?: string;
  className?: string;
}

export const HolographicLoader: React.FC<HolographicLoaderProps> = ({
  size = 'md',
  color = 'primary',
  text = 'Projecting...',
  className = '',
}) => {
  const colorClasses = {
    primary: 'text-cyan-400 border-cyan-400',
    secondary: 'text-purple-400 border-purple-400',
    danger: 'text-red-400 border-red-400',
    success: 'text-green-400 border-green-400',
  };

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className={`${sizeClasses[size]} relative ${colorClasses[color]}`}>
        {/* Holographic projection base */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-current opacity-60 rounded-b-full" />
        
        {/* Main hologram */}
        <div className="absolute inset-0 border-2 border-current rounded-full opacity-60 animate-pulse">
          <div className="absolute inset-2 border border-current rounded-full opacity-80 animate-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="absolute inset-4 border border-current rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0.6s' }} />
        </div>
        
        {/* Scanning lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-0.5 bg-current opacity-30 animate-pulse"
            style={{
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: '2s'
            }}
          />
        ))}
        
        {/* Energy particles */}
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-current rounded-full animate-ping"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random()}s`
            }}
          />
        ))}
        
        {/* Projection beam */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-t from-current to-transparent opacity-20 animate-pulse"
          style={{
            width: '2px',
            height: '100%',
            animationDuration: '3s'
          }}
        />
      </div>
      
      <span className={`font-mono text-sm ${colorClasses[color].split(' ')[0]} animate-pulse tracking-wide`}>
        {text}
      </span>
    </div>
  );
};

interface ProgressLoaderProps {
  progress?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  text?: string;
  showPercentage?: boolean;
  className?: string;
}

export const ProgressLoader: React.FC<ProgressLoaderProps> = ({
  progress = 0,
  size = 'md',
  color = 'primary',
  text = 'Loading...',
  showPercentage = true,
  className = '',
}) => {
  const colorClasses = {
    primary: 'text-cyan-400 border-cyan-400',
    secondary: 'text-purple-400 border-purple-400',
    danger: 'text-red-400 border-red-400',
    success: 'text-green-400 border-green-400',
  };

  const sizeClasses = {
    sm: 'w-32 h-2',
    md: 'w-48 h-3',
    lg: 'w-64 h-4',
  };

  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative ${colorClasses[color]}`}>
        {/* Background track */}
        <div className="absolute inset-0 border border-current rounded-full bg-black/50" />
        
        {/* Progress fill */}
        <div 
          className="absolute inset-0.5 bg-gradient-to-r from-current via-current to-transparent rounded-full transition-all duration-300"
          style={{ width: `${clampedProgress}%` }}
        >
          <div className="absolute inset-0 bg-current rounded-full animate-pulse opacity-60" />
        </div>
        
        {/* Scanning line */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_4px_currentColor] transition-all duration-300"
          style={{ left: `${clampedProgress}%` }}
        />
        
        {/* Data segments */}
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-current opacity-30"
            style={{ left: `${(i + 1) * 10}%` }}
          />
        ))}
      </div>
      
      <div className="flex items-center gap-2">
        <span className={`font-mono text-sm ${colorClasses[color].split(' ')[0]} tracking-wide`}>
          {text}
        </span>
        {showPercentage && (
          <span className={`font-mono text-sm ${colorClasses[color].split(' ')[0]} font-bold`}>
            {Math.round(clampedProgress)}%
          </span>
        )}
      </div>
    </div>
  );
};