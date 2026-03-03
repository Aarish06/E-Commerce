import {
  createContext,
  useContext,
  useState,
  type ReactNode
} from "react";
import type { User, Role } from "../types/User";
import { authService } from "../services/authService";

type AuthContextType = {
  user: User | null;
  role: Role | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);


/**
 * Provides authentication state and actions to all child components.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);


  /**
   * Attempts to log in a user using the auth service.
   * Returns true if successful, otherwise false.
   */
  const login = (username: string, password: string): boolean => {
    const foundUser = authService.login(username, password);

    if (!foundUser) return false;

    setUser(foundUser);
    return true;
  };
  /**
   * Logs out the current user by clearing the user state.
   */
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        isLoggedIn: !!user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access authentication context.
 *
 * Must be used within an AuthProvider.
 *
 * @throws Error if used outside of AuthProvider
 * @returns AuthContextType
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};