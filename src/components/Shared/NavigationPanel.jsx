import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import './NavigationPanel.css';

function NavigationPanel() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Rediriger l'utilisateur vers la page d'accueil après la déconnexion
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
            <Link to="/">Accueil</Link>
            {user ? (
                <>
                    <Link to={`/user/${user.id}`}>Mon Profil</Link>
                    <button onClick={handleLogout} className="logout-button">Se déconnecter</button>
                </>
            ) : (
                <>
                    <Link to="/login">Se connecter</Link>
                    <Link to="/signin">Inscription</Link>
                </>
            )}
        </nav>
    );
}

export default NavigationPanel;
