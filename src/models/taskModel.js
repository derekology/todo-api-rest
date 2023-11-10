const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    owner: String,
    name: String,
    description: String,
    category: String
});

const taskModel = mongoose.model('tasks', taskSchema);

module.exports = taskModel