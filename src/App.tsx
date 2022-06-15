import React from 'react';
import Menu from './components/menu/index';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Recommend from './pages/recommend'
import Prepare from './pages/prepare'
import Cloud from './pages/cloud'
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Menu></Menu>
      <Routes>
        <Route path="*" element={<Navigate to="/Recommend" />} />
        <Route path="/recommend" element={<Recommend/>} />
        <Route path="/prepare" element={<Prepare/>} />
        <Route path="/cloud" element={<Cloud/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
