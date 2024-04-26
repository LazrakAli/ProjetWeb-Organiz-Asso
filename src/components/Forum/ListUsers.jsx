import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListUsers() {
    const [unvalidatedUsers, setUnvalidatedUsers] = useState([]);
    const [validatedUsers, setValidatedUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const unvalidatedResponse = await axios.get('http://localhost:3000/api/users/unvalidated-users');
            setUnvalidatedUsers(unvalidatedResponse.data);
            const validatedResponse = await axios.get('http://localhost:3000/api/users/ListUsers'); // Vérifiez que cet endpoint est bien défini sur votre serveur
            setValidatedUsers(validatedResponse.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            alert('Failed to load users');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const validateUser = async (userId) => {
        try {
            await axios.post(`http://localhost:3000/api/users/validate-user/${userId}`);
            fetchUsers(); // Actualiser les listes après validation
        } catch (error) {
            console.error('Failed to validate user:', error);
            alert('Failed to validate user');
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/api/users/delete-user/${userId}`);
            fetchUsers(); // Actualiser les listes après suppression
        } catch (error) {
            console.error('Failed to delete user:', error);
            alert('Failed to delete user');
        }
    };

    return (
        <div>
            <h1>Utilisateurs en attente</h1>
            <ul>
                {unvalidatedUsers.map(user => (
                    <li key={user._id}>
                        {user.email} - 
                        <button onClick={() => validateUser(user._id)}>Validate</button>
                        <button onClick={() => deleteUser(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
                <h1>Utilisateurs vérifiés</h1>
                <ul>
                    {validatedUsers.map(user => (
                        <li key={user._id}>
                            {user.login}
                            <button onClick={() => deleteUser(user._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ListUsers;
