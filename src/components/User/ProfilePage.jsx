import React from 'react';
import { useAuth } from '../Auth/AuthContext';
import './ProfilePage.css'; 

function ProfilePage() {
    const { user } = useAuth();

    if (!user) {
        return <div>Chargement du profil...</div>;
    }

    return (
        <div className="profile-container">
            <h2>Profil de {user.login}</h2>
            <div className="profile-detail"><strong>Email:</strong> {user.email}</div>
            <div className="profile-detail"><strong>Nom d'utilisateur:</strong> {user.login}</div>
            <div className="profile-detail"><strong>Prenom:</strong> {user.firstName}</div>
            <div className="profile-detail"><strong>Nom:</strong> {user.lastName}</div>
            <div className="profile-detail">
              <strong>Vos publications:</strong> {user.publication || 'Aucune publication'}
            </div>
        </div>
    );
}

export default ProfilePage;