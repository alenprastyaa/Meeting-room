import React from 'react'
import Navbars from './components/navbars/Navbars'
import Sidebars from './components/sidebars/Sidebars'
import { Route, Routes } from 'react-router-dom'
import PemesananRuang from './components/pemesanan/PemesananRuang'
import Dashboard from './components/dashboard/Dashboard'
import 'rsuite/dist/rsuite.min.css';
const App = () => {
  return (
    <div>
      <Navbars />
      <div className='flex'>
        <Sidebars />
        <Routes>
          <Route path="/pemesanan-ruang" element={<PemesananRuang />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  )
}

export default App