import api from "./axios";

export const culqiCobrar = async (pago) => {

  try {
    const response = await api.post("/culqi/cobrar", pago);
  return response.data;
  } catch (error) {
    throw error;
  }
};