import api from "./axios";

export const getInscripcionesByUsuario = async (usuarioId) => {
  const response = await api.get(`/inscripcion/selectAllxUsuario/${usuarioId}`);
  return response.data;
};

export const createInscripcion = async (inscripcionData) => {
  const response = await api.post("/inscripcion/insert", inscripcionData);
  return response.data;
};

export const getListInscripciones = async (eventoId) => {
  const response = await api.get(`/inscripcion/selectAllxEventos/${eventoId}`);
  return response.data;
};
