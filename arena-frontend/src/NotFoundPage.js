import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 text-center"
    >
      <h1 className="text-9xl font-extrabold text-violet-600 mb-4 animate-bounce">
        404
      </h1>
      <p className="text-4xl font-bold text-white mb-6">
        Oups ! Page non trouvée.
      </p>
      <p className="text-lg text-gray-300 mb-8 max-w-md">
        Désolé, la page que vous recherchez n'existe pas. Il se peut qu'elle ait été déplacée ou supprimée.
      </p>
      <Link
        to="/"
        className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
      >
        Retourner à la page d'accueil
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;