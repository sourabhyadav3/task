const Task = require('../models/Task');

// @desc    Get all tasks for current user (with search, filter, pagination, stats)
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Get query parameters
    const search = req.query.search || '';
    const status = req.query.status || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    // 2. Build task query filter
    const query = { userId };

    // Search filter (regex match on title or description, case-insensitive)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Status filter
    if (status && status !== 'All') {
      query.status = status;
    }

    // 3. Count total documents matching query for pagination
    const totalMatchingTasks = await Task.countDocuments(query);

    // 4. Fetch paginated tasks
    const skip = (page - 1) * limit;
    const tasks = await Task.find(query)
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(limit);

    // 5. Calculate dashboard stats (always based on ALL tasks of the user, not just paginated/filtered ones)
    const allUserTasks = await Task.find({ userId });
    const stats = {
      total: allUserTasks.length,
      pending: allUserTasks.filter((t) => t.status === 'Pending').length,
      inProgress: allUserTasks.filter((t) => t.status === 'In Progress').length,
      completed: allUserTasks.filter((t) => t.status === 'Completed').length,
    };

    res.json({
      tasks,
      pagination: {
        page,
        limit,
        totalTasks: totalMatchingTasks,
        totalPages: Math.ceil(totalMatchingTasks / limit) || 1,
      },
      stats,
    });
  } catch (error) {
    console.error('Get tasks error:', error.message);
    res.status(500).json({ message: 'Server error, failed to retrieve tasks' });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Task title is required' });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      status: status || 'Pending',
      userId: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error.message);
    res.status(500).json({ message: 'Server error, failed to create task' });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const taskId = req.params.id;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Task title is required' });
    }

    // Find task
    let task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check ownership
    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this task' });
    }

    // Update fields
    task.title = title.trim();
    task.description = description ? description.trim() : '';
    if (status) {
      task.status = status;
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    console.error('Update task error:', error.message);
    res.status(500).json({ message: 'Server error, failed to update task' });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Find task
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check ownership
    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this task' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted successfully', id: taskId });
  } catch (error) {
    console.error('Delete task error:', error.message);
    res.status(500).json({ message: 'Server error, failed to delete task' });
  }
};

// @desc    Update only task status
// @route   PATCH /api/tasks/:id/status
// @access  Private
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const taskId = req.params.id;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    // Validate status values
    const validStatuses = ['Pending', 'In Progress', 'Completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Find task
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check ownership
    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this task' });
    }

    task.status = status;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    console.error('Patch status error:', error.message);
    res.status(500).json({ message: 'Server error, failed to update status' });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
