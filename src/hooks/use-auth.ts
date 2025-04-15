import { useNavigate } from "react-router-dom";

// src/hooks/useAuth.ts
export const useAuth = () => {
    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;
  
    return { token, isAuthenticated };
  };
  