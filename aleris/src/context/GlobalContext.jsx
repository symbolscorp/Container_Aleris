import { createContext, useContext, useState, useCallback } from "react";
import { getInscripcionesByUsuario } from "../api/inscripcionApi";

const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [inscripciones, setInscripciones] = useState([]);
  const [inscripcionesLoading, setInscripcionesLoading] = useState(false);
  const [inscripcionesError, setInscripcionesError] = useState(null);

  const fetchInscripciones = useCallback(async (usuarioId) => {
    if (!usuarioId) return;
    setInscripcionesLoading(true);
    setInscripcionesError(null);
    try {
      const res = await getInscripcionesByUsuario(usuarioId);
      setInscripciones(res.data || []);
    } catch (err) {
      setInscripcionesError(err.message);
      setInscripciones([]);
    } finally {
      setInscripcionesLoading(false);
    }
  }, []);

  const clearInscripciones = () => {
    setInscripciones([]);
    setInscripcionesError(null);
  };

  return (
    <GlobalContext.Provider
      value={{
        inscripciones,
        inscripcionesLoading,
        inscripcionesError,
        fetchInscripciones,
        clearInscripciones,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error("useGlobal must be used within GlobalProvider");
  return ctx;
};

export default GlobalContext;
