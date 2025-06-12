import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosSetup from './axiosSetup';
import "./Register.css"

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    surnom: '',
    password: '',
    nom: '',
    prenom: '',
    entreprise: '',
  });
  const [error, setError] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
      setError('Veuillez entrer une adresse email valide.');
      return;
    }

    try {
      await axiosSetup.post('/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-black text-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-violet-500 text-center">Créer un compte</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-violet-400">Nom</label>
            <input
              type="text"
              name="nom"
              required
              value={formData.nom}
              onChange={handleChange}
              className="mt-1 w-full p-2 rounded bg-white text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-violet-400">Prénom</label>
            <input
              type="text"
              name="prenom"
              required
              value={formData.prenom}
              onChange={handleChange}
              className="mt-1 w-full p-2 rounded bg-white text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-violet-400">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full p-2 rounded bg-white text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-violet-400">Surnom</label>
            <input
              type="text"
              name="surnom"
              required
              value={formData.surnom}
              onChange={handleChange}
              className="mt-1 w-full p-2 rounded bg-white text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-violet-400">Entreprise</label>
            <input
              type="text"
              name="entreprise"
              value={formData.entreprise}
              onChange={handleChange}
              className="mt-1 w-full p-2 rounded bg-white text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-violet-400">Mot de passe</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full p-2 rounded bg-white text-black"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-violet-600 hover:bg-violet-700 text-white rounded"
          >
            S'inscrire
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white">
          Déjà inscrit ?{' '}
          <Link to="/login" className="text-violet-400 hover:underline">
            Connectez-vous ici
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;