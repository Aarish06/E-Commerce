import { useState } from "react";

type Role = "admin" | "customer" | null;

/**
 * Custom authentication hook for managing basic role-based login state.
 * 
 * Provides:
 * - Current user role
 * - Login status
 * - login() and logout() actions
 */
export function useAuth() {
  const [role, setRole] = useState<Role>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
   * Logs in a user by setting their role
   * and marking them as authenticated.
   */
  const login = (selectedRole: Role) => {
    setRole(selectedRole);
    setIsLoggedIn(true);
  };
  
  /**
   * Logs out the current user and
   * resets authentication state.
   */
  const logout = () => {
    setRole(null);
    setIsLoggedIn(false);
  };

  return {
    role,      
    isLoggedIn,   
    login,       
    logout    
  };
}
