import { useState } from "react";

type Role = "admin" | "customer" | null;

export function useAuth() {
  const [role, setRole] = useState<Role>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (selectedRole: Role) => {
    setRole(selectedRole);
    setIsLoggedIn(true);
  };

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
