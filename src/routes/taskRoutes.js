const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTasks);
router.post('/searchTasks', taskController.searchTasks);
router.post('/addTask', taskController.addTask);
router.delete('/deleteTask', taskController.deleteTask);
router.put('/updateTask', taskController.updateTask);

module.exports = router;
