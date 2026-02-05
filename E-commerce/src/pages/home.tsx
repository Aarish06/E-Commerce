import React from "react";
import { NavLink } from 'react-router-dom';
import "./home.css";
import Banner from "../assets/Banner.svg"
import ProductList from "./listing";
 
const Home = () => {
  return (
    <>
      <section className="hero">
        <div className="banner">
          <NavLink to='/Productlist'>
            <img className = 'BannerSvg' src={Banner} alt="Logo" />
          </NavLink>
        </div>
      </section>
      <section>
        <div className="listings">
          <ProductList/>
        </div>
      </section>
    </>
  );
};
 
export default Home;