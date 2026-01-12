import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  TrendingUp, 
  Users, 
  Target, 
  Cpu, 
  Briefcase, 
  BarChart2, 
  Flag, 
  Bell,
  Moon,
  Sun
} from 'lucide-react';
import { NavItem } from '../types';

interface SidebarProps {
  currentView: string;
  onNavigate: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Daily CEO View', icon: LayoutDashboard },
  { id: 'health', label: 'Company Health', icon: Activity },
  { id: 'revenue', label: 'Revenue & Growth', icon: TrendingUp },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'pipeline', label: 'Pipeline & Sales', icon: Target },
  { id: 'systems', label: 'Systems', icon: Cpu },
  { id: 'team', label: 'Team & Ops', icon: Briefcase },
  { id: 'strategy', label: 'Strategy', icon: BarChart2 },
  { id: 'mission', label: 'Mission Metrics', icon: Flag },
  { id: 'alerts', label: 'Alerts', icon: Bell },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, isOpen, setIsOpen, isDarkMode, toggleDarkMode }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-30 transform transition-transform duration-200 ease-in-out flex flex-col
        md:translate-x-0 md:static
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-700 shrink-0">
          <div className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="text-scaleBlue">SCALE</span>-R
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-scaleBlue dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'}
                `}
              >
                <Icon size={18} className={`mr-3 ${isActive ? 'text-scaleBlue dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700 shrink-0">
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors mb-4"
            >
              <div className="flex items-center">
                {isDarkMode ? <Moon size={18} className="mr-3" /> : <Sun size={18} className="mr-3" />}
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </div>
              <div className={`w-8 h-4 rounded-full relative transition-colors ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${isDarkMode ? 'left-4.5 translate-x-4' : 'left-0.5'}`}></div>
              </div>
            </button>

            <div className="px-3 mb-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              System
            </div>
            <div className="px-3 text-xs text-gray-500 dark:text-gray-500">
              v2.5.0 • Updated Jan 2026
            </div>
        </div>
      </aside>
    </>
  );
};