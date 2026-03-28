import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Components/Navbar'
import CategoryBar from "./Components/CategoryBar";

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <CategoryBar/>
    </BrowserRouter>
  )
}

export default App
