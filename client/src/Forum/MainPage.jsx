import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import './MainPage.css';
import { useNavigate, Link } from 'react-router-dom'; 

function MainPage() {
    const [title, setTitle] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [latestMessages, setLatestMessages] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate(); 

    useEffect(() => {
        if (!user) {
            navigate('/');
        } else {
            const fetchMessages = async () => {
                try {
                    const response = await axios.get('http://localhost:3000/api/messages/');
                    console.log(response.data);  
                    setLatestMessages(response.data);
                } catch (error) {
                    console.error('Erreur lors de la récupération des derniers messages', error);
                }
            };
            fetchMessages();
        }
    }, [user, navigate]); 

    const handleNewMessage = async () => {
        if (!title.trim() || !newMessage.trim()) {
            alert('Le titre et le message sont requis.');
            return;
        }
        try {
            const messageData = {
                titre: title, 
                texte: newMessage, 
                login: user.login, 
            };
            const response = await axios.post('http://localhost:3000/api/messages', messageData);
            const savedMessage = response.data.savedMessage; 
            setLatestMessages([savedMessage, ...latestMessages]);
            setTitle(''); 
            setNewMessage(''); 
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message', error.response ? error.response.data : error);
        }
    };

    // Fonction pour rediriger vers la page de réponse du message
    const handleResponse = (messageId) => {
        navigate(`/messages/${messageId}`);
    };

    return (
        <div className="main-page">
            {user ? (
                <>
                    <h2>Envoyer un nouveau message</h2>
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
                        <button onClick={handleNewMessage}>Envoyer</button>
                    </div>
                    <h2>Derniers messages publiés</h2>
                    <div className="latest-messages">
                        {latestMessages.map((message) => (
                                <div key={message._id} className="message">
                                <h3>{message.titre}</h3> 
                                <p>{message.texte}</p> 
                            <span>
                                <Link to={`/user/${message.login}`}>{message.login}</Link> - {new Date(message.date).toLocaleString()}
                                </span>
                                <button onClick={() => handleResponse(message._id)}>Répondre</button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                // Si aucun utilisateur n'est connecté, il sera redirigé à la racine '/'
                null
            )}
        </div>
    );
}

export default MainPage;
