import React from 'react';
import { ViewProps } from '../types';
import { STRATEGY_DATA, CLIENT_PROFITABILITY } from '../constants';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ZAxis } from 'recharts';
import { Target, TrendingUp, DollarSign } from 'lucide-react';

export const StrategyView: React.FC<ViewProps> = () => {
  return (
    <div className="space-y-8">
      
      {/* Unit Economics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">LTV:CAC Ratio</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{STRATEGY_DATA.ratio}</div>
              <div className="text-sm text-green-600 dark:text-green-400 mt-2">Target > 3:1 (Excellent)</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Cust. Acquisition Cost</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">${STRATEGY_DATA.cac}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Lifetime Value (Est)</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">${STRATEGY_DATA.ltv.toLocaleString()}</div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Client Profitability Matrix */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Client Profitability Matrix</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Revenue (X) vs Margin (Y). Top Right = Star Clients.</p>
              <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                          <XAxis type="number" dataKey="revenue" name="Revenue" unit="$" tick={{fill: '#9CA3AF'}} />
                          <YAxis type="number" dataKey="margin" name="Margin" unit="%" tick={{fill: '#9CA3AF'}} />
                          <ZAxis range={[100, 300]} />
                          <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{backgroundColor: 'rgba(255,255,255,0.9)', color: '#333', borderRadius: '8px', border: 'none'}} />
                          <Scatter name="Clients" data={CLIENT_PROFITABILITY} fill="#8884d8">
                              {CLIENT_PROFITABILITY.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.tier === 'A' ? '#10B981' : entry.tier === 'B' ? '#F59E0B' : '#EF4444'} />
                              ))}
                          </Scatter>
                      </ScatterChart>
                  </ResponsiveContainer>
              </div>
          </div>

          {/* Roadmap Progress */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">2026 Roadmap Tracker</h3>
              <div className="space-y-8">
                  {STRATEGY_DATA.roadmap.map((q) => (
                      <div key={q.q}>
                          <div className="flex justify-between items-center mb-2">
                              <h4 className="font-bold text-gray-800 dark:text-gray-200">{q.q} 2026</h4>
                              <span className="text-sm text-gray-500 dark:text-gray-400">Target: ${q.goal} MRR</span>
                          </div>
                          <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 dark:text-blue-300 bg-blue-200 dark:bg-blue-900/50">
                                        Progress
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
                                            {Math.round((q.current/q.goal)*100)}%
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 dark:bg-blue-900/30">
                                    <div style={{ width: `${(q.current/q.goal)*100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                                </div>
                            </div>
                          <ul className="space-y-2 mt-3">
                              {q.tasks.map((task, i) => (
                                  <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                      <div className={`w-2 h-2 rounded-full mr-2 ${q.current > 0 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                                      {task}
                                  </li>
                              ))}
                          </ul>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* Growth Constraints */}
      <div className="bg-gray-900 dark:bg-black text-white p-6 rounded-xl border border-gray-800 dark:border-gray-700 shadow-lg">
          <div className="flex items-center mb-6">
              <div className="p-2 bg-indigo-600 rounded-lg mr-3">
                  <Target size={20} />
              </div>
              <h3 className="text-lg font-bold">Top 3 Growth Constraints (AI Analysis)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-800 dark:bg-gray-900 p-4 rounded-lg border border-gray-700">
                      <div className="text-xs font-bold text-indigo-400 uppercase tracking-wide mb-2">Constraint #{i}</div>
                      <h4 className="font-bold mb-2">
                          {i === 1 ? 'CEO Time Bottleneck' : i === 2 ? 'Lead Flow Consistency' : 'Technical Onboarding Speed'}
                      </h4>
                      <p className="text-sm text-gray-400">
                          {i === 1 ? 'Edem is involved in 80% of delivery. Automating onboarding is critical.' : 
                           i === 2 ? 'Reliant on referrals. Need predictable outbound engine.' :
                           'Setup takes 14 days. Reduce to 3 days via standardization.'}
                      </p>
                  </div>
              ))}
          </div>
      </div>

    </div>
  );
};