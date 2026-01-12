import React from 'react';
import { ViewProps } from '../types';
import { CLIENTS } from '../constants';
import { MoreHorizontal, Mail, Phone, ExternalLink, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export const ClientsView: React.FC<ViewProps> = () => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-100 dark:border-green-900/30 bg-green-50 dark:bg-green-900/10">
            <div className="text-green-800 dark:text-green-400 font-bold text-lg">Healthy (70-100)</div>
            <div className="text-3xl font-bold text-green-900 dark:text-green-300 mt-1">2 Clients</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-amber-100 dark:border-amber-900/30 bg-amber-50 dark:bg-amber-900/10">
            <div className="text-amber-800 dark:text-amber-400 font-bold text-lg">At Risk (60-69)</div>
            <div className="text-3xl font-bold text-amber-900 dark:text-amber-300 mt-1">1 Client</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10">
            <div className="text-red-800 dark:text-red-400 font-bold text-lg">Critical ({'<'}60)</div>
            <div className="text-3xl font-bold text-red-900 dark:text-red-300 mt-1">1 Client</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Client List</h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Filter</button>
            <button className="px-3 py-1.5 bg-gray-900 dark:bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-blue-700">Add Client</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Health</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Service</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">MRR</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Contact</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {CLIENTS.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold">
                        {client.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{client.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">ID: #{client.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full font-bold text-sm text-white mr-2
                            ${client.healthScore >= 70 ? 'bg-green-500' : client.healthScore >= 60 ? 'bg-amber-500' : 'bg-red-500'}
                        `}>
                            {client.healthScore}
                        </span>
                        {client.trend === 'up' && <ArrowUpRight size={16} className="text-green-500" />}
                        {client.trend === 'down' && <ArrowDownRight size={16} className="text-red-500" />}
                        {client.trend === 'flat' && <Minus size={16} className="text-gray-400" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                      {client.serviceType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    ${client.mrr.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {client.lastContactDays} days ago
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><Mail size={18} /></button>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><ExternalLink size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};