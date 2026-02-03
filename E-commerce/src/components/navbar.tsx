import React from 'react'
import { NavLink } from 'react-router-dom';
import './navbar.css'
import SearchBar from './searchbar';

type NavbarProps = {
  onSearch: (value: string) => void;
}
const Navbar = ({onSearch}: NavbarProps) => {
  return (
    <div className="navbar">

      {/* TOP BAR */}
      <div className="logo">
        <NavLink to="/">
          <img src="/logo.svg" alt="Logo" />
        </NavLink>
      </div>

      {/* BOTTOM BAR */}
      <div className="nav-bottom">
        <div className="searchbar">
          <SearchBar onSearch={onSearch}/>
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