import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import axios from 'axios';
import './ProfilePage.css'; 

function ProfilePage() {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:3000/api/messages/${user.login}`)
                 .then(response => setMessages(response.data))
                 .catch(error => console.error('Error fetching messages:', error));
        }
    }, [user]);

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
                <h2>Vos messages:</h2>
                <div className="user-messages">
                    {messages.map((message) => (
                        <div key={message._id} className="message">
                            <h3>{message.titre}</h3>
                            <p>{message.texte}</p>
                            <span>{message.login} - {new Date(message.date).toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
