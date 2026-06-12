import api from "./axios";

export const getCuentaByDni = async (dni) => {
  const response = await api.get(`/cuenta/usuario/${dni}`);
  return response.data;
};

export const createCuenta = async (cuentaData) => {
  const response = await api.post("/cuenta/insert", cuentaData);
  return response.data;
};
