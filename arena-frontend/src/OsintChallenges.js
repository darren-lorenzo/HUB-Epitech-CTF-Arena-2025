import React from 'react';
import { useNavigate } from 'react-router-dom';

const osintChallenges = [
  { id: 'twitter-trace', name: 'Trace un profil Twitter', difficulty: 'Facile', points: 100 },
  { id: 'image-metadata', name: 'Analyse de métadonnées', difficulty: 'Moyen', points: 150 },
];

function OsintChallenges() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Challenges OSINT</h2>
      <ul>
        {osintChallenges.map(challenge => (
          <li
            key={challenge.id}
            onClick={() => navigate(`/challenges/osint/${challenge.id}`)}
            style={{ cursor: 'pointer', marginBottom: '10px' }}
          >
            <strong>{challenge.name}</strong> — {challenge.difficulty} — {challenge.points} pts
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OsintChallenges;
