import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function ProfilePage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [editText, setEditText] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:3000/api/messages/login/${user.login}`)
                 .then(response => {
                     if (Array.isArray(response.data)) {
                         setMessages(response.data);
                     } else {
                         setError('Unexpected response structure');
                     }
                 })
                 .catch(error => {
                     console.error('Error fetching messages:', error);
                     setError('Failed to fetch messages');
                 });
        }
    }, [user]);

    const handleDeleteMessage = async (messageId) => {
        try {
            await axios.delete(`http://localhost:3000/api/messages/${messageId}`);
            setMessages(prev => prev.filter(message => message._id !== messageId));
        } catch (error) {
            console.error('Error deleting message:', error);
            setError('Failed to delete message');
        }
    };

    const updateMessage = async (messageId, updatedText) => {
        try {
            await axios.put(`http://localhost:3000/api/messages/${messageId}`, { texte: updatedText });
            const updatedMessages = messages.map(message => {
                return message._id === messageId ? {...message, texte: updatedText} : message;
            });
            setMessages(updatedMessages);
            setEditingMessageId(null);
        } catch (error) {
            console.error('Error updating message:', error);
            setError('Failed to update message');
        }
    };

    const handleKeyDown = (event, messageId) => {
        if (event.key === 'Enter' && editText.trim()) {
            updateMessage(messageId, editText);
        }
    };

    const handleResponse = (messageId) => {
        navigate(`/messages/${messageId}`);
    };

    if (!user) {
        return <div>Chargement du profil...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="profile-container">
            <h2 className='titre'>Profil de:  {user.login}</h2>
            <div className="profile-detail"><strong>Email:</strong> {user.email}</div>
            <div className="profile-detail"><strong>Nom d'utilisateur:</strong> {user.login}</div>
            <div className="profile-detail"><strong>Prénom:</strong> {user.firstName}</div>
            <div className="profile-detail"><strong>Nom:</strong> {user.lastName}</div>
            <div className="profile-detail"><strong>Admin:</strong> {user.admin ? 'Oui' : 'Non'}</div>
            <div className="profile-detail">
                <h2 className='titre'>Vos messages:</h2>
                <div className="user-messages">
                    {messages.map((message) => (
                        <div key={message._id} className="message">
                            <h3>{message.titre}</h3>
                            {editingMessageId === message._id ? (
                                <textarea 
                                    className="edit-textarea"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, message._id)}
                                />
                            ) : (
                                <p>{message.texte}</p>
                            )}
                            <span>{message.login} - {new Date(message.date).toLocaleString()}</span>
                            <button className="delete-button" onClick={() => handleDeleteMessage(message._id)}>Supprimer</button>
                            <button className="modif-button" onClick={() => { setEditingMessageId(message._id); setEditText(message.texte); }}>Modifier</button>
                            <button className="modif-button" onClick={() => handleResponse(message._id)}>Répondre</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
