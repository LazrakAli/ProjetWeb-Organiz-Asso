import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

function NavigationPanel() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navigation-panel" >

            <div className="nav-links">
                {user && (
                    <>
                        <Link to="/home" className='nav-link'>Accueil</Link>
                        <Link to={`/profile/:userId`} className='nav-link'>Mon Profil</Link>
                        {user.admin && (
                            <>
                                <Link to="/users" className='nav-link'>Utilisateurs</Link>
                                <Link to="/admin/Page" className='nav-link'>AdminPage</Link>
                            </>
                        )}
                    </>
                )}
            </div>
            <div className="site-name">
                Organiz'Asso
            </div>
            <div className="logout-section">
                {user && (
                    <button onClick={handleLogout} className="logout-button">Se déconnecter</button>
                )}
            </div>
        </nav>
    );
}

export default NavigationPanel;
