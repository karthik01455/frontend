import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signin from './pages/Signin';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signin' element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
