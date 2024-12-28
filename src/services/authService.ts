import axios from "axios";

const API_URL = "http://localhost:3333/api/auth"; // Cambia según tu backend

// Función para iniciar sesión
export const login = async (username: string, password: string): Promise<string | null> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    const token = response.data.token;

    if (token) {
      // Guarda el token en localStorage
      localStorage.setItem("token", token);
    }

    return token;
  } catch (error: any) {
    console.error("Error en el inicio de sesión:", error.response || error.message);
    throw new Error(error.response?.data?.message || "Error desconocido al iniciar sesión");
  }
};

// Función para registrar un usuario
export const register = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Error de respuesta del servidor (código 4xx o 5xx)
      throw new Error(`Error del servidor: ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      // No se recibió ninguna respuesta del servidor
      throw new Error("No se pudo conectar al servidor");
    } else {
      // Error al configurar la solicitud
      throw new Error(`Error desconocido: ${error.message}`);
    }
  }
};

// Función para cerrar sesión
export const logout = () => {
  // Elimina el token de localStorage
  localStorage.removeItem("token");
};

// Función para obtener el token de localStorage
export const getToken = (): string | null => {
  const token = localStorage.getItem("token");
  return token;
};

// Función para obtener el usuario autenticado
export const getAuthenticatedUser = async () => {
  const token = getToken();

  if (!token) {
    throw new Error("Usuario no autenticado");
  }

  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`, // Envía el token en el encabezado
      },
    });

    return response.data; // Devuelve los datos del usuario
  } catch (error: any) {
    // Detallamos más el manejo de errores
    if (error.response) {
      console.error("Error al obtener el usuario autenticado:", error.response.data || error.response.statusText);
      throw new Error(error.response?.data?.message || "Error desconocido al obtener el usuario");
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor al obtener el usuario");
      throw new Error("No se pudo conectar al servidor al obtener el usuario");
    } else {
      console.error("Error desconocido al obtener el usuario:", error.message);
      throw new Error("Error desconocido al obtener el usuario");
    }
  }
};
