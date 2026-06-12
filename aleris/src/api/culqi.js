import api from "./axios";

export const culqiCobrar = async (pago) => {
  console.log("Insertando Usuario Fase 1");

  try {
    console.log("Insertando Usuario Fase 2");
    const response = await api.post("/culqi/cobrar", pago);
     console.log("Insertando Usuario Fase 3"+response.data);
  return response.data;
  } catch (error) {
    console.error('Error al insertar usuario:', error);
    throw error;
  }
};