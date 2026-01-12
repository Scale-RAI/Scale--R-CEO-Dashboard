import React from 'react';
import { ViewProps } from '../types';
import { SYSTEM_STATS, AUTOMATION_TYPES } from '../constants';
import { CheckCircle, Clock, Zap, AlertOctagon, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export const SystemsView: React.FC<ViewProps> = () => {
  return (
    <div className="space-y-6">
        
      {/* System Health Widget */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row items-center justify-between">
         <div className="flex items-center mb-4 md:mb-0">
             <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-4">
                 <CheckCircle size={28} />
             </div>
             <div>
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white">All Systems Operational</h2>
                 <p className="text-sm text-gray-500 dark:text-gray-400">Last check: 2 minutes ago</p>
             </div>
         </div>
         <div className="flex space-x-6 text-center">
             <div>
                 <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Automations</div>
                 <div className="text-xl font-bold text-gray-900 dark:text-white">{SYSTEM_STATS.activeAutomations}</div>
             </div>
             <div>
                 <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Uptime (30d)</div>
                 <div className="text-xl font-bold text-green-600 dark:text-green-400">{SYSTEM_STATS.uptime}%</div>
             </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hours Saved Impact */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 dark:from-indigo-800 dark:to-blue-900 rounded-xl p-8 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Clock size={120} />
            </div>
            <h3 className="text-indigo-200 font-medium text-lg mb-1">Impact: Time Reclaimed</h3>
            <div className="text-5xl font-bold mb-4">{SYSTEM_STATS.hoursSavedMonth} Hours</div>
            <p className="mb-6 text-indigo-100">Saved for clients this month alone.</p>
            
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-indigo-500/30">
                <div>
                    <div className="text-2xl font-bold">{SYSTEM_STATS.hoursSavedYear}</div>
                    <div className="text-xs text-indigo-200 uppercase tracking-wide">YTD Hours</div>
                </div>
                <div>
                    <div className="text-2xl font-bold">${SYSTEM_STATS.valueGenerated.toLocaleString()}</div>
                    <div className="text-xs text-indigo-200 uppercase tracking-wide">Value Generated</div>
                </div>
            </div>
        </div>

        {/* Automation by Type */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Automation Portfolio</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={AUTOMATION_TYPES}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {AUTOMATION_TYPES.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{backgroundColor: 'rgba(255,255,255,0.9)', color: '#333', borderRadius: '8px', border: 'none'}} />
                        <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

      {/* Client Automation Performance Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              <h3 className="font-bold text-gray-900 dark:text-white">Client System Performance</h3>
          </div>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Client</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Automations</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Executions (Mo)</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                      { name: 'Bash Projects', count: 4, exec: 1250, status: 'Healthy' },
                      { name: 'Nana Kojo', count: 2, exec: 400, status: 'Healthy' },
                      { name: 'Lilii Core', count: 15, exec: 8500, status: 'Healthy' }
                  ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{row.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">{row.count}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">{row.exec.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                                  {row.status}
                              </span>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
};