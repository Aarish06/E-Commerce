import React from 'react'
import { NavLink } from 'react-router-dom';
import './navbar.css'
import SearchBar from './searchbar';
import logo from '../assets/logo.svg'

const Navbar = () => {
  return (
    <div className="navbar">

      {/* TOP BAR */}
      <div className="logo">
        <NavLink to="/">
          <img src={logo} alt="Logo" />
        </NavLink>
      </div>

      {/* BOTTOM BAR */}
      <div className="nav-bottom">
        <div className="searchbar">
          <SearchBar />
        </div>

        <nav className="menu">
          <ul className="menu-btn">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/About">About</NavLink></li>
            <li><NavLink to="/Cart">MyCart</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/Productlist">Products</NavLink></li> 
            <li><NavLink to="/Addproduct">Add product</NavLink></li>  

          </ul>
        </nav>

        <div className="auth-buttons">
          <NavLink to="/login">
            <button className="login-btn">Login</button>
          </NavLink>
          <NavLink to="/login">
            <button className="signup-btn">Sign Up</button>
          </NavLink>
        </div>
      </div>

    </div>
  );
};

export default Navbar;