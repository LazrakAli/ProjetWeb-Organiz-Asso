import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users/login', { email, password });
            if (response.data && response.data.user) {
                login(response.data.user);
                navigate('/user/profile');
            } else {
                console.error('Login failed: No user data received');
            }
        } catch (error) {
            if (error.response?.status === 403) {
                setErrorMessage('Compte non validé. Veuillez attendre la validation de votre compte par un administrateur.'); // Message pour le code 403
            } else {
                setErrorMessage(error.response?.data?.message || 'Erreur inconnue lors de la connexion');
            }
            console.error('Login error:', error.response?.data?.message || 'Unknown error');
        }
    };

    return (
        <div className="login-container">
            <h2>Connexion</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Se connecter</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Affichage conditionnel du message d'erreur */}
            </form>
            <div className="admin-login">
                <p>Se connecter en tant qu'<Link to="/login/admin">Administrateur</Link></p>
            </div>
        </div>
    );
}

export default Login;
