import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function useAuthAdmin() {
    return useContext(AuthContext);
}

export function AuthProviderAdmin({ children }) {
    const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('admin'))); // Charge l'administrateur à partir du stockage local

    useEffect(() => {
        // Met à jour le localStorage lorsque l'administrateur change
        localStorage.setItem('admin', JSON.stringify(admin));
    }, [admin]);

    const loginAdmin = (adminData) => {
        setAdmin(adminData);
        localStorage.setItem('admin', JSON.stringify(adminData)); // Sauvegarde l'administrateur dans le localStorage
    };

    const logoutAdmin = () => {
        setAdmin(null);
        localStorage.removeItem('admin'); // Supprime l'administrateur du localStorage
    };

    return (
        <AuthContext.Provider value={{ admin, loginAdmin, logoutAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}
