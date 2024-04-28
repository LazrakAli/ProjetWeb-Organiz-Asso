import React from 'react';

function Logout({ onLogout }) {
    return (
        <button onClick={onLogout} className="logout-button">Se déconnecter</button>
    );
}

export default Logout;
