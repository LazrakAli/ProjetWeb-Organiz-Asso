import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ onSearchResult, visibility }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Fonction pour gérer la recherche des messages
    const handleSearch = async () => {
        try {
            // Utilisation directe de la propriété de visibilité pour choisir l'endpoint
            const endpoint = visibility ? 'reveal' : 'hide';
            const response = await axios.get(`http://localhost:3000/api/messages/${endpoint}/search?term=${searchTerm}`);
            onSearchResult(response.data); // Appel de la fonction de gestion des résultats de recherche
        } catch (error) {
            console.error('Erreur lors de la recherche :', error); // Log des erreurs en français
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-bar-input" // Classe pour l'input
                placeholder="Chercher un auteur,ou un mot-clé"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-bar-button" onClick={handleSearch}>Chercher</button>
        </div>
    );
}

export default SearchBar;
