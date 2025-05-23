import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from 'axiosInstance';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        surnom: '',
        password: '',
        nom: '',
        prenom: '',
    });
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

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
        
        if (!validateEmail(formData.email)) {
                setMessage('Veuillez entrer une adresse email valide.');
                setMessageType('error');
                return;
        }

        try {
            const response = await axiosInstance.post('/register', formData); // URL de l'API d'inscription
            console.log('Inscription réussie:', response.data);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || "Erreur lors de l'inscription.");
        }
    };

    return (
        <div className="register-page">
            <h2>Créer un compte</h2>
            <form onSubmit={handleSubmit}>
                <label>Nom</label>
                <input 
                    type="text" 
                    name="nom" 
                    required 
                    value={formData.nom} 
                    onChange={handleChange} 
                />

                <label>Prénom</label>
                <input 
                    type="text" 
                    name="prenom" 
                    required 
                    value={formData.prenom} 
                    onChange={handleChange} 
                />

                <label>Email</label>
                <input 
                    type="email" 
                    name="email" 
                    required 
                    value={formData.email} 
                    onChange={handleChange} 
                />

                <label>Surnom</label>
                <input 
                    type="text" 
                    name="surnom" 
                    required 
                    value={formData.surnom} 
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

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit" style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}>
                    S'inscrire
                </button>
            </form>

            <p style={{ marginTop: '1rem' }}>
                Déjà inscrit ?{' '}
                <Link to="/login" style={{ color: 'blue'}}>
                    Connectez-vous ici
                </Link>
            </p>
        </div>
    );
}

export default Register;
