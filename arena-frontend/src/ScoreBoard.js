import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosSetup from './axiosSetup';
import { Link } from 'react-router-dom';

const GlobalScoreboard = () => {
  const [globalScores, setGlobalScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Données Mockées pour le test ---
  const mockGlobalScoresData = [
    { _id: "score1", id_user: { _id: "u1", Alias: "AlphaCoder", Affiliation: "Université X" }, score: 5000 },
    { _id: "score2", id_user: { _id: "u2", Alias: "BugBuster", Affiliation: "Tech Solutions" }, score: 4800 },
    { _id: "score3", id_user: { _id: "u3", Alias: "CodeNinja", Affiliation: "Open Source Team" }, score: 4500 },
    { _id: "score4", id_user: { _id: "u4", Alias: "DataWizard", Affiliation: "DataCorp" }, score: 4200 },
    { _id: "score5", id_user: { _id: "u5", Alias: "ElectroDev", Affiliation: "Future Innovators" }, score: 3900 },
    { _id: "score6", id_user: { _id: "u6", Alias: "Firewall", Affiliation: "CyberGuard" }, score: 3700 },
    { _id: "score7", id_user: { _id: "u7", Alias: "GeekMaster", Affiliation: "Startup Hub" }, score: 3500 },
    { _id: "score8", id_user: { _id: "u8", Alias: "HackGenius", Affiliation: "SecureIT" }, score: 3300 },
    { _id: "score9", id_user: { _id: "u9", Alias: "Innovator", Affiliation: "Creative Minds" }, score: 3100 },
    { _id: "score10", id_user: { _id: "u10", Alias: "JediCode", Affiliation: "DevForce" }, score: 2900 },
  ];

  useEffect(() => {
    const fetchGlobalScores = async () => {
      try {
        // const response = await axiosSetup.get("/scoreboard/global");
        // setGlobalScores(response.data.data);
        //----------------------------------------------------
        await new Promise(resolve => setTimeout(resolve, 800));
        setGlobalScores(mockGlobalScoresData);
        //----------------------------------------------------
      } catch (err) {
        console.error("Erreur lors de la récupération du classement général:", err.response ? err.response.data : err.message);
        setError(err.response?.data?.message || "Impossible de charger le classement général.");
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalScores();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-black text-white p-6 rounded-lg shadow-md space-y-4 animate-pulse">
          <div className="h-10 bg-gray-700 rounded w-full mb-6"></div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-600 rounded w-full"></div>
            <div className="h-6 bg-gray-600 rounded w-full"></div>
            <div className="h-6 bg-gray-600 rounded w-full"></div>
            <div className="h-6 bg-gray-600 rounded w-full"></div>
            <div className="h-6 bg-gray-600 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white p-8 flex flex-col items-center justify-center">
        <p className="text-red-500 text-center">{error}</p>
        <Link to="/user/scoreboard" className="mt-4 text-violet-400 hover:underline">Retour à mon classement</Link>
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
      <div className="w-full max-w-2xl bg-black text-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-violet-500 text-center">Classement Général</h1>

        {globalScores.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Rang</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Alias</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">Affiliation</th>
                  <th className="py-3 px-4 text-right text-sm font-medium text-gray-300 uppercase tracking-wider">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {globalScores.map((entry, index) => (
                  <tr key={entry._id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}>
                    <td className="py-3 px-4 whitespace-nowrap text-white font-medium">{index + 1}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-white">
                        {entry.id_user ? entry.id_user.Alias : 'Utilisateur inconnu'}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-white">
                        {entry.id_user ? entry.id_user.Affiliation : 'N/A'}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-right text-violet-300 font-bold">{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-white text-center">Aucun utilisateur n'a encore de score dans le classement général.</p>
        )}

        <div className="mt-8 text-center">
          <Link to="/user/scoreboard" className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded transition duration-300">
            Voir votre classement personnel
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default GlobalScoreboard;