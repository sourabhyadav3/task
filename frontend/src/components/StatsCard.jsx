import React from 'react';
import { ClipboardList, Clock, Loader, CheckCircle2 } from 'lucide-react';

const StatsCard = ({ title, count, type }) => {
  const configs = {
    total: {
      icon: <ClipboardList className="w-6 h-6 text-brand-600 dark:text-brand-400" />,
      bg: 'bg-brand-50 dark:bg-brand-950/30',
      border: 'border-brand-100 dark:border-brand-900/30',
      shadow: 'hover:shadow-brand-500/10',
    },
    pending: {
      icon: <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      border: 'border-amber-100 dark:border-amber-900/30',
      shadow: 'hover:shadow-amber-500/10',
    },
    inProgress: {
      icon: <Loader className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-spin-slow" />,
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      border: 'border-blue-100 dark:border-blue-900/30',
      shadow: 'hover:shadow-blue-500/10',
    },
    completed: {
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
      border: 'border-emerald-100 dark:border-emerald-900/30',
      shadow: 'hover:shadow-emerald-500/10',
    },
  };

  const config = configs[type] || configs.total;

  return (
    <div className={`p-6 bg-white dark:bg-gray-900 border ${config.border} rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-4 ${config.shadow}`}>
      <div className={`p-3.5 rounded-2xl ${config.bg} flex items-center justify-center`}>
        {config.icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-3xl font-black text-gray-800 dark:text-white mt-1 tracking-tight">
          {count}
        </h3>
      </div>
    </div>
  );
};

export default StatsCard;
