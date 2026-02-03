import React from "react";
import { NavLink } from 'react-router-dom';
import "./home.css";
 
const Home = () => {
  return (
    <section className="hero">
      <div className="banner">
        <NavLink to='/Productlist'>
          <img className="BannerSvg" src="/Banner.svg" alt="Banner" />
        </NavLink>
      </div>
    </section>
  );
};
 
export default Home;