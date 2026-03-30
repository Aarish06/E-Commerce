import React from 'react';
import {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import About from './pages/about';
import Navbar from './components/navbar';
import ProductPage from './pages/ProductPage';
import ProductList from './pages/ProductList';
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const [searchQuery ,setSearchQuery] = useState("");
  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar onSearch={setSearchQuery}/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Productlist' element={<ProductList/>}></Route>
          <Route path='/ProductPage' element={<ProductPage/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
          <Route path='/About' element={<About/>}></Route>      
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;