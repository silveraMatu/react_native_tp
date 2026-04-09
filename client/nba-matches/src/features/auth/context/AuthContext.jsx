import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../../core/api/client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("nba_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  const login = async (nickname, password) => {
    try {
      const res = await apiClient.post("/login", { nickname, password });
      const loggedUser = res.data;
      setUser(loggedUser);
      localStorage.setItem("nba_user", JSON.stringify(loggedUser));
      navigate("/"); 
    } catch (error) {
      console.error(error);
      throw new Error("Credenciales inválidas");
    }
  };

  const register = async (email, nickname, password) => {
    try {
      const res = await apiClient.post("/register", { email, nickname, password });
      const newUser = res.data;
      setUser(newUser);
      localStorage.setItem("nba_user", JSON.stringify(newUser));
      navigate("/"); 
    } catch (error) {
      console.error(error);
      throw new Error("Error al registrar la cuenta");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nba_user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  
  return context;
};