import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';
import { CURRENT_DATE } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onNavigate: (id: string) => void;
  title: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Initialize dark mode from system preference or local storage (defaulting to false here for simplicity)
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    // Changed min-h-screen to h-screen and added overflow-hidden to fix the sidebar
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Sidebar 
        currentView={currentView} 
        onNavigate={onNavigate} 
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="mr-3 p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none"
            >
              <Menu size={20} />
            </button>
            <span className="font-bold text-gray-900 dark:text-white">Scale-R</span>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto focus:outline-none p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {/* View Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last updated: {CURRENT_DATE} • Real-time</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                 {/* Optional global actions could go here */}
              </div>
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  );
};