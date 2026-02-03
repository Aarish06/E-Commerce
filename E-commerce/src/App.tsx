import React from 'react';
import {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Listing from './pages/addproduct';
import Login from './pages/login';
import About from './pages/about';
import Navbar from './components/navbar';
import Addproduct from './pages/addproduct';
import ProductList from './pages/listing';

const App = () => {
  const [searchQuery ,setSearchQuery] = useState("");
  return (
    <BrowserRouter>
    <Navbar onSearch={setSearchQuery}/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Productlist' element={<ProductList searchQuery={searchQuery}/>}></Route>
        <Route path='/Addproduct' element={<Addproduct/>}></Route><Route/>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/About' element={<About/>}></Route>      
      </Routes>
    </BrowserRouter>
  )
}

export default App;