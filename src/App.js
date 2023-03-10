import React from 'react';
import './App.css';
import { ContentTypeDataProvider } from './contexts/ContentTypeData';
import { CollectionDataProvider } from './contexts/CollectionData';
import { LoginDataProvider } from './contexts/LoginData';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';
import Login from './pages/Login';
import Home from './pages/Home';
import Signin from './pages/Signin';
function App() {
  return (
    <div>
      <ContentTypeDataProvider>
        <CollectionDataProvider>
          <LoginDataProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/signin' element={<Signin />} />
                <Route
                  path='/home'
                  element={
                    <ProtectedRoutes>
                      <Home />
                    </ProtectedRoutes>
                  }
                />
              </Routes>
            </BrowserRouter>
          </LoginDataProvider>
        </CollectionDataProvider>
      </ContentTypeDataProvider>
    </div>
  );
}

export default App;
