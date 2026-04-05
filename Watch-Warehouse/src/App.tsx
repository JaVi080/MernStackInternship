import { useState } from 'react'
import { BrowserRouter ,Route,Routes} from 'react-router-dom'
import Navbar from './Components/Navbar'
import CategoryBar from "./Components/CategoryBar";
import HomePage from "./pages/homepage";
import ProductPage from "./pages/products";
import ProductDetails from "./pages/products-details";
import Footer from "./Components/footer";

import './App.css'
import FilterCategories from './Components/FilterCategories';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/category/:category" element={<FilterCategories />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
