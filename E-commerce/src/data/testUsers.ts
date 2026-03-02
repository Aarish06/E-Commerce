import type { User } from "../types/User";

export const testUsers: User[] = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "admin"
  },
  {
    id: 2,
    username: "customer",
    password: "customer123",
    role: "customer"
  }
];