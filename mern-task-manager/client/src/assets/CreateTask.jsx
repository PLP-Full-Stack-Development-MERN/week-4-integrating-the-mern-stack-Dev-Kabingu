import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom'
 
const createTask = () => {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [status, setStatus] = useState()
    const [date, setDate] = useState()
    const navigate = useNavigate()

    // button
    const submit = (e) => {
        e.preventDefault()
        const formdata= {
            title, description, status, date
        }
        axios.post("http://localhost:5000/CreateTask", formdata)
        .then(result => {
            console.log(result)
            navigate('/')
        })
        .catch(error => console.log(error))
    }
  
  return (
    <>
    <div>
        <div className='w-full flex align-center mt-20 justify-center'>

            <form className='w-sm' onSubmit={submit}>
                <h2 className='font-bold text-2xl mb-5'>Add Task</h2>
                <div className='mb-2'>
                    <label htmlFor="" className='block text-xl'>Title:</label>
                    <input type="text" required placeholder='Task title' className='w-full border p-2 text-3xs mt-2' 
                    onChange={ (e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='mb-2'>
                <label htmlFor="" className='block text-xl'>Decription:</label>
                <textarea name="description" id="description"required placeholder='Task description' className='w-full border p-2 text-3xs mt-2' 
                onChange={ (e) => setDescription(e.target.value)} ></textarea>
            </div>
                <div className='mb-2'>
                    <label htmlFor="" className='block text-xl'>Status:</label>
                    <select name="status" id="status" className='border w-full p-2 text-3xs mt-2' onChange={ (e) => setStatus(e.target.value)} >
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <div className='mb-2'>
                    <label htmlFor="" className='block text-xl'>Date:</label>
                    <input type="date" required placeholder='Task date' className='w-full border p-2 text-3xs mt-2' onChange={ (e) => setDate(e.target.value)}/>
                </div>
                    <button type='submit' className='bg-blue-600 text-white font-bold py-2 px-4  rounded mt-4'> Insert Task</button>
                </div>
            </form>
        </div>
      
    </div>
    </>
  )
}

export default createTask
