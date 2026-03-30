import { useProducts } from "../hooks/useProducts";
import { Navigate } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import type { Product } from "../types/Product";

const ProductPage = () => {
  const { products, loadProducts, addProduct, updateProduct, deleteProduct } = useProducts();


  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: ""
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId !== null) {
      const existing = products.find(p => p.id === editingId);
      if (!existing) return;

      const updatedProduct: Product = {
        ...existing,      
        name: form.name,
        price: parseFloat(form.price),
        description: form.description,
        image: form.image
      };

      updateProduct(updatedProduct);
      setEditingId(null);
    }

    loadProducts();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  function handleImage(event: ChangeEvent<HTMLInputElement>): void {
  const file = event.target.files?.[0];
    if (file) {
      setForm({...form, image: URL.createObjectURL(file)});
    }
}

return (
  <div className="product-page">
    <h2>{editingId ? "Edit Product" : "Add Product"}</h2>

    <form onSubmit={handleSubmit} className="product-form">
      <input
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <input type="file" accept="image/*" onChange={handleImage} />

      <button type="submit">
        {editingId ? "Update Product" : "Add Product"}
      </button>
    </form>
  </div>
);
};

export default ProductPage;