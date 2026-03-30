import { prisma } from "../lib/prisma";

export const userService = {
  async getAll() {
    return prisma.user.findMany();
  },

  async getById(id: number) {
    return prisma.user.findUnique({
      where: { id }
    });
  },

  async create(data: {
    email: string;
    name: string;
    password?: string;
  }) {
    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password
      }
    });
  }
};
