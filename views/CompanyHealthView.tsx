import React from 'react';
import { ViewProps } from '../types';
import { REVENUE_DATA, VALUES_SCORECARD } from '../constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, DollarSign, Wallet, Percent } from 'lucide-react';

export const CompanyHealthView: React.FC<ViewProps> = () => {
  return (
    <div className="space-y-8">
      
      {/* Financial Health Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Total Revenue (MTD)" 
          value="$2,850" 
          trend="+12%" 
          trendDir="up"
          icon={DollarSign}
        />
        <StatCard 
          label="MRR" 
          value="$2,450" 
          trend="+5%" 
          trendDir="up"
          icon={TrendingUp}
        />
        <StatCard 
          label="Profit Margin" 
          value="42%" 
          trend="-2%" 
          trendDir="down"
          icon={Percent}
          status="amber"
        />
        <StatCard 
          label="Cash Position" 
          value="$15,200" 
          subValue="5.5 mo runway"
          icon={Wallet}
        />
      </div>

      {/* Growth Metrics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-6">Revenue Trend (6 Months)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOne" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
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
                <Area type="monotone" dataKey="oneTime" stackId="1" stroke="#3B82F6" fill="url(#colorOne)" name="One-time" />
                <Area type="monotone" dataKey="mrr" stackId="1" stroke="#10B981" fill="url(#colorMrr)" name="MRR" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
           <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-6">Client Growth</h3>
           <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
             <span className="text-sm">Client Growth Chart Placeholder</span>
           </div>
        </div>
      </div>

      {/* Values Dashboard */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Christian Ethics Scorecard</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VALUES_SCORECARD.map((item) => (
            <div key={item.name} className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{item.name}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-bold 
                  ${(item.score >= item.target && item.target > 0) || (item.name === 'Excellence' && item.score === 0) 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                    : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'}`}>
                  {item.metric}
                </span>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {item.score}{item.unit}
                </span>
                <span className="text-sm text-gray-400 mb-1">
                  / {item.target}{item.unit} Target
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                 {/* Simple progress calc for visual */}
                <div 
                  className={`h-1.5 rounded-full ${item.score >= item.target ? 'bg-scaleGreen' : 'bg-scaleAmber'}`} 
                  style={{ width: `${Math.min(100, (item.score / (item.target || 1)) * 100)}%` }} 
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  trend?: string;
  trendDir?: 'up' | 'down';
  icon: React.ComponentType<any>;
  status?: 'green' | 'amber' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, subValue, trend, trendDir, icon: Icon, status = 'green' }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</p>
        <h4 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h4>
        {subValue && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subValue}</p>}
        {trend && (
           <div className={`flex items-center mt-2 text-sm font-medium ${trendDir === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
             {trendDir === 'up' ? '↑' : '↓'} {trend}
           </div>
        )}
      </div>
      <div className={`p-3 rounded-lg ${status === 'amber' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'}`}>
        <Icon size={24} />
      </div>
    </div>
  );
};