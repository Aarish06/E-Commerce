import { useProducts } from "../hooks/useProducts";
import like from "../public/like.svg";
import dislike from "../public/dislike.svg";
import "./ProductPage.css";

const ProductList = () => {
  const {
    products,
    likeProduct,
    dislikeProduct,
    loadProducts
  } = useProducts();

  if (products.length === 0) {
    return <p>No products to show.</p>;
  }

  return (
    <div className="product-page">
      <h2>All Products</h2>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            {p.image && <img src={p.image} alt={p.name} />}
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <p>{p.description}</p>

            <button className="cartbtn">Add to cart</button>

            <div className="actionbtn">
              <button
                className="like"
                onClick={() => {
                  likeProduct(p.id);
                  loadProducts();
                }}
              >
                <img src={like} alt="Like" />
                <p>{p.likes}</p>
              </button>

              <button
                className="dislike"
                onClick={() => {
                  dislikeProduct(p.id);
                  loadProducts();
                }}
              >
                <img src={dislike} alt="Dislike" />
                <p>{p.dislikes}</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;