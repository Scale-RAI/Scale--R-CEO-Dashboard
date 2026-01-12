import React from 'react';
import { ViewProps } from '../types';
import { ALERTS } from '../constants';
import { AlertCircle, CheckCircle, Zap, Info, ArrowRight, Brain } from 'lucide-react';

export const AlertsView: React.FC<ViewProps> = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Left Col: Alerts Feed */}
      <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50">
                  <h3 className="font-bold text-gray-900 dark:text-white">Active Alerts Feed</h3>
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs font-bold px-2 py-1 rounded-full">{ALERTS.length} Pending</span>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {ALERTS.map((alert) => (
                      <div key={alert.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div className="flex items-start">
                              <div className={`flex-shrink-0 p-2 rounded-lg mr-4 
                                ${alert.type === 'critical' ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 
                                  alert.type === 'important' ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'}`}>
                                  {alert.type === 'critical' ? <AlertCircle size={24} /> : 
                                   alert.type === 'important' ? <Zap size={24} /> : <Info size={24} />}
                              </div>
                              <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                      <h4 className="text-base font-bold text-gray-900 dark:text-white">{alert.title}</h4>
                                      <span className="text-xs text-gray-500 dark:text-gray-400">{alert.timestamp}</span>
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-3">{alert.description}</p>
                                  {alert.actionLabel && (
                                      <button className="text-sm font-medium text-white bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors">
                                          {alert.actionLabel}
                                      </button>
                                  )}
                              </div>
                          </div>
                      </div>
                  ))}
                  {ALERTS.length === 0 && (
                      <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                          <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                          <p className="text-lg font-medium">All Clear!</p>
                          <p>No active alerts requiring attention.</p>
                      </div>
                  )}
              </div>
          </div>

          {/* AI Weekly Brief */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 rounded-xl shadow-lg p-8 text-white">
              <div className="flex items-center mb-6">
                  <Brain className="text-purple-400 mr-3" size={32} />
                  <div>
                      <h3 className="text-xl font-bold">AI Weekly Brief</h3>
                      <p className="text-gray-400 text-sm">Week Ending Jan 16, 2026</p>
                  </div>
              </div>
              
              <div className="space-y-6">
                  <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-2">What Changed This Week</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm">
                          <li>Revenue trending <span className="text-green-400">up 12%</span> due to new Automation project.</li>
                          <li>Team capacity spiked to 78% (Amber zone).</li>
                          <li>Client health scores improved for Nana Kojo Inc.</li>
                      </ul>
                  </div>

                  <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-2">Decisions Required</h4>
                      <div className="space-y-2">
                          <div className="bg-gray-700/50 p-3 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-700 border border-gray-600">
                              <span className="text-sm font-medium">Approve 'Setup Bot' project to reduce load?</span>
                              <ArrowRight size={16} className="text-gray-400" />
                          </div>
                          <div className="bg-gray-700/50 p-3 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-700 border border-gray-600">
                              <span className="text-sm font-medium">Review Bash Projects contract renewal?</span>
                              <ArrowRight size={16} className="text-gray-400" />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* Right Col: Quick Actions */}
      <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
              {[
                  'Approve Pending Proposals',
                  'Schedule Client Check-Ins',
                  'Send Team Message',
                  'Flag for Board Review',
                  'Generate Weekly Report',
                  'Update Goal Progress'
              ].map((action) => (
                  <button key={action} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm text-left font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-200 dark:hover:border-blue-700 hover:text-blue-700 dark:hover:text-blue-300 transition-all flex justify-between items-center group">
                      {action}
                      <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
              ))}
          </div>
      </div>

    </div>
  );
};