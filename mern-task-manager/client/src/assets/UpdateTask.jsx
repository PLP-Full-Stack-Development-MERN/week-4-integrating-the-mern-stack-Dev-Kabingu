import React from 'react'
import { useParams,useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'


const UpdateTask = () => {
        const {id} = useParams();
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');
        const [status, setStatus] = useState('pending');
        const [date, setDate] = useState('');
        const navigate = useNavigate();
               
useEffect ( () =>{
    if (window.confirm('Are you sure you want to delete this task?'))
    axios.get (`http://localhost:5000/getTask/ ${id}`)
    .then(result => {
        console.log(result) 
        // const task = result.data
        setTitle(result.data.title)
        setDescription(result.data.description)
        setStatus(result.data.status)
        setDate(result.data.date)    
    })
    .catch(error => console.log(error))
}, [id]);

 // updating the data when update button is clicked
 const submit = (e) => {
    e.preventDefault()
    const formdata= {
        title,
       description, 
       status, 
       date
    }
    axios.put(`http://localhost:5000/UpdateTask/${id}`, formdata)
    .then(result => {
        console.log(result)
        navigate('/');
    })
    .catch(error => console.log(error))
}

  return (
    <div>
    <div className='w-full flex align-center mt-20 justify-center'>
        <form className='w-sm' onSubmit={submit}>

        <Link to ="/">  <button className='bg-blue-600 text-white font-bold py-2 px-4 mx-2 rounded'>Back</button> </Link>

            <h2 className='font-bold text-2xl mb-5'>Update Task</h2>
            <div className='mb-2'>
                <label htmlFor="" className='block text-xl'>Title:</label>
                <input type="text" required placeholder='Task title' className='w-full border p-2 text-3xs mt-2' 
                value = {title}onChange={ (e) => setTitle(e.target.value)}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="" className='block text-xl'>Decription:</label>
                <textarea name="description" id="description"required placeholder='Task description' className='w-full border p-2 text-3xs mt-2' value = {description} onChange={ (e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className='mb-2'>
                <label htmlFor="" className='block text-xl'>Status:</label>
                <select name="status" id="status" className='border w-full p-2 text-3xs mt-2' value = {status} onChange = { (e) => setStatus(e.target.value)}>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <div className='mb-2'>
                    <label htmlFor="" className='block text-xl'>Date:</label>
                    <input type="date" required placeholder='Task date' className='w-full border p-2 text-3xs mt-2' value ={date} onChange = { (e) => setDate(e.target.value)}/>
                </div>
                <button type='submit' className='bg-blue-600 text-white font-bold py-2 px-4  rounded mt-4'> Update Task</button>
            </div>
        </form>
    </div>
  
</div>
  )
}

export default UpdateTask