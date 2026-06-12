import { createContext, useContext, useState, useEffect } from "react";
import { getUsuario, getCuenta, saveUsuario, saveCuenta, clearSession } from "../utils/storage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cuenta, setCuenta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUsuario = getUsuario();
    const storedCuenta = getCuenta();
    if (storedUsuario) setUsuario(storedUsuario);
    if (storedCuenta) setCuenta(storedCuenta);
    setIsLoading(false);
  }, []);

  const login = (usuarioData, cuentaData) => {
    saveUsuario(usuarioData);
    saveCuenta(cuentaData);
    setUsuario(usuarioData);
    setCuenta(cuentaData);
  };

  const logout = () => {
    clearSession();
    setUsuario(null);
    setCuenta(null);
  };

  const isAuthenticated = !!usuario;

  return (
    <AuthContext.Provider value={{ usuario, cuenta, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;
