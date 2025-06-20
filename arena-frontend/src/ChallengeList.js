// ChallengeList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from 'axios';

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await axiosInstance.get('/challenges');
        setChallenges(res.data);
      } catch (error) {
        console.error('Erreur lors du chargement des challenges:', error);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des Challenges Crypto</h1>
      <ul className="space-y-3">
        {challenges.map((challenge) => (
          <li key={challenge._id} className="bg-white shadow-md p-4 rounded-lg">
            <Link to={`/challenges/${challenge._id}`} className="text-blue-500 hover:underline text-lg">
              {challenge.Nom}
            </Link>
            <p className="text-gray-600">{challenge.Description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengeList;
