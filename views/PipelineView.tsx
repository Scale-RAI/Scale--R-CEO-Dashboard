import React from 'react';
import { ViewProps } from '../types';
import { PIPELINE_FUNNEL, DEALS } from '../constants';
import { ArrowRight, Clock, Target, ThumbsUp, XCircle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const PipelineView: React.FC<ViewProps> = () => {
  return (
    <div className="space-y-6">
      
      {/* Sales Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
            <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Avg Sales Cycle</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">18 Days</div>
                <div className="text-xs text-green-600 dark:text-green-400 mt-1">Faster than target (21d)</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400"><Clock size={24} /></div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
            <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Win Rate</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">42%</div>
                <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 5% vs last Q</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg text-green-600 dark:text-green-400"><ThumbsUp size={24} /></div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
            <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Pipeline Value (Wgt)</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">$8,450</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total Raw: $26,500</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg text-purple-600 dark:text-purple-400"><Target size={24} /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pipeline Funnel */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Sales Funnel</h3>
            <div className="space-y-4">
                {PIPELINE_FUNNEL.map((stage, idx) => (
                    <div key={stage.stage} className="relative">
                        <div className="flex justify-between items-end mb-1 text-sm">
                            <span className="font-semibold text-gray-700 dark:text-gray-300">{stage.stage}</span>
                            <span className="text-gray-500 dark:text-gray-400">{stage.count} leads • ${stage.value.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg h-8 overflow-hidden relative">
                             {/* Visual funnel width effect */}
                            <div 
                                className="h-full rounded-r-lg flex items-center px-3 text-white text-xs font-bold transition-all duration-500"
                                style={{ 
                                    width: `${100 - (idx * 15)}%`, 
                                    backgroundColor: stage.color 
                                }}
                            >
                                {Math.round((stage.count / PIPELINE_FUNNEL[0].count) * 100)}% Conv.
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* 90-Day Forecast */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">90-Day Revenue Forecast</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                        { name: 'Feb', signed: 2450, highProb: 800, medProb: 500, organic: 100 },
                        { name: 'Mar', signed: 2450, highProb: 1500, medProb: 900, organic: 200 },
                        { name: 'Apr', signed: 2200, highProb: 2000, medProb: 1200, organic: 300 },
                    ]} stacked>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.2} />
                         <XAxis dataKey="name" tick={{fill: '#9CA3AF'}} />
                         <YAxis tick={{fill: '#9CA3AF'}} />
                         <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: 'rgba(255,255,255,0.9)', color: '#333', borderRadius: '8px', border: 'none'}} />
                         <Bar dataKey="signed" stackId="a" fill="#065f46" name="Signed" />
                         <Bar dataKey="highProb" stackId="a" fill="#10B981" name="High Prob (>70%)" />
                         <Bar dataKey="medProb" stackId="a" fill="#6ee7b7" name="Med Prob" />
                         <Bar dataKey="organic" stackId="a" fill="#3B82F6" name="Organic Growth" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

      {/* Deal Kanban / List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-4">
         {['Discovery', 'Proposals', 'Negotiation'].map((stageName) => (
             <div key={stageName} className="min-w-[280px]">
                 <div className="flex items-center justify-between mb-3 px-1">
                    <h4 className="font-bold text-gray-700 dark:text-gray-300 text-sm uppercase tracking-wide">{stageName}</h4>
                    <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full font-bold">
                        {DEALS.filter(d => d.stage === stageName).length}
                    </span>
                 </div>
                 <div className="space-y-3">
                     {DEALS.filter(d => d.stage === stageName).map(deal => (
                         <div key={deal.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                             <div className="flex justify-between items-start mb-2">
                                 <span className="font-bold text-gray-900 dark:text-white">{deal.client}</span>
                                 <span className="text-green-600 dark:text-green-400 font-bold text-sm">${deal.value}</span>
                             </div>
                             <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mb-3">
                                 <div className="bg-green-500 h-1.5 rounded-full" style={{width: `${deal.probability}%`}}></div>
                             </div>
                             <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                                 <span>{deal.days} days in stage</span>
                                 <span className="font-medium">{deal.probability}% Prob.</span>
                             </div>
                         </div>
                     ))}
                     {DEALS.filter(d => d.stage === stageName).length === 0 && (
                         <div className="text-center py-8 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-gray-400 dark:text-gray-500 text-sm">
                             No deals
                         </div>
                     )}
                 </div>
             </div>
         ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
             <h4 className="text-sm font-bold text-green-700 dark:text-green-400 uppercase tracking-wide mb-4 flex items-center">
                 <CheckCircle size={16} className="mr-2" /> Won This Month
             </h4>
             <ul className="space-y-3">
                 <li className="flex justify-between items-center pb-2 border-b border-gray-50 dark:border-gray-700">
                     <span className="text-sm font-medium text-gray-900 dark:text-white">Alpha Corp (Automation)</span>
                     <span className="text-sm font-bold text-green-600 dark:text-green-400">$1,200/mo</span>
                 </li>
                 <li className="flex justify-between items-center pb-2 border-b border-gray-50 dark:border-gray-700">
                     <span className="text-sm font-medium text-gray-900 dark:text-white">Beta LLC (Retainer)</span>
                     <span className="text-sm font-bold text-green-600 dark:text-green-400">$500/mo</span>
                 </li>
             </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
             <h4 className="text-sm font-bold text-red-700 dark:text-red-400 uppercase tracking-wide mb-4 flex items-center">
                 <XCircle size={16} className="mr-2" /> Lost This Month
             </h4>
             <ul className="space-y-3">
                 <li className="flex justify-between items-center pb-2 border-b border-gray-50 dark:border-gray-700">
                     <span className="text-sm font-medium text-gray-900 dark:text-white">Gamma Inc</span>
                     <span className="text-xs text-gray-500 dark:text-gray-400">Budget constraints</span>
                 </li>
             </ul>
        </div>
      </div>
    </div>
  );
};