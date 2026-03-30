import { prisma } from "../lib/prisma";

export const bannerService = {
  async getAll() {
    return prisma.banner.findMany({
      where: { active: true }
    });
  },

  async create(data: {
    title: string;
    image: string;
    link?: string;
  }) {
    return prisma.banner.create({
      data: {
        title: data.title,
        image: data.image,
        link: data.link,
        active: true
      }
    });
  }
};
