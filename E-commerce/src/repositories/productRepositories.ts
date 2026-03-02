import type { Product } from "../types/Product";
import { testProducts } from "../data/testProducts";

class ProductRepository {

  private products: Product[] = [...testProducts];

  getAll(): Product[] {
    return this.products;
  }

  create(product: Product): void {
    this.products.push(product);
  }

  update(updatedProduct: Product): void {
    this.products = this.products.map(p =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
  }

  delete(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
  }

  saveAll(products: Product[]): void {
    this.products = products;
  }
}

export const productRepository = new ProductRepository();