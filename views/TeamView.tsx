import React from 'react';
import { ViewProps } from '../types';
import { TEAM_MEMBERS, DAILY_METRICS } from '../constants';
import { Gauge } from '../components/ui/Gauge';
import { AlertTriangle, Calendar, User, Briefcase } from 'lucide-react';

export const TeamView: React.FC<ViewProps> = () => {
  return (
    <div className="space-y-8">
      
      {/* Top Section: Overall Capacity */}
      <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex-1 flex items-center justify-center">
              <div className="scale-125">
                <Gauge 
                    value={DAILY_METRICS.capacity.used} 
                    label="Team Capacity" 
                    subLabel="Utilization" 
                    color={DAILY_METRICS.capacity.used > 80 ? 'red' : 'amber'}
                />
              </div>
          </div>
          <div className="flex-1 space-y-4">
              {/* Hiring Signal */}
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-xl p-5">
                  <div className="flex items-start">
                      <AlertTriangle className="text-amber-600 dark:text-amber-400 mt-0.5 mr-3" size={20} />
                      <div>
                          <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300">Capacity Alert</h4>
                          <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">Team at 78% capacity. If this trend continues for 2 more weeks, consider initiating hiring process for a Junior Dev.</p>
                      </div>
                  </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Resource Allocation</h4>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-sm text-gray-900 dark:text-white">Client Projects</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">65%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-sm text-gray-900 dark:text-white">Internal Ops</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">20%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-900 dark:text-white">R&D / Learning</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">15%</span>
                  </div>
              </div>
          </div>
      </div>

      {/* Team Member Cards */}
      <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Team Pulse</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEAM_MEMBERS.map((member) => (
                  <div key={member.name} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50">
                          <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-200 font-bold text-xs">
                                  {member.name.charAt(0)}
                              </div>
                              <div className="ml-3">
                                  <div className="text-sm font-bold text-gray-900 dark:text-white">{member.name}</div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">{member.role}</div>
                              </div>
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium 
                              ${member.status === 'healthy' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'}`}>
                              {member.status === 'healthy' ? 'Healthy' : 'High Load'}
                          </span>
                      </div>
                      <div className="p-6">
                          <div className="mb-4">
                              <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-500 dark:text-gray-400">Weekly Load</span>
                                  <span className="font-medium text-gray-900 dark:text-white">{member.hours}/{member.maxHours} hrs</span>
                              </div>
                              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${member.hours/member.maxHours > 0.9 ? 'bg-red-500' : member.hours/member.maxHours > 0.8 ? 'bg-amber-500' : 'bg-green-500'}`}
                                    style={{width: `${(member.hours/member.maxHours)*100}%`}}
                                  ></div>
                              </div>
                          </div>
                          <div>
                              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">Active Projects</div>
                              <div className="flex flex-wrap gap-2">
                                  {member.projects.map(p => (
                                      <span key={p} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md border border-gray-200 dark:border-gray-600">
                                          {p}
                                      </span>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      {/* Project Status Board */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white">Active Projects</h3>
          </div>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Project</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Client</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Due</th>
                  </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Bash System V1</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Bash Projects</td>
                      <td className="px-6 py-4 text-center"><span className="text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full">On Track</span></td>
                      <td className="px-6 py-4 text-right text-sm text-gray-500 dark:text-gray-400">Jan 20</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">Setup Bot Implementation</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Internal</td>
                      <td className="px-6 py-4 text-center"><span className="text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full">At Risk</span></td>
                      <td className="px-6 py-4 text-right text-sm text-gray-500 dark:text-gray-400">Jan 18</td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>
  );
};