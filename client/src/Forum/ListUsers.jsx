import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';
import './ListUsers.css';

function ListUsers() {
    const { user } = useAuth();
    const [unvalidatedUsers, setUnvalidatedUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [regularUsers, setRegularUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user.admin) {
            fetchUsers();
        } else {
            setError("Accès refusé : Vous devez être administrateur pour voir cette information.");
        }
    }, [user]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/users/ListUsers');    
            const filteredUsers = response.data.filter(u => u._id !== user._id); // Exclure l'utilisateur courant de toutes les listes
            setUnvalidatedUsers(filteredUsers.filter(u => !u.profile_validee));
            setAdmins(filteredUsers.filter(u => u.admin)); // Incluez la condition que l'administrateur courant n'est pas inclus
            setRegularUsers(filteredUsers.filter(u => !u.admin && u.profile_validee));
        } catch (error) {
            console.error('Échec de la récupération des utilisateurs:', error);
            setError('Échec du chargement des utilisateurs');
        }
    };
    


    const handleAction = async (userId, action) => {
        try {
            await axios.post(`http://localhost:3000/api/users/${userId}/${action}`);
            fetchUsers(); // Refresh the list after an action
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
                <h1>Utilisateurs en attente de validation</h1>
                <ul>
                    {unvalidatedUsers.map(user => (
                        <li key={user._id}>
                            {user.email}
                            <div className="button-container">
                                <button onClick={() => handleAction(user._id, 'validate-user')}>Valider</button>
                                <button onClick={() => handleAction(user._id, 'delete-user')}>Supprimer</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h1>Administrateurs</h1>
                <ul>
                    {admins.map(user => (
                        <li key={user._id}>
                            {user.login}
                            <div className="button-container">
                                <button onClick={() => handleAction(user._id, 'delete-user')}>Supprimer</button>
                                <button onClick={() => handleAction(user._id, 'demote')}>Rétrograder</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h1>Utilisateurs</h1>
                <ul>
                    {regularUsers.map(user => (
                        <li key={user._id}>
                            {user.login}
                            <div className="button-container">
                                <button onClick={() => handleAction(user._id, 'delete-user')}>Supprimer</button>
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
