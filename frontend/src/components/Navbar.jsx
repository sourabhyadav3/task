import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Sun, Moon, LogOut, CheckSquare } from 'lucide-react';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const { showToast } = useToast();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogout = () => {
    logoutUser();
    showToast('Logged out successfully', 'success');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200/40 dark:border-gray-800/40 bg-white/75 dark:bg-gray-900/75 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-brand-500 rounded-xl text-white shadow-md shadow-brand-500/20">
            <CheckSquare className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-brand-600 to-indigo-600 dark:from-brand-400 dark:to-indigo-400 bg-clip-text text-transparent">
            TaskSync
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-xl bg-gray-100 hover:bg-gray-200/70 dark:bg-gray-800 dark:hover:bg-gray-700/70 transition-all duration-200"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {user && (
            <>
              {/* User Profiling */}
              <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-gray-200 dark:border-gray-800">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold uppercase shadow-inner">
                  {user.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 max-w-[140px] truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-rose-600 hover:text-white dark:text-rose-400 dark:hover:text-white border border-rose-200 dark:border-rose-950/40 hover:bg-rose-600 dark:hover:bg-rose-600 rounded-xl transition-all duration-200 shadow-sm hover:shadow-rose-600/10"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
