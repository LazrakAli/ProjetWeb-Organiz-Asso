import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))); // Charge l'utilisateur à partir du stockage local

    useEffect(() => {
        // Met à jour le localStorage lorsque l'utilisateur change
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Sauvegarde l'utilisateur dans le localStorage
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Supprime l'utilisateur du localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}