const express = require ("express")
const mongoose = require ("mongoose")
const cors = require ("cors")
const dotenv = require ("dotenv")
const TaskModel = require ("./model/TaskModel")


dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT
const mongoose_url = process.env.MONGO_URL

app.post("/CreateTask", (req, res) => {
    TaskModel.create(req.body)
    .then(tasks => res.status(200).json(tasks))
    .catch(err => res.json(err))
})
// get all the tasks
app.get('/', (req, res) => {
    TaskModel.find({})
    .then( tasks => res.json(tasks))
    .catch(error => res.json(error))
})

// update task
app.put("/updateTask/:id", (req, res) => {
    const id = req.params.id;
    TaskModel.findByIdAndUpdate(id, req.body, { new: true }) 
    .then(task => res.status(200).json(task)) 
    .catch(err => res.status(500).json(err));
});

// delete task
app.delete('/task/:id', (req, res) => {
    const id = req.params.id
    TaskModel.findByIdAndDelete(id)
    .then(removedTask => res.json({message: 'Task deleted'}))
    .catch(error => res.status(500).json({message: error.message}))
})
// getting a task details
app.get('/task/:id', (req, res) => {
    const id = req.params.id
    TaskModel.findById(id)
    .then(task => res.json(task))
    .catch(error => res.status(500).json({message: error.message}))
})
mongoose.connect(mongoose_url)
.then(() => {
    console.log("Database connection sucessful")
    app.listen(port, () => {
        console.log("Server running on port 5000")
    })
})
.catch(err => {
    console.error("Database connection error", err);
  });