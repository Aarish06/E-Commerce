import type { Product } from "../types/Product";

const API_BASE_URL = "http://localhost:3000/api";

class ProductRepository {
  private products: Product[] = [];

  getAll(): Product[] {
    return this.products;
  }

  async loadAll(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    this.products = data.data || [];
    return this.products;
  }

  async create(product: Omit<Product, "id">): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error("Failed to create product");
    }
    const data = await response.json();
    return data.data;
  }

  async update(updatedProduct: Product): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${updatedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    if (!response.ok) {
      throw new Error("Failed to update product");
    }
    const data = await response.json();
    return data.data;
  }

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
  }

  async rateProduct(id: number, isLike: boolean): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/products/${id}/rate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isLike }),
    });
    if (!response.ok) {
      throw new Error("Failed to rate product");
    }
  }

  saveAll(products: Product[]): void {
    this.products = products;
  }
}

export const productRepository = new ProductRepository();