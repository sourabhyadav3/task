import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

const TaskForm = ({ isOpen, onClose, onSubmit, task = null }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStatus(task.status || 'Pending');
    } else {
      setTitle('');
      setDescription('');
      setStatus('Pending');
    }
    setError('');
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        status,
      };
      await onSubmit(taskData);
      onClose();
    } catch (err) {
      setError(err || 'Failed to save task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in">
      
      {/* Modal Card */}
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800/40 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 transform scale-100 animate-slide-up">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800/60">
          <h3 className="text-lg font-black text-gray-800 dark:text-white">
            {task ? 'Edit Task' : 'Create New Task'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
              Task Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Design Landing Page"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              disabled={isSubmitting}
              className={`w-full px-4 py-3 rounded-2xl border bg-white dark:bg-gray-950 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                error
                  ? 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500'
                  : 'border-gray-200 dark:border-gray-800 focus:ring-brand-500/20 focus:border-brand-500'
              }`}
            />
            {error && <span className="text-xs text-rose-500 font-medium block pl-1">{error}</span>}
          </div>

          {/* Description Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
              Description
            </label>
            <textarea
              placeholder="Provide a detailed breakdown of the task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              rows={4}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25 focus:border-brand-500 transition-all duration-200 text-sm resize-none"
            />
          </div>

          {/* Status Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500/25 focus:border-brand-500 transition-all duration-200 text-sm appearance-none cursor-pointer"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-800/60 mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 font-bold rounded-2xl transition-colors duration-200 text-sm disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-2xl transition-all duration-200 shadow-md shadow-brand-600/10 hover:shadow-brand-600/25 flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>{task ? 'Update Task' : 'Create Task'}</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default TaskForm;
