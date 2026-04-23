import { prisma } from "../lib/prisma";

export const userService = {
  async getAll() {
    return prisma.user.findMany();
  },

    async getById(id: string) {
  return prisma.user.findUnique({
    where: { id }
  });
},

  async create(data: {
  id: string;
  email: string;
  name: string;
}) {
  return prisma.user.create({
    data: {
      id: data.id,
      email: data.email,
      name: data.name
    }
  });
},

  async syncFromClerk(data: {
    id: string;
    email: string;
    name: string | null;
    avatarUrl: string | null;
  }) {
    return prisma.user.upsert({
      where: { id: data.id },
      update: {
        email: data.email,
        name: data.name,
        avatarUrl: data.avatarUrl,
      },
      create: {
        id: data.id,
        email: data.email,
        name: data.name,
        avatarUrl: data.avatarUrl,
      }
    });
  },

  async updateProfile(id: string, data: {
    name?: string;
    phone?: string;
    address?: string;
    avatarUrl?: string;
  }) {
    return prisma.user.update({
      where: { id },
      data
    });
  },

  async deleteById(id: string) {
    return prisma.user.delete({
      where: { id }
    });
  }
};
