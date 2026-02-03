import { useEffect, useState} from "react";
import type {  ChangeEvent, FormEvent } from "react";
import "./addproduct.css";

type Product = {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
};

type ProductForm = {
  name: string;
  price: string;
  description: string;
  image: string;
};

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>({
    name: "",
    price: "",
    description: "",
    image: ""
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load products on refresh
  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  const saveToStorage = (data: Product[]) => {
    localStorage.setItem("products", JSON.stringify(data));
    setProducts(data);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingId !== null) {
      const updated = products.map((p) =>
        p.id === editingId ? { ...p, ...form } : p
      );
      saveToStorage(updated);
      setEditingId(null);
    } else {
      const newProduct: Product = {
        id: Date.now(),
        ...form
      };
      saveToStorage([...products, newProduct]);
    }

    setForm({ name: "", price: "", description: "", image: "" });
  };

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image
    });
    setEditingId(product.id);
  };

  const handleDelete = (id: number) => {
    const filtered = products.filter((p) => p.id !== id);
    saveToStorage(filtered);
  };

  return (
    <div className="product-page">
      <h2>{editingId ? "Edit Product" : "Add Product"}</h2>

      <form className="product-form" onSubmit={handleSubmit}>
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

        {form.image && (
          <img src={form.image} alt="Preview" className="image-preview" />
        )}

        <button type="submit">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <h2>Products</h2>

      {products.length === 0 && <p>No products yet.</p>}

      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            {p.image && <img src={p.image} alt={p.name} />}
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <p>{p.description}</p>

            <div className="card-actions">
              <button className="edit" onClick={() => handleEdit(p)}>
                Edit
              </button>
              <button className="delete" onClick={() => handleDelete(p.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
