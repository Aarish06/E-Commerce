import type { User } from "../types/User";
import { testUsers } from "../data/testUsers";

class UserRepository {
  private users: User[] = [...testUsers];

  getAll(): User[] {
    return this.users;
  }

  findByUsername(username: string): User | undefined {
    return this.users.find(u => u.username === username);
  }
}

export const userRepository = new UserRepository();