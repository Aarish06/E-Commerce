import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { productService } from "../services/productService";

/**
 * Custom hook for managing product data.
 *
 * Provides:
 * - List of products
 * - Method to reload products
 * - CRUD operations delegated to productService
 * - Like/dislike functionality
 * - Utility to get top liked products
 */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  /**
   * Loads products from productService
   * and updates local state.
   */
  const loadProducts = () => {
    setProducts(productService.getProducts());
  };

  /**
   * Loads products when the component mounts.
   */
  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loadProducts,

    /** Adds a new product */
    addProduct: productService.addProduct.bind(productService),

    /** Updates an existing product */
    updateProduct: productService.updateProduct.bind(productService),

    /** Deletes a product by id */
    deleteProduct: productService.deleteProduct.bind(productService),

    /** Increments like count for a product */
    likeProduct: productService.likeProduct.bind(productService),

    /** Increments dislike count for a product */
    dislikeProduct: productService.dislikeProduct.bind(productService),

    /** Returns products sorted by highest likes */
    getTopLiked: productService.getTopLiked.bind(productService)
  };
}