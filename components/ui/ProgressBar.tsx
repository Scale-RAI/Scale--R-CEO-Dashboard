import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label: string;
  unit?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, label, unit = '$' }) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));
  
  let colorClass = 'bg-scaleGreen';
  if (percentage < 30) colorClass = 'bg-scaleRed';
  else if (percentage < 70) colorClass = 'bg-scaleAmber';

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-1">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</span>
        <span className="text-sm font-bold text-gray-900 dark:text-white">
          {unit}{current.toLocaleString()} <span className="text-gray-400 dark:text-gray-500 font-normal">/ {unit}{total.toLocaleString()}</span>
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <div
          className={`${colorClass} h-3 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};