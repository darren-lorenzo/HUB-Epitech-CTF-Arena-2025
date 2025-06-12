import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosSetup from './axiosSetup';
import "./Login.css"

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Email: '',
        Password: '',
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
            const response = await axiosSetup.post('/login', formData);
            console.log('Connexion réussie:', response.data);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('idUtilisateur', response.data.utilisateur._id);

            navigate('/');
        } catch (err) {
            console.error("Erreur frontend login:", err.response ? err.response.data : err.message);
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
                    name="Email"
                    required
                    value={formData.Email}
                    onChange={handleChange}
                />

                <label>Mot de passe</label>
                <input
                    type="password"
                    name="Password"
                    required
                    value={formData.Password}
                    onChange={handleChange}
                />

                <button type="submit">Se connecter</button>
            </form>
            <p>Pas encore inscrit ? <Link to="/register">Créer un compte</Link></p>
        </div>
    );
}
export default Login;
