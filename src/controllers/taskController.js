const taskModel = require('../models/taskModel');
const { taskSchema } = require('./validationSchemas.js');

/**
 * Retrieves a list of all tasks.
 * 
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} JSON response containing a list of tasks and the total count
 * @throws {Object} JSON object indicating the error that occurred
 */
const getAllTasks = async (req, res) => {
    try {
        const taskList = await taskModel.find({});
        res.status(200).json({ tasks: taskList, total: taskList.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Searches for tasks based on provided criteria.
 * 
 * @param {Object} req - The request object
 * @param {string} [req.body.owner] - The ID of the user who owns the task
 * @param {string} [req.body.name] - The name of the task
 * @param {string} [req.body.category] - The category of the task
 * @param {enum} [req.body.operator] - Operator to use when combining the filter criteria. Valid values are ['and', 'or']
 * @param {Object} res - The response object
 * @returns {Object} JSON response containing a list of tasks that match the filter criteria
 * @throws {Object} JSON object indicating the error that occurred
 */
const searchTasks = async (req, res) => {
    const { owner, name, category, operator } = req.body;

    try {
        const filter = {};

        if (operator && operator === 'or') {
            if (owner) {
                filter.$or = [{ owner }];
            }
            if (name) {
                filter.$or = filter.$or || [];
                filter.$or.push({ name });
            }
            if (category) {
                filter.$or = filter.$or || [];
                filter.$or.push({ category });
            }
        } else {
            if (owner) {
                filter.owner = owner;
            }
            if (name) {
                filter.name = name;
            }
            if (category) {
                filter.category = category;
            }
        }

        const tasks = await taskModel.find(filter);

        if (tasks.length === 0) {
            return res.status(200).json({ message: `No tasks found.` });
        }

        return res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Adds a new task based on the provided data.
 * 
 * @param {Object} req - The request object
 * @param {string} req.body.owner - The ID of the user creating the task
 * @param {string} req.body.name - The name of the task
 * @param {string} req.body.description - The description of the task
 * @param {enum} req.body.category - The category of the task. Valid values are ['Cleaning', 'Shopping', 'Work']
 * @param {Object} res - The response object
 * @returns {Object} JSON response indicating the result of the task creation
 * @throws {Object} JSON object indicating the error that occurred
 */
const addTask = async (req, res) => {
    const validationResult = taskSchema.validate(req.body);

    if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error.details[0].message });
    }

    const { owner, name, description, category } = req.body;
    const newTask = {
        owner,
        name,
        description,
        category,
    };

    try {
        await taskModel.create(newTask);
        return res.status(201).json({ message: `New task created!` });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

/**
 * Deletes a task based on the provided task ID.
 * 
 * @param {Object} req - The request object
 * @param {string} req.body.id - The ID of the task to delete
 * @param {string} req.body.userId - The ID of the user making the request
 * @param {Object} res - The response object
 * @returns {Object} JSON response indicating the result of the task deletion
 * @throws {Object} JSON object indicating the error that occurred
 */
const deleteTask = async (req, res) => {
    const taskId = req.body.id;

    try {
        const task = await taskModel.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: `Task not found` });
        }

        if (task.owner !== req.body.userId) {
            return res.status(403).json({ error: `You are not the owner of this task` });
        }

        await taskModel.findByIdAndDelete(taskId);
        return res.status(200).json({ message: `Task deleted successfully!` });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

/**
 * Updates a task based on the provided task ID and data.
 * 
 * @param {Object} req - The request object
 * @param {string} req.body.id - The ID of the task to update
 * @param {string} req.body.userId - The ID of the user making the request
 * @param {string} [req.body.category] - The new category for the task
 * @param {string} [req.body.name] - The new name for the task
 * @param {string} [req.body.description] - The new description for the task
 * @param {Object} res - The response object
 * @returns {Object} JSON response indicating the result of the task update
 * @throws {Object} JSON object indicating the error that occurred
 */
const updateTask = async (req, res) => {
    const taskId = req.body.id;

    try {
        const task = await taskModel.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: `Task not found` });
        }

        if (task.owner !== req.body.userId) {
            return res.status(403).json({ error: `You are not the owner of this task` });
        }

        if (req.body.category) {
            task.category = req.body.category;
        }

        if (req.body.name) {
            task.name = req.body.name;
        }

        if (req.body.description) {
            task.description = req.body.description;
        }

        const validationResult = taskSchema.validate({
            owner: task.owner,
            name: task.name,
            description: task.description,
            category: task.category,
        });

        if (validationResult.error) {
            return res.status(400).json({ error: validationResult.error.details[0].message });
        }

        await task.save();
        return res.status(200).json({ message: `Task updated successfully!` });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllTasks,
    searchTasks,
    addTask,
    deleteTask,
    updateTask,
};
