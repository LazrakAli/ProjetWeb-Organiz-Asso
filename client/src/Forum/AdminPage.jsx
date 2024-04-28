import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import './MainPage.css'; 
import { useNavigate } from 'react-router-dom';

function AdminPage() {
    const [title, setTitle] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [hiddenMessages, setHiddenMessages] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.admin) {
            navigate('/');
        } else {
            const fetchHiddenMessages = async () => {
                try {
                    const response = await axios.get('http://localhost:3000/api/messages/hide');
                    setHiddenMessages(response.data);
                } catch (error) {
                    console.error('Erreur lors de la récupération des messages cachés', error);
                }
            };
            fetchHiddenMessages();
        }
    }, [user, navigate]);

    const handleNewHiddenMessage = async () => {
        if (!title.trim() || !newMessage.trim()) {
            alert('Le titre et le message sont requis.');
            return;
        }
        try {
            const messageData = {
                titre: title,
                texte: newMessage,
                login: user.login,
                visible: false
            };
            const response = await axios.post('http://localhost:3000/api/messages/hide', messageData);
            const savedMessage = response.data.savedMessage;
            setHiddenMessages([savedMessage, ...hiddenMessages]);
            setTitle('');
            setNewMessage('');
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message caché', error.response ? error.response.data : error);
        }
    };

    const handleResponse = (messageId) => {
        navigate(`/messages/${messageId}`);
    };
    return (
        <div className="admin-page">
            {user && user.admin ? (
                <>
                    <h2>Publier un nouveau message caché</h2>
                    <div className="new-message-form">
                        <input
                            type="text"
                            placeholder="Titre du message"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="Votre message"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button onClick={handleNewHiddenMessage}>Publier caché</button>
                    </div>
                    <h2>Messages cachés</h2>
                    <div className="hidden-messages">
                        {hiddenMessages.map((message) => (
                            <div key={message._id} className="message">
                                <h3>{message.titre}</h3>
                                <p>{message.texte}</p>
                                <span>{message.login} - {new Date(message.date).toLocaleString()}</span>
                                <button onClick={() => handleResponse(message._id)}>Répondre</button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                null
            )}
        </div>
    );
}

export default AdminPage;
