import api from "./axios";

export const getEventosActivos = async () => {
  const response = await api.get("/evento/selectAllActivos");
  return response.data;
};

export const getEventoById = async (id) => {
  const response = await api.get(`/evento/selectId/${id}`);
  return response.data;
};
