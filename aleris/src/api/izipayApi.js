import api from "./axios";

export const izipayCobrar = async (pago) => {
  try {
    const response = await api.post("/pagos/crear", pago);
  return response.data;
  } catch (error) {
    throw error;
  }
};