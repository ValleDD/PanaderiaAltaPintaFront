import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface AuthContextType {
    auth: string | null;
    login: (correo_electronico: string, contrasena: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<string | null>(null);

    useEffect(() => {
        const loadAuthToken = async () => {
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                setAuth(token);
            }
        };
        loadAuthToken();
    }, []);

    const login = async (correo_electronico: string, contrasena: string) => {
        try {
            const response = await axios.post('http://192.168.1.38:3001/api/user/login', { correo_electronico, contrasena });

            if (response.status === 200) {
                const { token } = response.data;
                setAuth(token);
                await AsyncStorage.setItem('authToken', token);
            } else {
                throw new Error(response.data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    };

    const logout = async () => {
        setAuth(null);
        await AsyncStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};