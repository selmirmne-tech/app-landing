import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Prijave from './Prijave.jsx'
import Login from "./Login.jsx";
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/prijave" element={<Prijave />} />
		<Route path="/login" element={<Login />} />
		
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)