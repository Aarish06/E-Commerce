import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { productService } from "../services/productService";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = () => {
    setProducts(productService.getProducts());
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loadProducts,
    addProduct: productService.addProduct.bind(productService),
    updateProduct: productService.updateProduct.bind(productService),
    deleteProduct: productService.deleteProduct.bind(productService),
    likeProduct: productService.likeProduct.bind(productService),
    dislikeProduct: productService.dislikeProduct.bind(productService),
    getTopLiked: productService.getTopLiked.bind(productService)
  };
}