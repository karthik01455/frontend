import React from 'react';
import './App.css';
import { ContentTypeDataProvider } from './contexts/ContentTypeData';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signin from './pages/Signin';
function App() {
  return (
    <div>
      <ContentTypeDataProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ContentTypeDataProvider>
    </div>
  );
}

export default App;
