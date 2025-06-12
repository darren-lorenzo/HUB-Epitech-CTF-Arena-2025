import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosSetup from './axiosSetup';
import "./Register.css"

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: '',       // Changé de 'email' à 'Email'
    Alias: '',       // Changé de 'surnom' à 'Alias'
    Password: '',    // Changé de 'password' à 'Password'
    Nom: '',         // Changé de 'nom' à 'Nom'
    Prenom: '',      // Changé de 'prenom' à 'Prenom'
    Affiliation: '', // Changé de 'entreprise' à 'Affiliation'
  });
  const [error, setError] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    // Cette partie reste la même car e.target.name correspondra maintenant aux nouvelles clés
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Utilisez la bonne clé pour la validation de l'email
    if (!validateEmail(formData.Email)) { // Changé de formData.email
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
              name="Nom" // Changé de "nom" à "Nom"
              required
              value={formData.Nom} // Changé de formData.nom
              onChange={handleChange}
              className="mt-1 w-full p-2 rounded bg-white text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-violet-400">Prénom</label>
            <input
              type="text"
              name="Prenom" // Changé de "prenom" à "Prenom"
              required
              value={formData.Prenom} // Changé de formData.prenom
              onChange={handleChange}
              className="mt-1 w-full p-2 rounded bg-white text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-violet-400">Email</label>
            <input
              type="email"
              name="Email" // Changé de "email" à "Email"
              required
              value={formData.Email} // Changé de formData.email
              onChange={handleChange}
              className="mt-1 w-full p-2 rounded bg-white text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-violet-400">Surnom</label>
            <input
              type="text"
              name="Alias" // Changé de "surnom" à "Alias"
              required
              value={formData.Alias} // Changé de formData.surnom
              onChange={handleChange}
              className="mt-1 w-full p-2 rounded bg-white text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-violet-400">Entreprise / Affiliation</label>
            <input
              type="text"
              name="Affiliation" // Changé de "entreprise" à "Affiliation"
              value={formData.Affiliation} // Changé de formData.entreprise
              onChange={handleChange}
              className="mt-1 w-full p-2 rounded bg-white text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-violet-400">Mot de passe</label>
            <input
              type="password"
              name="Password" // Changé de "password" à "Password"
              required
              value={formData.Password} // Changé de formData.password
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