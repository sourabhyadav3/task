import React, { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask, updateTaskStatus } from '../services/taskApi';
import { useToast } from '../context/ToastContext';
import StatsCard from '../components/StatsCard';
import SearchFilter from '../components/SearchFilter';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { ChevronLeft, ChevronRight, Clipboard } from 'lucide-react';

const Dashboard = () => {
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const [limit] = useState(6);

  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 6, totalTasks: 0, totalPages: 1 });
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [status]);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTasks({
        search: debouncedSearch,
        status,
        page,
        limit,
      });
      setTasks(data.tasks);
      setPagination(data.pagination);
      setStats(data.stats);
    } catch (err) {
      console.error(err);
      showToast('Failed to fetch tasks', 'error');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, status, page, limit, showToast]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateOrUpdateTask = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, taskData);
        showToast('Task updated successfully', 'success');
      } else {
        await createTask(taskData);
        showToast('Task created successfully', 'success');
      }
      fetchTasks();
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to save task';
      showToast(errMsg, 'error');
      throw errMsg;
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        showToast('Task deleted successfully', 'success');
        fetchTasks();
      } catch (err) {
        showToast('Failed to delete task', 'error');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTaskStatus(id, newStatus);
      showToast(`Task marked as ${newStatus}`, 'success');
      fetchTasks();
    } catch (err) {
      showToast('Failed to update task status', 'error');
    }
  };

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-[calc(100vh-4rem)]">
      
      {/* Dynamic Statistics Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Tasks" count={stats.total} type="total" />
        <StatsCard title="Pending" count={stats.pending} type="pending" />
        <StatsCard title="In Progress" count={stats.inProgress} type="inProgress" />
        <StatsCard title="Completed" count={stats.completed} type="completed" />
      </div>

      {/* Query Bar */}
      <SearchFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onAddTask={handleOpenCreateModal}
      />

      {/* Task List Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800/50 p-6 rounded-3xl animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
              </div>
              <div className="border-t border-gray-105 dark:border-gray-800/60 pt-4 flex justify-between">
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-full w-20" />
                <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-16" />
              </div>
            </div>
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-white/40 dark:bg-gray-900/40 border border-gray-200/50 dark:border-gray-800/50 rounded-3xl text-center backdrop-blur-md">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl text-gray-400 dark:text-gray-505 mb-4">
            <Clipboard className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">No Tasks Found</h3>
          <p className="text-sm text-gray-505 dark:text-gray-400 mt-1 max-w-sm">
            {debouncedSearch || status !== 'All'
              ? 'Try adjusting your search terms or status filters.'
              : "Get started by creating your very first task card!"}
          </p>
          {!debouncedSearch && status === 'All' && (
            <button
              onClick={handleOpenCreateModal}
              className="mt-5 px-6 py-2.5 bg-brand-600 hover:bg-brand-505 text-white font-bold rounded-2xl shadow-md transition-all text-sm"
            >
              Create a Task
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 border-t border-gray-100 dark:border-gray-800/60 pt-6 mt-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="p-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-450 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span className="text-sm font-semibold text-gray-600 dark:text-gray-450">
                Page {page} of {pagination.totalPages}
              </span>

              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, pagination.totalPages))}
                disabled={page === pagination.totalPages}
                className="p-2 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-455 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Next Page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}

      {/* Task Creation / Edit Modal */}
      <TaskForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrUpdateTask}
        task={editingTask}
      />
    </div>
  );
};

export default Dashboard;
