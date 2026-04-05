import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
// import Dashboard from './pages/Dashboard';
// import Donations from './pages/Donations';
// import Beneficiaries from './pages/Beneficiaries';
// import Events from './pages/Events';
// import Setting from './pages/Setting';
import Layout from './layout/Layout';

import './App.css'

function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/dashboard" element={<Layout />}>
      {/* <Route index element={<Dashboard />} />
      <Route path="/donations" element={<Donations />} />
      <Route path="/beneficiaries" element={<Beneficiaries />} />
      <Route path="/events" element={<Events />} />
      <Route path="/setting" element={<Setting />} /> */}
      </Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
