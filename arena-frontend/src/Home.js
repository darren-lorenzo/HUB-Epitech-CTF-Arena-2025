import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaChartBar, FaPlusCircle, FaUserCircle } from 'react-icons/fa';
import axiosSetup from './axiosSetup';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axiosSetup.get("/user/profile"); 
        setUser(response.data.data);
      } catch (err) {
        console.error("Error fetching user profile for homepage:", err);
        setError("Impossible de charger les informations utilisateur.");
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const sections = [
    {
      title: "Challenges",
      description: "Explorez et résolvez des défis de cybersécurité pour améliorer vos compétences.",
      icon: <FaLaptopCode className="text-violet-500 text-5xl mb-4" />,
      link: "/challenges"
    },
    {
      title: "Classement",
      description: "Consultez le tableau des scores et comparez votre rang avec les autres.",
      icon: <FaChartBar className="text-green-500 text-5xl mb-4" />,
      link: "/scoreboard/global"
    },
    {
      title: "Proposer un challenge",
      description: "Soumettez votre propre défi à la communauté Arena CTF en tant que Développeur.",
      icon: <FaPlusCircle className="text-blue-500 text-5xl mb-4" />,
      link: "/submit-challenge",
      roles: ['DEVEL']
    },
    {
      title: "Profil utilisateur",
      description: "Accédez et gérez les informations de votre profil utilisateur.",
      icon: <FaUserCircle className="text-purple-500 text-5xl mb-4" />,
      link: "/profile"
    }
  ];

  const filteredSections = sections.filter(section => {
    if (section.roles) {
      return user && section.roles.includes(user.role);
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl">Chargement de la page d'accueil...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gray-900 text-white p-8"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-violet-500 mb-4 animate-fadeIn">
          Bienvenue sur Arena CTF
        </h1>
        {user && (
          <p className="text-2xl text-gray-300 mb-10 animate-slideIn">
            Bonjour, <span className="font-semibold text-violet-300">{user.Alias || user.surnom || user.prenom || 'Cher utilisateur'}</span> !
            Votre rôle actuel est : <span className="font-semibold text-violet-300">{user.role}</span>.
          </p>
        )}
        {!user && !loading && (
          <p className="text-xl text-gray-300 mb-10 animate-slideIn">
            Connectez-vous pour accéder à toutes les fonctionnalités et personnaliser votre expérience.
          </p>
        )}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 flex flex-col items-center border border-gray-700"
            >
              {section.icon}
              <h2 className="text-3xl font-bold text-white mb-3">{section.title}</h2>
              <p className="text-gray-400 mb-6 flex-grow">{section.description}</p>
              <Link
                to={section.link}
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 inline-block w-full"
              >
                {section.title}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;