import api from "./axios";

export const getUsuarioByDni = async (dni) => {
 try {
    const response = await api.get(`/usuario/selectDni/${dni}`);
    return response.data;
  } catch (error) {
    console.error('Error al consultar usuario:', error);
    throw error;
  }
};

export const createUsuario = async (usuarioData) => {
  console.log("Insertando Usuario Fase 1");

  try {
    console.log("Insertando Usuario Fase 2");
    const response = await api.post("/usuario/insert", usuarioData);
     console.log("Insertando Usuario Fase 3"+response.data);
  return response.data;
  } catch (error) {
    console.error('Error al insertar usuario:', error);
    throw error;
  }
};
//fetch("http://192.168.1.11:9000/api/dashboard/resumen")
export const posicionGlobal = async () => {
 try {
    const response = await api.get(`/dashboard/resumen`);
    return response.data;
  } catch (error) {
    console.error('Error al consultar posicion global:', error);
    throw error;
  }
};
