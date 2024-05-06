import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';

function ListUsers() {
    const { user } = useAuth();  // Utiliser le contexte d'authentification
    const [unvalidatedUsers, setUnvalidatedUsers] = useState([]); // Utilisateurs non validés
    const [admins, setAdmins] = useState([]); // Administrateurs
    const [regularUsers, setRegularUsers] = useState([]); // Utilisateurs réguliers
    const [error, setError] = useState(''); // Gestion des erreurs

    useEffect(() => {
        if (user.admin) {
            fetchUsers(); // Charger les utilisateurs si l'utilisateur est admin
        } else {
            setError("Accès refusé : Vous devez être administrateur pour voir cette information.");
        }
    }, [user]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/users/ListUsers');
            const filteredUsers = response.data.filter(u => u._id !== user._id); // Exclure l'utilisateur courant des listes
            setUnvalidatedUsers(filteredUsers.filter(u => !u.profile_validee));
            setAdmins(filteredUsers.filter(u => u.admin));
            setRegularUsers(filteredUsers.filter(u => !u.admin && u.profile_validee));
        } catch (error) {
            console.error('Échec de la récupération des utilisateurs:', error);
            setError('Échec du chargement des utilisateurs');
        }
    };

    const handleAction = async (userId, action) => {
        try {
            // Modification des appels pour correspondre aux routes de l'API
            if (action === 'validate') {
                await axios.post(`http://localhost:3000/api/users/${userId}/validate`); // Appel pour valider un utilisateur
            } else if (action === 'delete') {
                await axios.delete(`http://localhost:3000/api/users/${userId}/delete`); // Appel pour supprimer un utilisateur
            } else {
                await axios.post(`http://localhost:3000/api/users/${userId}/${action}`); // Autres actions (promouvoir, rétrograder)
            }
            fetchUsers(); // Rafraîchir la liste après une action
        } catch (error) {
            console.error(`Échec de l'action sur l'utilisateur:`, error);
            setError(`Échec de l'action sur l'utilisateur`);
        }
    };

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return (
        <div className="user-list">
            <div>
                <h1 className='titre'>Utilisateurs en attente de validation</h1>
                <ul>
                    {unvalidatedUsers.map(user => (
                        <li key={user._id}>
                            {user.email}
                            <div className="button-container">
                                <button onClick={() => handleAction(user._id, 'validate')}>Valider</button>
                                <button onClick={() => handleAction(user._id, 'delete')}>Supprimer</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h1 className='titre'>Administrateurs</h1>
                <ul>
                    {admins.map(user => (
                        <li key={user._id}>
                            {user.login}
                            <div className="button-container">
                                <button onClick={() => handleAction(user._id, 'delete')}>Supprimer</button>
                                <button onClick={() => handleAction(user._id, 'demote')}>Rétrograder</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h1 className='titre'>Utilisateurs</h1>
                <ul>
                    {regularUsers.map(user => (
                        <li key={user._id}>
                            {user.login}
                            <div className="button-container">
                                <button onClick={() => handleAction(user._id, 'delete')}>Supprimer</button>
                                <button onClick={() => handleAction(user._id, 'promote')}>Promouvoir</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ListUsers;
