import { productRepository } from "../repositories/productRepositories";
import type { Product } from "../types/Product";

class ProductService {

  getProducts(): Product[] {
    return productRepository.getAll();
  }

  addProduct(data: Omit<Product, "id" | "likes" | "dislikes">) {
    const newProduct: Product = {
      id: Date.now(),
      likes: 0,
      dislikes: 0,
      ...data
    };

    productRepository.create(newProduct);
  }

  updateProduct(product: Product) {
    productRepository.update(product);
  }

  deleteProduct(id: number) {
    productRepository.delete(id);
  }

  likeProduct(id: number) {
    const products = productRepository.getAll();
    const updated = products.map(p =>
      p.id === id ? { ...p, likes: p.likes + 1 } : p
    );
    productRepository.saveAll(updated);
  }

  dislikeProduct(id: number) {
    const products = productRepository.getAll();
    const updated = products.map(p =>
      p.id === id ? { ...p, dislikes: p.dislikes + 1 } : p
    );
    productRepository.saveAll(updated);
  }
  
  getTopLiked(limit: number) {
  return productRepository
    .getAll()
    .sort((a, b) => b.likes - a.likes)
    .slice(0, limit);
}
}

export const productService = new ProductService();