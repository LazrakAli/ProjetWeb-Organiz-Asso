import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import './MainPage.css';

function MainPage() {
    const [title, setTitle] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [latestMessages, setLatestMessages] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // Corrigez l'URL si nécessaire
                const response = await axios.get('http://localhost:3000/api/messages/');
                console.log(response.data);  // Ajoutez ceci pour voir les données renvoyées par l'API
                setLatestMessages(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des derniers messages', error);
            }
        };

        fetchMessages();
    }, []);


    const handleNewMessage = async () => {
        if (!title.trim() || !newMessage.trim()) {
            alert('Le titre et le message sont requis.');
            return;
        } try {
            const messageData = {
                titre: title, 
                texte: newMessage, 
                login: user.login, 
            };
            const response = await axios.post('http://localhost:3000/api/messages', messageData);
            const savedMessage = response.data.savedMessage; 
    
            // Mettre à jour l'état avec le nouveau message
            setLatestMessages([savedMessage, ...latestMessages]);
            setTitle(''); // Réinitialiser le titre dans l'état
            setNewMessage(''); // Réinitialiser le message dans l'état
        } catch (error) {
            console.error('Erreur lors de l\'envoi du message', error.response ? error.response.data : error);
        }
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
                                <span>{message.login} - {new Date(message.date).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p>Non connecté. Veuillez vous connecter ou vous inscrire.</p>
            )}
        </div>
    );
}

export default MainPage;
