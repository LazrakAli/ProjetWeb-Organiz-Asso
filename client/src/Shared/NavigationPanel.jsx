import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import './NavigationPanel.css';

function NavigationPanel() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', backgroundColor: user && user.admin ? '#FF7F00' : '#f4f4f4' }}>
            <div>
                {/* Liens accessibles par tous les utilisateurs connectés */}
                {user && (
                    <>
                        <Link to="/home">Accueil</Link>
                        <Link to={`/profile/:userId`}>Mon Profil</Link>
                    </>
                )}

                {/* Liens supplémentaires pour les administrateurs */}
                {user && user.admin && (
                    <>
                        <Link to="/users">Utilisateurs</Link>
                        <Link to="/admin/Page">AdminPage</Link>
                    </>
                )}
            </div>
            <div>
                {user && (
                    <button onClick={handleLogout} className="logout-button">Se déconnecter</button>
                )}
            </div>
        </nav>
    );
}

export default NavigationPanel;
