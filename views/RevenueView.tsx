import React from 'react';
import { ViewProps } from '../types';
import { REVENUE_BREAKDOWN, SERVICE_PERFORMANCE, CLIENTS } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell } from 'recharts';
import { DollarSign, TrendingUp, Users } from 'lucide-react';

export const RevenueView: React.FC<ViewProps> = () => {
  // Process Clients for Top 10 Bar Chart
  const topClients = [...CLIENTS].sort((a, b) => b.mrr - a.mrr).slice(0, 10);
  
  // Waterfall data simulation
  const waterfallData = [
      { name: 'Start', value: 2200, fill: '#9CA3AF' },
      { name: 'New', value: 400, fill: '#10B981' },
      { name: 'Expansion', value: 150, fill: '#3B82F6' },
      { name: 'Churn', value: -300, fill: '#EF4444' },
      { name: 'End', value: 2450, fill: '#6B7280' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Revenue Composition Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Revenue Composition (Last 6 Months)</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Breakdown by source showing shift towards AI products</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_BREAKDOWN} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAuto" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRetainer" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" strokeOpacity={0.2} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
              <Tooltip 
                  contentStyle={{
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  }}
                  itemStyle={{ color: '#1F2937' }}
                  labelStyle={{ color: '#6B7280' }}
              />
              <Legend />
              <Area type="monotone" dataKey="consult" stackId="1" stroke="#F59E0B" fill="#F59E0B" name="Consulting" />
              <Area type="monotone" dataKey="retainer" stackId="1" stroke="#10B981" fill="url(#colorRetainer)" name="Retainer" />
              <Area type="monotone" dataKey="auto" stackId="1" stroke="#3B82F6" fill="url(#colorAuto)" name="Automation" />
              <Area type="monotone" dataKey="ai" stackId="1" stroke="#8B5CF6" fill="url(#colorAi)" name="AI Products" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Performance Table */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Service Performance</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="text-left py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Service</th>
                  <th className="text-right py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">MRR</th>
                  <th className="text-right py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Clients</th>
                  <th className="text-right py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Growth</th>
                </tr>
              </thead>
              <tbody>
                {SERVICE_PERFORMANCE.map((service) => (
                  <tr key={service.name} className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-3 text-sm font-medium text-gray-900 dark:text-white">{service.name}</td>
                    <td className="py-3 text-sm text-right text-gray-600 dark:text-gray-300">${service.mrr}</td>
                    <td className="py-3 text-sm text-right text-gray-600 dark:text-gray-300">{service.clients}</td>
                    <td className={`py-3 text-sm text-right font-medium ${service.growth > 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
                      {service.growth > 0 ? '+' : ''}{service.growth}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Clients */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Top Clients by MRR</h3>
          <div className="h-60">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topClients} layout="vertical" margin={{top: 0, right: 30, left: 40, bottom: 0}}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} strokeOpacity={0.2} />
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={100} tick={{fontSize: 12, fill: '#9CA3AF'}} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: 'rgba(255,255,255,0.9)', color: '#333', borderRadius: '8px', border: 'none'}} />
                  <Bar dataKey="mrr" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Products & MRR Movement */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Product Dashboard */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* Lilii Stats */}
             <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl border border-purple-100 dark:border-purple-900/50">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-purple-200 dark:bg-purple-900/50 rounded-lg text-purple-700 dark:text-purple-300 font-bold">Lilii</div>
                    <span className="text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded">+12% MoM</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-xs text-purple-600 dark:text-purple-400 mb-1">Active Licenses</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">42</div>
                    </div>
                    <div>
                        <div className="text-xs text-purple-600 dark:text-purple-400 mb-1">MRR Contrib.</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">$350</div>
                    </div>
                </div>
             </div>

             {/* Freedom FX Bot Stats */}
             <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-900/50">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-200 dark:bg-blue-900/50 rounded-lg text-blue-700 dark:text-blue-300 font-bold">Freedom FX</div>
                    <span className="text-xs font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">Stable</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-xs text-blue-600 dark:text-blue-400 mb-1">Active Users</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">8</div>
                    </div>
                    <div>
                        <div className="text-xs text-blue-600 dark:text-blue-400 mb-1">MRR Contrib.</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">$400</div>
                    </div>
                </div>
             </div>
        </div>

        {/* MRR Movement Waterfall (Simulated with Bar) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">MRR Movement</h3>
            <div className="h-48">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={waterfallData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                        <XAxis dataKey="name" fontSize={12} tick={{fill: '#9CA3AF'}} />
                        <YAxis fontSize={12} tick={{fill: '#9CA3AF'}} />
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: 'rgba(255,255,255,0.9)', color: '#333', borderRadius: '8px', border: 'none'}} />
                        <Bar dataKey="value">
                            {waterfallData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                 </ResponsiveContainer>
            </div>
        </div>

      </div>

    </div>
  );
};