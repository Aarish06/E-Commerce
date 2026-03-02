import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBanner } from "../hooks/useBanner";
import { useProducts } from "../hooks/useProducts";
import Banner from "../public/Banner.svg";
import "./home.css";
import type { Product } from "../types/Product";

const Home = () => {
  const { getTopLiked } = useProducts();

  const [topProducts, setTopProducts] = useState<Product[]>([]);

  useEffect(() => {
    const trending = getTopLiked(2);
    setTopProducts(trending);
  }, []);

  return (
    <>
      {/* MOST LIKED PRODUCTS */}
      <section>
        <div className="listings">
          <h2>Trending Now</h2>

          <div className="product-grid">
            {topProducts.map((p: any) => (
              <div key={p.id} className="product-card">
                {p.image && <img src={p.image} alt={p.name} />}
                <h3>{p.name}</h3>
                <p>${p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;