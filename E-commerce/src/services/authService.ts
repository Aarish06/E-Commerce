import type { User } from "../types/User";
import { userRepository } from "../repositories/userRepository";

class AuthService {
  login(username: string, password: string): User | null {
    const user = userRepository.findByUsername(username);

    if (!user) return null;

    if (user.password !== password) return null;

    return user;
  }
}

export const authService = new AuthService();