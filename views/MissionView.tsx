import React from 'react';
import { ViewProps } from '../types';
import { MISSION_STATS, VALUES_SCORECARD } from '../constants';
import { Clock, Heart, Zap, Globe } from 'lucide-react';
import { Gauge } from '../components/ui/Gauge';

export const MissionView: React.FC<ViewProps> = () => {
  return (
    <div className="space-y-8">
      
      {/* Hero Metric: Freedom Restored */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-800 dark:to-emerald-800 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <Clock className="absolute top-10 left-10 w-32 h-32" />
              <Globe className="absolute bottom-10 right-10 w-48 h-48" />
          </div>
          
          <h2 className="text-xl md:text-2xl font-medium text-emerald-100 mb-4 uppercase tracking-widest">Freedom Restored</h2>
          <div className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
              {MISSION_STATS.totalHoursSaved.toLocaleString()}
              <span className="text-3xl md:text-4xl text-emerald-200 ml-2 font-light">hours</span>
          </div>
          <p className="text-lg text-emerald-50 max-w-2xl mx-auto border-t border-emerald-400/30 pt-6">
              That's equivalent to giving our clients back <strong className="text-white">{Math.round(MISSION_STATS.totalHoursSaved / 40)} weeks</strong> of full-time work to spend on what truly matters.
          </p>
      </div>

      {/* Leverage Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center">
              <div className="inline-flex p-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                  <Zap size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{MISSION_STATS.leverageRatio}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">Leverage Ratio</div>
              <p className="text-xs text-gray-400 mt-2">1h of our work saves {MISSION_STATS.leverageRatio.split(':')[0]}h for client</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center">
              <div className="inline-flex p-3 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
                  <Globe size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">${MISSION_STATS.revenuePerHour}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">Revenue Per Hour</div>
              <p className="text-xs text-gray-400 mt-2">High-value output</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-center">
              <div className="inline-flex p-3 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
                  <Heart size={24} />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{MISSION_STATS.monthHoursSaved}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">Saved This Month</div>
              <p className="text-xs text-gray-400 mt-2">Target: 200h</p>
          </div>
      </div>

      {/* Values Scorecard (Repeated from Health but focused visual) */}
      <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 text-center uppercase tracking-widest">Kingdom Values Alignment</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {VALUES_SCORECARD.map((val) => (
                  <div key={val.name} className="bg-white dark:bg-gray-800 py-6 px-2 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center">
                      <Gauge 
                        value={Math.round((val.score / (val.target || 1)) * 100)} 
                        label={val.name} 
                        color={val.score >= val.target ? 'green' : 'amber'}
                      />
                  </div>
              ))}
          </div>
      </div>

    </div>
  );
};