import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { useAuthAdmin } from '../Auth/AuthContextAdmin'; // Importer le hook useAuthAdmin
import './NavigationPanel.css';

function NavigationPanel() {
    const { user, logout } = useAuth();
    const { admin, logoutAdmin } = useAuthAdmin(); // Utiliser le hook useAuthAdmin
    const navigate = useNavigate();

    const handleLogout = () => {
        if (user) {
            logout();
        } else if (admin) {
            logoutAdmin();
        }
        navigate('/'); // Rediriger l'utilisateur vers la page d'accueil après la déconnexion
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', backgroundColor: admin ? '#c9302c' : '#f4f4f4' }}>
            {admin ? ( // Afficher les fonctionnalités spécifiques aux administrateurs
                <>
                    <Link to="/users">Users</Link>
                    <Link to="/messages">Messages</Link>
                    <button onClick={handleLogout} className="logout-button">Se déconnecter</button>
                </>
            ) : user ? (
                <>
                    <Link to="/">Accueil</Link>
                    <Link to={`/user/${user.id}`}>Mon Profil</Link>
                    <button onClick={handleLogout} className="logout-button">Se déconnecter</button>
                </>
            ) : (
                <>
                    <Link to="/">Accueil</Link>
                    <Link to="/login">Se connecter</Link>
                    <Link to="/signin">Inscription</Link>
                </>
            )}
        </nav>
    );
}

export default NavigationPanel;
