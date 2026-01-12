import React from 'react';

interface GaugeProps {
  value: number; // 0 to 100
  label: string;
  subLabel?: string;
  color?: 'green' | 'amber' | 'red';
}

export const Gauge: React.FC<GaugeProps> = ({ value, label, subLabel, color = 'green' }) => {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  const getColor = (c: string) => {
    switch (c) {
      case 'green': return '#10B981';
      case 'amber': return '#F59E0B';
      case 'red': return '#EF4444';
      default: return '#10B981';
    }
  };

  const getTextColor = () => {
      switch (color) {
        case 'green': return 'text-green-600 dark:text-green-400';
        case 'amber': return 'text-yellow-600 dark:text-amber-400';
        case 'red': return 'text-red-600 dark:text-red-400';
        default: return 'text-green-600 dark:text-green-400';
      }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <circle
            stroke="currentColor"
            className="text-gray-200 dark:text-gray-700"
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={getColor(color)}
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }}
            strokeLinecap="round"
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
            <span className={`text-xl font-bold ${getTextColor()}`}>{value}%</span>
        </div>
      </div>
      <div className="text-center mt-1">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</div>
          {subLabel && <div className="text-xs text-gray-500 dark:text-gray-400">{subLabel}</div>}
      </div>
    </div>
  );
};