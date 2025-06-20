import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChallengeDetail = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [flagInput, setFlagInput] = useState('');
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await axios.get(`/challenges/${id}`);
        setChallenge(res.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du challenge:', error);
      }
    };

    fetchChallenge();
  }, [id]);

  const handleLaunch = () => {
    window.open(challenge.URL, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`challenges/${id}/submit`, {
        flag: flagInput,
      });
      setResponse(res.data.message);
    } catch (error) {
      setResponse("Erreur lors de la soumission du flag.");
      console.error('Erreur lors de la soumission:', error);
    }
  };

  if (!challenge) return <div>Chargement...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">{challenge.Nom}</h2>
      <p className="mb-4">{challenge.Description}</p>

      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h3 className="text-lg font-semibold mb-2">Message</h3>
      </div>

    <button
        onClick={handleLaunch}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
        Lancer le challenge
    </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Entre le flag ici"
          value={flagInput}
          onChange={(e) => setFlagInput(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Soumettre le flag
        </button>
      </form>

      {response && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
          {response}
        </div>
      )}
    </div>
  );
};

export default ChallengeDetail;
