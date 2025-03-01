const mongoose = require ("mongoose")

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        anum: ['in progress', 'pending', 'completed'],
        default: 'pending'
    },
    date: {
        type: Date,
        required: true
    }
})

const taskmodel = mongoose.model('tasks', taskSchema)

module.exports = taskmodel