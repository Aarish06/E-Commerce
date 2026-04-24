import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import About from './pages/about';
import Profile from './pages/Profile';
import Navbar from './components/navbar';
import ProductPage from './pages/ProductPage';
import ProductList from './pages/ProductList';
import ProtectedRoute from './components/protectedRoutes';

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <BrowserRouter>
      <Navbar onSearch={setSearchQuery} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Productlist' element={<ProductList />} />
        <Route path='/ProductPage' element={<ProductPage />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/About' element={<About />} />
        <Route path='/Profile' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;