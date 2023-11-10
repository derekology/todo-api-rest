const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const app = express();

dotenv.config();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: `Welcome to my simple to-do list backend!` });
});

app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

module.exports = app;