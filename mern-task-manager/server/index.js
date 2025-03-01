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
    .then(tasks => res.json(tasks))
    .catch(err => res.json(err))
})
// creating the apis
app.get('/', (req, res) => {
    TaskModel.find({})
    .then( tasks => res.json(tasks))
    .catch(error => res.json(error))
})
// Retrieve a record
// app.get("/getTask/:id", (req, res) => {
//     const id = req.params.id;
//     TaskModel.findById(id)
//     .then( tasks => res.json(tasks))
//     .catch(error => res.json(error))
// })
// update task
app.put("/updateTask/:id", (req, res) => {
    const id = req.params.id;
    TaskModel.findByIdAndUpdate(id, req.body, { new: true }) // Use findByIdAndUpdate for updating the task
    .then(task => res.json(task)) // Respond with the updated task
    .catch(err => res.json(err));
});

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