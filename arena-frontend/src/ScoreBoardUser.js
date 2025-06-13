import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosSetup from './axiosSetup';
import { Link } from 'react-router-dom';

const UserScoreboard = () => {
  const [userScore, setUserScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mockUserScoreData = {
    _id: "userScore123",
    id_user: "user001",
    username: "JDoe",
    affiliation: "Epitech",
    score: 1250,
  };

  useEffect(() => {
    const fetchUserScore = async () => {
      try {
        // const response = await axiosSetup.get("/user/scoreboard");
        // setUserScore(response.data.data);
        //-----------------------------------------------------
        await new Promise(resolve => setTimeout(resolve, 500));
        setUserScore(mockUserScoreData);
        //-----------------------------------------------------
      } catch (err) {
        console.error("Erreur lors de la récupération du classement utilisateur:", err.response ? err.response.data : err.message);
        setError(err.response?.data?.message || "Impossible de charger votre classement.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserScore();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-black text-white p-6 rounded-lg shadow-md space-y-4 animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-600 rounded w-1/2"></div>
          <div className="h-6 bg-gray-600 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white p-8 flex flex-col items-center justify-center">
        <p className="text-red-500 text-center">{error}</p>
        <Link to="/scoreboard/global" className="mt-4 text-violet-400 hover:underline">Voir le classement général</Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white p-8 flex flex-col items-center"
    >
      <div className="w-full max-w-md bg-black text-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-violet-500 text-center">Votre Classement Personnel</h1>

        {userScore ? (
          <div className="space-y-4 text-center">
            <div>
              <h2 className="text-lg font-semibold text-violet-40">Alias</h2>
              <p className="text-white text-2xl font-bold">{userScore.username}</p>
            </div>
            {userScore.affiliation && (
              <div>
                <h2 className="text-lg font-semibold text-violet-400">Affiliation</h2>
                <p className="text-white text-xl">{userScore.affiliation}</p>
              </div>
            )}
            <div>
              <h2 className="text-lg font-semibold text-violet-400">Votre Score</h2>
              <p className="text-white text-4xl font-extrabold text-violet-300">{userScore.score}</p>
            </div>
          </div>
        ) : (
          <p className="text-white text-center">Vous n'avez pas encore de score enregistré.</p>
        )}

        <div className="mt-8 text-center">
          <Link to="/scoreboard/global" className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded transition duration-300">
            Voir le classement général
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default UserScoreboard;