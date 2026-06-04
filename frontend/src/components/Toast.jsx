import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 3700); // 300ms before context destroys it at 4000ms

    return () => clearTimeout(timer);
  }, []);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
    error: <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-500/30 bg-emerald-50/90 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200',
    error: 'border-rose-500/30 bg-rose-50/90 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200',
    warning: 'border-amber-500/30 bg-amber-50/90 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200',
    info: 'border-blue-500/30 bg-blue-50/90 dark:bg-blue-950/20 text-blue-900 dark:text-blue-200',
  };

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl border backdrop-blur-md shadow-xl transition-all duration-300 transform ${
        isExiting
          ? 'translate-x-full opacity-0 scale-95'
          : 'translate-x-0 opacity-100 scale-100'
      } ${borders[type] || borders.info}`}
    >
      {icons[type] || icons.info}
      <div className="flex-1 text-sm font-medium pr-2">{message}</div>
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(onClose, 300);
        }}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-0.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
