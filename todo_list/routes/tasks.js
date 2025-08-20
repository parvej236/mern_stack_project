const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// INDEX - show all tasks + dashboard stats
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ dueDate: 1 });

    // Dashboard stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // midnight start of today
    const tasksDueToday = tasks.filter(task => {
      const due = new Date(task.dueDate);
      due.setHours(0, 0, 0, 0);
      return due.getTime() === today.getTime();
    }).length;

    res.render('index', { tasks, totalTasks, completedTasks, tasksDueToday });
  } catch (err) {
    console.log(err);
    res.send('Error loading tasks');
  }
});

// NEW - show form to create a task
router.get('/new', (req, res) => {
  res.render('new');
});

// CREATE - add new task
router.post('/', async (req, res) => {
  try {
    const { title, description, category, dueDate } = req.body;
    await Task.create({ title, description, category, dueDate });
    res.redirect('/tasks');
  } catch (err) {
    console.log(err);
    res.send('Error creating task');
  }
});

// EDIT - show edit form
router.get('/:id/edit', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.render('edit', { task });
  } catch (err) {
    console.log(err);
    res.send('Error loading edit form');
  }
});

// UPDATE - update task
router.put('/:id', async (req, res) => {
  try {
    const { title, description, category, dueDate, completed } = req.body;
    await Task.findByIdAndUpdate(req.params.id, {
      title,
      description,
      category,
      dueDate,
      completed: completed === 'on',
      updatedAt: Date.now()
    });
    res.redirect('/tasks');
  } catch (err) {
    console.log(err);
    res.send('Error updating task');
  }
});

// DELETE - remove task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/tasks');
  } catch (err) {
    console.log(err);
    res.send('Error deleting task');
  }
});

module.exports = router;
