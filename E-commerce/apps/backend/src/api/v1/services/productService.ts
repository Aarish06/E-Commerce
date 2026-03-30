import { prisma } from "../lib/prisma";

export const productService = {
  async getAll() {
    const products = await prisma.product.findMany({
      include: {
        ratings: true
      }
    });
    
    return products.map((product: any) => {
      const likes = product.ratings.filter((r: any) => r.isLike).length;
      const dislikes = product.ratings.filter((r: any) => !r.isLike).length;
      return {
        ...product,
        likes,
        dislikes,
        ratings: undefined
      };
    });
  },

  async getById(id: number) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { ratings: true }
    });
    
    if (!product) return null;
    
    const likes = product.ratings.filter((r: any) => r.isLike).length;
    const dislikes = product.ratings.filter((r: any) => !r.isLike).length;
    
    return {
      ...product,
      likes,
      dislikes,
      ratings: undefined
    };
  },

  async create(data: {
    name: string;
    price: number;
    description: string;
    image?: string;
    category: string;
    rating?: number;
  }) {
    return prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        image: data.image,
        category: data.category,
        rating: data.rating || 0
      }
    });
  },

  async update(id: number, data: {
    name?: string;
    price?: number;
    description?: string;
    image?: string;
    category?: string;
    rating?: number;
  }) {
    return prisma.product.update({
      where: { id },
      data
    });
  },

  async delete(id: number) {
    return prisma.product.delete({
      where: { id }
    });
  },

  async rate(productId: number, isLike: boolean, userId?: number) {
    const rating = await prisma.productRating.upsert({
      where: {
        productId_userId: {
          productId,
          userId: userId || 0
        }
      },
      update: {
        isLike
      },
      create: {
        productId,
        userId: userId || 0,
        isLike
      }
    });

    const allRatings = await prisma.productRating.findMany({
      where: { productId }
    });
    
    const likes = allRatings.filter((r: any) => r.isLike).length;
    const dislikes = allRatings.filter((r: any) => !r.isLike).length;
    const total = likes + dislikes;
    const newRating = total > 0 ? (likes / total) * 5 : 0;

    await prisma.product.update({
      where: { id: productId },
      data: { rating: newRating }
    });

    return { likes, dislikes, rating: newRating, userRating: rating };
  }
};
