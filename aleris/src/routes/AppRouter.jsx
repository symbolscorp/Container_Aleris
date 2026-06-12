import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Eventos from "../pages/Eventos";
import EventoDetalle from "../pages/EventoDetalle";
import Perfil from "../pages/Perfil";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <Loading fullScreen text="Iniciando sesión..." />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <Loading fullScreen text="Iniciando..." />;
  return isAuthenticated ? <Navigate to="/home" replace /> : children;
};

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/eventos" element={<PrivateRoute><Eventos /></PrivateRoute>} />
      <Route path="/evento/:id" element={<PrivateRoute><EventoDetalle /></PrivateRoute>} />
      <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
