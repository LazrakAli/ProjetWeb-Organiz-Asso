import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    // Initialise l'état user avec les données du localStorage ou null si non disponible
    const [user, setUser] = useState(() => {
        const storedUserData = localStorage.getItem('user');
        return storedUserData ? JSON.parse(storedUserData) : null;
    });

    useEffect(() => {
        // Écoute les changements sur l'objet user pour mettre à jour le localStorage
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = (userData) => {
        setUser(userData); // Met à jour l'état avec les données de l'utilisateur connecté
    };

    const logout = () => {
        setUser(null); // Réinitialise l'état de l'utilisateur
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
