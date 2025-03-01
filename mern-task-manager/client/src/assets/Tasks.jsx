import axios from 'axios'
import React, { useState, useEffect } from 'react'

import {Link} from 'react-router-dom'

const Tasks = () => {
    const [tasks, setTasks] = useState ([])

    useEffect ( () => {
      axios.get("http://localhost:5000")
      .then(result => setTasks(result.data))
      .catch(error => console.log(error))

    }, [])
  return (
   <>
       <div className="container mx-auto mt-10">
        <Link to = '/create'> 
        <button className='bg-blue-600 text-white font-bold py-2 px-4 mx-2 rounded'>Add +</button> </Link>
      <table className="min-w-full bg-white border border-gray-300 mt-2">
        <thead className="bg-blue-600 text-white text-left">
          <tr>
            <th className="w-1/5 px-4 py-2">Title</th>
            <th className="w-1/5 px-4 py-2">Decription</th>
            <th className="w-1/5 px-4 py-2">Status</th>
            <th className="w-1/5 px-4 py-2">Date</th>
            <th className="w-1/5 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
        {
        tasks.map((task, index) => (
              <tr key={index} className="bg-gray-100 border-b">
                <td className="px-4 py-2">{task.title}</td>
                <td className="px-4 py-2">{task.description}</td>
                <td className="px-4 py-2">{task.status}</td>
                <td className="px-4 py-2">{task.date}</td>
                <td className="px-4 py-2">
                    <Link to = {`/update/${task._id}`}>
                    <button className='bg-blue-600 text-white font-bold py-2 px-4 mx-2 rounded'>Edit</button> 
                    </Link>
                    <button className='bg-red-600 text-white font-bold py-2 px-4 rounded'>Delete</button></td>
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
