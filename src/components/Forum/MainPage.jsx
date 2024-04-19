import React from 'react';
import { useAuth } from '../Auth/AuthContext';  // Assurez-vous que le chemin est correct
import './MainPage.css';

function MainPage() {
    const { user } = useAuth();  // Utiliser le contexte pour vérifier si l'utilisateur est connecté

    return (
        <div>
            {user ? (
                <p>Connecté. Bienvenue sur la page principale !</p>
            ) : (
                <p>Non connecté. Veuillez vous connecter ou vous inscrire.</p>
            )}
        </div>
    );
}

export default MainPage;
