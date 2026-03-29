import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Components/Navbar'
import CategoryBar from "./Components/CategoryBar";
import HomePage from "./pages/homepage";

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <CategoryBar/>
      <HomePage/>
    </BrowserRouter>
  )
}

export default App
