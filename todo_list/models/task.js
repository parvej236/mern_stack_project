const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 500
    },
    dueDate: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Work', 'Personal', 'Urgent', 'Other'],
        default: 'Other'
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;