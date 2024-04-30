import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext'; 

function PageReponse() {
    const [message, setMessage] = useState(null);
    const [responseText, setResponseText] = useState('');
    const [error, setError] = useState('');
    const { messageId } = useParams();
    const { user } = useAuth(); // Utilisation de useAuth pour obtenir les détails de l'utilisateur

    useEffect(() => {
        async function fetchMessage() {
            try {
                const messageResponse = await axios.get(`http://localhost:3000/api/messages/id/${messageId}`);
                setMessage(messageResponse.data);
            } catch (err) {
                console.error('Erreur de récupération :', err);
                setError('Erreur lors du chargement du message.');
            }
        }

        fetchMessage();
    }, [messageId]);

    const handleResponseSubmit = async () => {
        if (!user) {
            setError('Vous devez être connecté pour répondre.');
            return;
        }

        try {
            await axios.post(`http://localhost:3000/api/messages/${messageId}/responses`, {
                login: user.login,
                texte: responseText
            });

            const newResponse = {
                login: user.login,
                texte: responseText
            };

            // Mise à jour du message avec la nouvelle réponse
            setMessage(prevMessage => ({
                ...prevMessage,
                reponses: [...(prevMessage.reponses || []), newResponse]
            }));
            setResponseText('');
        } catch (err) {
            console.error('Erreur lors de la soumission du message :', err);
            setError('L\'envoi de la réponse a échoué.');
        }
    };

    return (
        <div className="page-reponse">
            {error && <div className="error">{error}</div>}

            {message ? (
                <div>
                    <h2>{message.titre}</h2>
                    <p>{message.texte}</p>
                    <p className='p_droite'>Publié par {message.login}</p>

                    <h3>Répondre au message</h3>
                    <textarea value={responseText} onChange={(e) => setResponseText(e.target.value)} />
                    <button onClick={handleResponseSubmit}>Envoyer</button>

                    <h3>Réponses</h3>
                    <ul>
                        {message.reponses && message.reponses.length > 0 ? (
                            message.reponses.map((resp, index) => (
                                <li key={index}>{resp.texte} - par {resp.login}</li>
                            ))
                        ) : (
                            <li>Aucune réponse pour le moment.</li>
                        )}
                    </ul>
                </div>
            ) : (
                <p>Chargement du message en cours...</p>
            )}
        </div>
    );
}

export default PageReponse;
