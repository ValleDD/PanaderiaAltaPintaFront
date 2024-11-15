import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Define el tipo de contexto para la autenticación
interface AuthContextType {
  auth: string | null; // Token de autenticación
  login: (correo_electronico: string, contraseña: string) => Promise<void>; // Función para iniciar sesión
  logout: () => Promise<void>; // Función para cerrar sesión
}

// Crea el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor de autenticación
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Estado para almacenar el token de autenticación
  const [auth, setAuth] = useState<string | null>(null);

  // Cargar el token de autenticación cuando el componente se monta
  useEffect(() => {
    const loadAuthToken = async () => {
      const token = await AsyncStorage.getItem("authToken"); // Obtener el token de AsyncStorage
      if (token) {
        setAuth(token); // Actualizar el estado con el token
      }
    };
    loadAuthToken();
  }, []);

  // Función para iniciar sesión
  const login = async (correo_electronico: string, contraseña: string) => {
    try {
      const response = await axios.post(
        "http://192.168.1.38:3001/api/user/login",
        { correo_electronico, contraseña }
      );

      if (response.status === 200) {
        const { token } = response.data;
        setAuth(token); // Actualizar el estado con el nuevo token
        await AsyncStorage.setItem("authToken", token); // Almacenar el token en AsyncStorage
      } else {
        throw new Error(response.data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    setAuth(null); // Borrar el token de autenticación del estado
    await AsyncStorage.removeItem("authToken"); // Eliminar el token de AsyncStorage
  };

  // Proporcionar el contexto de autenticación y las funciones de inicio y cierre de sesión a los componentes hijos
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
};
