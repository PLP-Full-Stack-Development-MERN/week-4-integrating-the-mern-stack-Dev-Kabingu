import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const TaskDetails = () => {
    const [task, setTask] = useState(null)
    const {id} = useParams()

    useEffect ( () => {
        axios.get(`http://localhost:5000/task/${id}`)
        .then(result => setTask(result.data))
        .catch(error => console.log(error))
    }, [id])
    if (!task){
        return (
            <div>Loading ......</div>
        )
    }
  return (
    <>
    <div className='container mx-auto mt-10'>
        <h2 className='text-2xl font-bold mb-4'>Task Details</h2>
        <p><strong>Title:</strong> {task.title}</p>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Date:</strong> {task.date}</p>
         <Link to = "/"><button className='bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4'>Back to Tasks</button></Link>
    </div>
    </>
  )
}

export default TaskDetails
