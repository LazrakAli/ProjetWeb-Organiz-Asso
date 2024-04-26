import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:3000/api/users/unvalidated-users');
                setUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                alert('Failed to load users');
            }
        }
        fetchUsers();
    }, []);

    const validateUser = async (userId) => {
        try {
            await axios.post(`http://localhost:3000/api/users/validate-user/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Failed to validate user:', error);
            alert('Failed to validate user');
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/api/users/delete-user/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Failed to delete user:', error);
            alert('Failed to delete user');
        }
    };

    return (
        <div>
            <h1>Unvalidated Users</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.email} - 
                        <button onClick={() => validateUser(user._id)}>Validate</button>
                        <button onClick={() => deleteUser(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListUsers;
