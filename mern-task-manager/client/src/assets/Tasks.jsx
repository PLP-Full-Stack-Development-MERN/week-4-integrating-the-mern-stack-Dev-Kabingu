import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Tasks = () => {
    const [tasks, setTasks] = useState ([])
    const navigate = useNavigate()

    useEffect ( () => {
      axios.get("http://localhost:5000")
      .then(result => setTasks(result.data))
      .catch(error => console.log(error))

    }, [])
    
    const DeleteTask = (taskId) => {
      if (window.confirm('Confirm task deletion'))
        axios.delete(`http://localhost:5000/task/${taskId}`)
        .then( () => {
          setTasks(tasks.filter(task => task._id !==taskId))
          alert('Task deleted')
        })
        .catch(error => console.log(error))
    }
    // getting a specific task
    const viewTaskDetails = (taskId) => {
      navigate(`/task/${taskId}`)
    }

  return (
   <>
       <div className="container mx-auto mt-10">
        <Link to = '/create'> 
        <button className='bg-blue-600 text-white font-bold py-2 px-4 mx-2 rounded'>Add +</button> </Link>
      <table className="min-w-full bg-white border border-gray-200 mt-2">
        <thead className="bg-blue-600 text-white text-left">
          <tr>
          <th className="w-1/5 px-2 py-2">S/No</th>
            <th className="w-1/5 px-2 py-2">Title</th>
            <th className="w-1/5 px-2 py-2">Decription</th>
            <th className="w-1/5 px-2 py-2">Status</th>
            <th className="w-1/5 px-2 py-2">Date</th>
            <th className="w-1/5 px-2 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
        {
        tasks.map((task, index) => (
              <tr key={index} className="bg-gray-100 border-b"  onClick={() => viewTaskDetails(task._id)}>
                <td className="px-2 py-2 border border-gray-200">{index + 1}</td>
                <td className="px-2 py-2  border border-gray-200">{task.title}</td>
                <td className="px-2 py-2 border border-gray-200">{task.description}</td>
                <td className="px-2 py-2 border border-gray-200">{task.status}</td>
                <td className="px-2 py-2 border border-gray-200">{task.date}</td>
                <td className="px-2 py-2 border border-gray-200">
                    <Link to = {`/update/${task._id}`}>
                    <button className='bg-blue-600 text-white font-bold py-2 px-4 mx-2 rounded'>Edit</button> 
                    </Link>
                    <button className='bg-red-600 text-white font-bold py-2 px-4 rounded'
                    onClick={ () => DeleteTask(task._id)}
                    >Delete</button></td>
              </tr>
            ))
            }
        </tbody>
      </table>
    </div>
   </>
  )
}

export default Tasks
