import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import axios from 'axios';
import './ProfilePage.css'; 

function ProfilePage() {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [editText, setEditText] = useState('');

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:3000/api/messages/${user.login}`)
                 .then(response => setMessages(response.data))
                 .catch(error => console.error('Error fetching messages:', error));
        }
    }, [user]);

    const handleDeleteMessage = async (messageId) => {
        try {
            await axios.delete(`http://localhost:3000/api/messages/${messageId}`);
            setMessages(messages.filter(message => message._id !== messageId));
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const updateMessage = async (messageId, updatedText) => {
        try {
            await axios.put(`http://localhost:3000/api/messages/${messageId}`, { texte: updatedText });
            // Mettre à jour les messages après la modification réussie
            const updatedMessages = messages.map(message => {
                if (message._id === messageId) {
                    return { ...message, texte: updatedText };
                }
                return message;
            });
            setMessages(updatedMessages);
            setEditingMessageId(null); // Pour désactiver le mode édition
        } catch (error) {
            console.error('Error modifying message:', error);
        }
    };

    const handleKeyDown = (e, messageId) => {
        if (e.key === 'Enter') {
            updateMessage(messageId, editText);
        }
    };

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
                                {editingMessageId === message._id ? (
                                    <textarea 
                                        className="edit-textarea"
                                        defaultValue={message.texte} 
                                        onChange={(e) => setEditText(e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, message._id)}
                                    />
                                    ) : (
                                        <p>{message.texte}</p>
                                    )}
                            <span>{message.login} - {new Date(message.date).toLocaleString()}</span>
                            <button className="delete-button" onClick={() => handleDeleteMessage(message._id)}>Supprimer</button>
                            <button className="modif-button" onClick={() => setEditingMessageId(message._id)}>Modifier</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
