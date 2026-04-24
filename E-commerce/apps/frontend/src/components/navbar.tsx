import { NavLink } from 'react-router-dom';
import './navbar.css'
import SearchBar from './searchbar';
import logo from "../public/logo.svg";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

type NavbarProps = {
  onSearch: (value: string) => void;
}

const Navbar = ({onSearch}: NavbarProps) => {
  return (
    <div className="navbar">
      <div className="logo">
        <NavLink to="/">
          <img src={logo} alt="p" />
        </NavLink>
      </div>

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
            <SignedIn>
              <li><NavLink to="/Profile">Profile</NavLink></li>
            </SignedIn>
          </ul>
        </nav>

        <div className="auth-buttons">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="login-btn">Login</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Navbar;