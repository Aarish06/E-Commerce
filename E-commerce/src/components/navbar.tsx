import React from 'react'
import { NavLink } from 'react-router-dom';
import './navbar.css'
import SearchBar from './searchbar';
import logo from "../public/logo.svg";
import {useAuth} from "../context/AuthContext";

type NavbarProps = {
  onSearch: (value: string) => void;
}
const Navbar = ({onSearch}: NavbarProps) => {
    const { role, isLoggedIn, logout } = useAuth();

  return (
    <div className="navbar">

      {/* TOP BAR */}
      <div className="logo">
        <NavLink to="/">
          <img src={logo} alt="p" />
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
            <li><NavLink to="/Cart">MyCart</NavLink></li>
            <li><NavLink to="/ProductList">Products</NavLink></li> 
            <li><NavLink to="/About">About</NavLink></li>
            {isLoggedIn && role === "admin" && (
              <li><NavLink to="/ProductPage">Add product</NavLink></li>  
            )}
          </ul>
        </nav>

        <div className="auth-buttons">
          {!isLoggedIn ? (
            <>
              <NavLink to="/login">
                <button className="login-btn">Login</button>
              </NavLink>
            </>
          ) : (
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;