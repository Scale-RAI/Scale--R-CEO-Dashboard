import React from 'react';
import { ViewProps } from '../types';
import { ALERTS, DAILY_METRICS, AI_INSIGHT } from '../constants';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Gauge } from '../components/ui/Gauge';
import { AlertCircle, ArrowRight, Zap, CheckCircle2, TrendingUp, TrendingDown, Info } from 'lucide-react';

export const DailyView: React.FC<ViewProps> = ({ onNavigate }) => {
  
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertCircle className="text-red-500 dark:text-red-400" size={20} />;
      case 'important': return <Zap className="text-amber-500 dark:text-amber-400" size={20} />;
      default: return <Info className="text-blue-500 dark:text-blue-400" size={20} />;
    }
  };

  const getAlertBg = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-100 dark:bg-red-900/20 dark:border-red-900/30';
      case 'important': return 'bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:border-amber-900/30';
      default: return 'bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/30';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. TOP STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* MRR Progress */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-center">
          <ProgressBar 
            current={DAILY_METRICS.mrr.current} 
            total={DAILY_METRICS.mrr.target} 
            label="MRR Progress (Q1)" 
          />
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-right">
            {Math.round((DAILY_METRICS.mrr.current / DAILY_METRICS.mrr.target) * 100)}% of Goal
          </div>
        </div>

        {/* Cash Runway */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center">
          <Gauge 
            value={Math.round((DAILY_METRICS.runway.months / 12) * 100)} 
            label="Cash Runway" 
            subLabel={`${DAILY_METRICS.runway.months} Months`}
            color={DAILY_METRICS.runway.months < 3 ? 'red' : 'green'}
          />
        </div>

        {/* Active Clients */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center relative">
          <div className="text-sm text-gray-500 dark:text-gray-400 font-medium absolute top-4 left-4">Active Clients</div>
          <div className="text-4xl font-bold text-gray-900 dark:text-white mt-2">{DAILY_METRICS.activeClients.count}</div>
          <div className={`flex items-center mt-2 text-sm font-medium ${DAILY_METRICS.activeClients.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
            {DAILY_METRICS.activeClients.trend === 'up' ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
            <span>vs Last Month</span>
          </div>
        </div>

        {/* Team Capacity */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center">
           <Gauge 
            value={DAILY_METRICS.capacity.used} 
            label="Team Capacity" 
            subLabel="Utilization"
            color={DAILY_METRICS.capacity.used > 85 ? 'red' : DAILY_METRICS.capacity.used > 70 ? 'amber' : 'green'}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2. ALERTS SECTION (Takes up 2/3 on large screens) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
            <BellIconWithDot />
            Priority Alerts
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden">
            {ALERTS.map((alert) => (
              <div key={alert.id} className={`p-4 flex items-start space-x-4 ${getAlertBg(alert.type)} bg-opacity-30 dark:bg-opacity-20`}>
                <div className="flex-shrink-0 mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{alert.title}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{alert.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{alert.description}</p>
                </div>
                {alert.actionLabel && (
                  <button className="flex-shrink-0 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm transition-colors">
                    {alert.actionLabel}
                  </button>
                )}
              </div>
            ))}
            {ALERTS.length === 0 && (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <CheckCircle2 className="mx-auto mb-2 text-green-500" size={32} />
                <p>All clear. No pending alerts.</p>
              </div>
            )}
          </div>
        </div>

        {/* 3. AI INSIGHT (Takes up 1/3) */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
            <Zap className="text-scalePurple mr-2" size={20} fill="currentColor" />
            AI Insight
          </h2>
          <div className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-800 p-6 rounded-xl border border-purple-100 dark:border-purple-900/50 shadow-sm h-full">
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 mb-4">
              Daily Recommendation
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{AI_INSIGHT.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {AI_INSIGHT.description}
            </p>
            <button className="w-full bg-scalePurple text-white py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors shadow-sm flex items-center justify-center group">
              {AI_INSIGHT.action}
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. QUICK ACTIONS */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ActionButton label="View Full Dashboard" onClick={() => onNavigate('health')} primary />
          <ActionButton label="Check Pipeline" onClick={() => onNavigate('pipeline')} />
          <ActionButton label="Review Client Health" onClick={() => onNavigate('clients')} />
          <ActionButton label="Team Status" onClick={() => onNavigate('team')} />
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ label, onClick, primary = false }: { label: string, onClick: () => void, primary?: boolean }) => (
  <button 
    onClick={onClick}
    className={`
      py-3 px-4 rounded-lg text-sm font-medium text-center transition-all duration-200
      ${primary 
        ? 'bg-gray-900 dark:bg-blue-600 text-white hover:bg-gray-800 dark:hover:bg-blue-700 shadow-md' 
        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 shadow-sm'}
    `}
  >
    {label}
  </button>
);

const BellIconWithDot = () => (
  <div className="relative inline-block mr-2">
    <AlertCircle size={20} className="text-gray-400 dark:text-gray-500" />
    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white dark:ring-gray-800 bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
  </div>
);