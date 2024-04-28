import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../User/ProfilePage.css'; 

function UserProfile() {
    const { login } = useParams();
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Assurez-vous que l'URL correspond exactement à ce que votre backend attend
                const response = await axios.get(`http://localhost:3000/api/users/profile/login/${login}`);
                setUserProfile(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setError('Failed to fetch user profile');
            }
        };

        const fetchUserMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/messages/login/${login}`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
                setError('Failed to fetch messages');
            }
        };

        fetchUserProfile();
        fetchUserMessages();
    }, [login]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userProfile) {
        return <div>Loading user profile...</div>;
    }

    return (
        <div className="user-profile-container">
            <h2>Profil de {userProfile.login}</h2>
            <div className="profile-detail"><strong>Email:</strong> {userProfile.email}</div>
            <div className="profile-detail"><strong>Nom d'utilisateur:</strong> {userProfile.login}</div>
            <div className="profile-detail"><strong>Prénom:</strong> {userProfile.firstName}</div>
            <div className="profile-detail"><strong>Nom:</strong> {userProfile.lastName}</div>
            <div className="profile-messages">
                <h2>Messages de {userProfile.login}:</h2>
                {messages.map((message) => (
                    <div key={message._id} className="message">
                        <h3>{message.titre}</h3>
                        <p>{message.texte}</p>
                        <span>{message.login} - {new Date(message.date).toLocaleString()}</span>
                        <button onClick={() => handleResponse(message._id)}>Répondre</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserProfile;
