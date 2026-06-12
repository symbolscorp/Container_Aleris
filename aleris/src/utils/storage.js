const USUARIO_KEY = "usuario";
const CUENTA_KEY = "cuenta";

export const saveUsuario = (usuario) => {
  localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
};

export const getUsuario = () => {
  try {
    const data = localStorage.getItem(USUARIO_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveCuenta = (cuenta) => {
  localStorage.setItem(CUENTA_KEY, JSON.stringify(cuenta));
};

export const getCuenta = () => {
  try {
    const data = localStorage.getItem(CUENTA_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const clearSession = () => {
  localStorage.removeItem(USUARIO_KEY);
  localStorage.removeItem(CUENTA_KEY);
};
