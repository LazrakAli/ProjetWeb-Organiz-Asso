import React from 'react';
import { Link } from 'react-router-dom'; 

function Accueil() {
    return (
        <div className="home-page">
            <div className="left-section">
                <img src="../../public/icone_de_la_page.ico" alt="Logo" className="site-logo" />
                <h1 className="site-title">Organiz'Asso</h1>
            </div>
            <div className="right-section">
                <h2 className="home-title">Bienvenue sur notre site!</h2>
                <p className="home-text">Pour accéder aux fonctionnalités complètes, veuillez vous inscrire.</p>
                <Link to="/login" className="button button-primary">Se connecter</Link>
                <Link to="/signin" className="button button-secondary">Inscription</Link>
            </div>
        </div>
    );
}

export default Accueil;
