import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthAdmin } from '../Auth/AuthContextAdmin'; 
import axios from 'axios';
import './LoginAdmin.css';

function LoginAdmin() {
    const { loginAdmin } = useAuthAdmin();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/admin/login', { email, password });
            if (response.data && response.data.admin) {
                loginAdmin(response.data.admin);
                navigate('/users');
            } else {
                console.error('Login failed: No admin data received');
            }
        } catch (error) {
            console.error('Login error:', error.response?.data?.message || 'Unknown error');
        }
    };

    return (
        <div className="login-admin-container">
            <h2>Connexion Administrateur</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default LoginAdmin;
