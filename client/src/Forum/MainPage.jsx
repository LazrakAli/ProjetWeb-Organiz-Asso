import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import SearchBar from '../User/SearchBar';
import { useNavigate, Link } from 'react-router-dom';

function MainPage() {
    const [title, setTitle] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [latestMessages, setLatestMessages] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/');
        } else {
            fetchMessages();
        }
    }, [user, navigate]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/messages/');
            setLatestMessages(response.data);
            if (isSearching) setIsSearching(false);
        } catch (error) {
            console.error('Erreur lors de la récupération des derniers messages', error);
        }
    };

    const handleSearchResults = (results) => {
        setSearchResults(results);
        setIsSearching(true);
    };

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

    const displayedMessages = isSearching ? searchResults : latestMessages;

    return (
        <div className="main-page">
            {user ? (
                <>
                    <h2 className='titre'>Envoyer un nouveau message</h2>
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
                    <h2 className='titre'>Derniers messages publiés</h2>
                    <SearchBar onSearchResult={handleSearchResults} visibility={true} />
                    <div className="latest-messages">
                        {displayedMessages.map((message) => (
                            <div key={message._id} className="message">
                                <h3>{message.titre}</h3>
                                <p>{message.texte}</p>
                                <span>
                                    <Link to={`/user/${message.login}`}>{message.login}</Link> - {new Date(message.date).toLocaleString()}
                                </span>
                                <button onClick={() => navigate(`/messages/${message._id}`)}>Répondre</button>
                            </div>
                        ))}
                    </div>
                </>
            ) : null}
        </div>
    );
}

export default MainPage;
