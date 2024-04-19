import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importez useNavigate
import './Signin.css';

function Signin() {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();  // Hook pour la navigation

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/users/signin', {
        login, email, password, lastName: lastname, firstName: firstname
      });
      console.log('User created:', response.data);
      navigate('/');  // Redirige vers la page d'accueil après l'inscription
    } catch (error) {
      setErrorMessage('Error creating user: ' + (error.response?.data?.message || 'Unknown Error'));
    }
  };

  return (
    <div className="signin-container">
      <h2>Inscription</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>login:</label>
          <input type="text" value={login} onChange={e => setLogin(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={lastname} onChange={e => setLastname(e.target.value)} required />
        </div>
        <div>
          <label>First Name:</label>
          <input type="text" value={firstname} onChange={e => setFirstname(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Signin;
