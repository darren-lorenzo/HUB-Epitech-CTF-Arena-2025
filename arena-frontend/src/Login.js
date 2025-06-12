import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosSetup from './axiosSetup';
import "./Login.css"

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await axiosSetup.post('/login', formData); // URL de l'API de connexion
            console.log('Connexion réussie:', response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('idUtilisateur', response.data.idUtilisateur);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || "Erreur lors de la connexion.");
        }
    };

    return (
        <div className="login-page">
            <h2>Connexion</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input 
                    type="email" 
                    name="email" 
                    required 
                    value={formData.email} 
                    onChange={handleChange} 
                />

                <label>Mot de passe</label>
                <input 
                    type="password" 
                    name="password" 
                    required 
                    value={formData.password} 
                    onChange={handleChange} 
                />

                <button type="submit">Se connecter</button>
            </form>
            <p>Pas encore inscrit ? <Link to="/register">Créer un compte</Link></p>
        </div>
    );
}
export default Login;