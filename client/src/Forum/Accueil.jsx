import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { Link } from 'react-router-dom'; // Assurez-vous que Link est également importé
import './Acceuil.css'

function Accueil() {
    const { user } = useAuth(); // Assumer que `user` contient des infos de l'utilisateur connecté ou est `null` s'il n'est pas connecté
    const navigate = useNavigate(); // Remplacez useHistory par useNavigate

    // Effet pour rediriger l'utilisateur s'il est déjà connecté
    useEffect(() => {
        if (user) {
            navigate(`/user/${user.id}`); // Utilisez navigate au lieu de history.push
        }
    }, [user, navigate]); // Mettez à jour les dépendances de l'effet

    return (
        <div className="home-page">
            {user ? (
                <div>
                    <h1>Bienvenue, {user.name}!</h1>
                </div>
            ) : (
                <div>
                    <h1>Bienvenue sur notre site!</h1>
                    <p>Pour accéder aux fonctionnalités complètes, veuillez :</p>
                    <Link to="/login" className="btn btn-primary">Se connecter</Link>
                    <Link to="/signin" className="btn btn-secondary">Inscription</Link>
                </div>
            )}
        </div>
    );
}

export default Accueil;
