import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from 'axiosInstance';

function Logout () {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/logout'); // URL de l'API de déconnexion
            localStorage.removeItem('token');
            localStorage.removeItem('idUtilisateur');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || "Erreur lors de la déconnexion.");
        }
    };

    return (
        <div className="logout-page">
            <h2>Déconnexion</h2>
            {error && <p className="error">{error}</p>}
            <button onClick={handleLogout}>Se déconnecter</button>
        </div>
    );
}
export default Logout;