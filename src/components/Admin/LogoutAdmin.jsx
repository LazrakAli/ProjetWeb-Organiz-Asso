import React from 'react';
import { useAuthAdmin } from '../Auth/AuthContextAdmin'; // Importez AuthContextAdmin au lieu de AuthContext

function LogoutButton() {
    const { logoutAdmin } = useAuthAdmin(); // Utilisez logoutAdmin au lieu de logout

    const handleLogout = () => {
        // Ici, vous pouvez effectuer toute action supplémentaire nécessaire avant la déconnexion, comme vider le panier, etc.
        logoutAdmin(); // Appelez logoutAdmin pour déconnecter l'administrateur
    };

    return (
        <button onClick={handleLogout}>Déconnexion</button>
    );
}

export default LogoutButton;
