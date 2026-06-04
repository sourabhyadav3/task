import React, { useState } from 'react';
import { Pencil, Trash2, CheckCircle2, Circle, PlayCircle, Loader2 } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Completed':
        return {
          badgeClass: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/30',
          dotClass: 'bg-emerald-500',
          icon: <CheckCircle2 className="w-5.5 h-5.5 text-emerald-500 hover:scale-105 transition-transform" />,
        };
      case 'In Progress':
        return {
          badgeClass: 'bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/30',
          dotClass: 'bg-blue-500',
          icon: <PlayCircle className="w-5.5 h-5.5 text-blue-500 hover:scale-105 transition-transform" />,
        };
      default: // Pending
        return {
          badgeClass: 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/30',
          dotClass: 'bg-amber-500',
          icon: <Circle className="w-5.5 h-5.5 text-gray-450 dark:text-gray-500 hover:text-amber-500 hover:scale-105 transition-transform" />,
        };
    }
  };

  const config = getStatusConfig(task.status);

  const handleCheckboxClick = async () => {
    setIsUpdating(true);
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    await onStatusChange(task._id, newStatus);
    setIsUpdating(false);
  };

  const handleCycleStatus = async () => {
    setIsUpdating(true);
    let nextStatus = 'Pending';
    if (task.status === 'Pending') nextStatus = 'In Progress';
    else if (task.status === 'In Progress') nextStatus = 'Completed';
    await onStatusChange(task._id, nextStatus);
    setIsUpdating(false);
  };

  return (
    <div className={`group bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800/60 p-5 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-brand-500/30 dark:hover:border-brand-500/30 relative overflow-hidden ${task.status === 'Completed' ? 'opacity-85' : ''}`}>
      
      {/* Top Banner Indicator */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] transition-colors duration-300 ${
        task.status === 'Completed' ? 'bg-emerald-500' : task.status === 'In Progress' ? 'bg-blue-500' : 'bg-amber-500'
      }`} />

      <div>
        {/* Header - Checkbox and Title */}
        <div className="flex items-start gap-3">
          <button
            onClick={handleCheckboxClick}
            disabled={isUpdating}
            className="mt-1 focus:outline-none flex-shrink-0 disabled:opacity-50"
            aria-label="Toggle Complete"
          >
            {isUpdating ? (
              <Loader2 className="w-5.5 h-5.5 text-brand-500 animate-spin" />
            ) : (
              config.icon
            )}
          </button>
          
          <div className="flex-1 min-w-0">
            <h4 className={`text-base font-bold text-gray-800 dark:text-white leading-tight break-words ${
              task.status === 'Completed' ? 'line-through text-gray-400 dark:text-gray-500 font-medium' : ''
            }`}>
              {task.title}
            </h4>
          </div>
        </div>

        {/* Description */}
        <p className={`text-sm text-gray-500 dark:text-gray-400 mt-3 break-words whitespace-pre-wrap leading-relaxed ${
          task.status === 'Completed' ? 'line-through text-gray-400/80 dark:text-gray-600' : ''
        }`}>
          {task.description || <span className="italic opacity-60">No description provided</span>}
        </p>
      </div>

      {/* Footer - Status Badge & Controls */}
      <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800/60 pt-4 mt-5">
        
        {/* Clickable Status Badge (Cycles Status) */}
        <button
          onClick={handleCycleStatus}
          disabled={isUpdating}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 ${config.badgeClass}`}
          title="Click to cycle status"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass} animate-pulse`} />
          <span>{task.status}</span>
        </button>

        {/* Edit and Delete Buttons */}
        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/30 rounded-xl transition-all duration-200"
            title="Edit Task"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-gray-400 hover:text-rose-600 dark:hover:text-rose-450 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all duration-200"
            title="Delete Task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default TaskCard;
