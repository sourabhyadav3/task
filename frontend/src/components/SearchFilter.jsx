import React from 'react';
import { Search, Plus, Filter, X } from 'lucide-react';

const SearchFilter = ({ search, setSearch, status, setStatus, onAddTask }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/50 dark:bg-gray-900/50 border border-gray-200/50 dark:border-gray-800/50 p-4 rounded-3xl backdrop-blur-md transition-colors duration-300">
      
      {/* Search Input */}
      <div className="relative flex-1">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
          <Search className="w-5 h-5" />
        </span>
        <input
          type="text"
          placeholder="Search tasks by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-10 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/25 focus:border-brand-500 transition-all duration-200 text-sm"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Options & Action */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative flex-1 md:flex-initial">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400 pointer-events-none">
            <Filter className="w-4 h-4" />
          </span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full md:w-48 pl-10 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-750 dark:text-gray-250 focus:outline-none focus:ring-2 focus:ring-brand-500/25 focus:border-brand-500 transition-all duration-200 text-sm appearance-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          onClick={onAddTask}
          className="px-5 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-2xl transition-all duration-200 shadow-md shadow-brand-600/10 hover:shadow-brand-600/25 flex items-center justify-center gap-2 group text-sm"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span>New Task</span>
        </button>
      </div>

    </div>
  );
};

export default SearchFilter;
