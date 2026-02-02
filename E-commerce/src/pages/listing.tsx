import { useEffect, useState } from "react";
import "./addproduct.css";

type Product = {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="product-page">
      <h2>All Products</h2>

      {products.length === 0 && <p>No products available.</p>}

      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            {p.image && <img src={p.image} alt={p.name} />}
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <p>{p.description}</p>
            <button className='cartbtn'>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
