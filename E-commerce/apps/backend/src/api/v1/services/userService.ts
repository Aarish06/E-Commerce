import { prisma } from "../lib/prisma";

export const userService = {
  async getAll() {
    try {
      return prisma.user.findMany();
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  },

  async getById(id: string) {
    try {
      return prisma.user.findUnique({
        where: { id }
      });
    } catch (error) {
      throw new Error("Failed to fetch user");
    }
  },

  async create(data: {
    id: string;
    email: string;
    name?: string;
    phone?: string;
    address?: string;
    avatarUrl?: string;
  }) {
    try {
      return prisma.user.create({
        data: {
          id: data.id,
          email: data.email,
          name: data.name || null,
          phone: data.phone || null,
          address: data.address || null,
          avatarUrl: data.avatarUrl || null
        }
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes("Unique constraint")) {
        throw new Error("Email already exists");
      }
      throw new Error("Failed to create user");
    }
  },

  async updateProfile(id: string, data: {
    name?: string;
    phone?: string;
    address?: string;
    avatarUrl?: string;
  }) {
    try {
      // Check if user exists first
      const existingUser = await prisma.user.findUnique({
        where: { id }
      });
      
      if (!existingUser) {
        throw new Error("User not found");
      }

      return prisma.user.update({
        where: { id },
        data
      });
    } catch (error) {
      if (error instanceof Error && error.message === "User not found") {
        throw error;
      }
      throw new Error("Failed to update profile");
    }
  },

  async deleteById(id: string) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { id }
      });
      
      if (!existingUser) {
        throw new Error("User not found");
      }

      return prisma.user.delete({
        where: { id }
      });
    } catch (error) {
      if (error instanceof Error && error.message === "User not found") {
        throw error;
      }
      throw new Error("Failed to delete user");
    }
  },
  async syncFromClerk(data: {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
}) {
  try {
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
  } catch (error) {
    throw new Error("Failed to sync user from Clerk");
  }
}
};
