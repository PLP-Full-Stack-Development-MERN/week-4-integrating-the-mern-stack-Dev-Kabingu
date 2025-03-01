import { useState } from 'react'

import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Tasks from './assets/Tasks'
import CreateTask from './assets/CreateTask'
import UpdateTask from './assets/UpdateTask'




function App() {
  

  return (
    <>
    <BrowserRouter >
      <Routes>
        <Route path = '/' element = {<Tasks />} />
        <Route path = "/Create" element = {<CreateTask />}/>
        <Route path = '/Update/:id' element = {<UpdateTask />} />
      </Routes>    
    </BrowserRouter>  
    </>
  )
}

export default App
