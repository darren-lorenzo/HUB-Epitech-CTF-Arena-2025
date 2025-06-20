import React from 'react';
import { useNavigate } from 'react-router-dom';

const cryptoChallenges = [
  { id: 'caesar', name: 'Caesar Cipher', difficulty: 'Facile', points: 100 },
  { id: 'rsa-crack', name: 'Crack RSA', difficulty: 'Difficile', points: 300 },
];

function CryptoChallenges() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Challenges Crypto</h2>
      <ul>
        {cryptoChallenges.map(challenge => (
          <li
            key={challenge.id}
            onClick={() => navigate(`/challenges/crypto/${challenge.id}`)}
            style={{ cursor: 'pointer', marginBottom: '10px' }}
          >
            <strong>{challenge.name}</strong> — {challenge.difficulty} — {challenge.points} pts
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CryptoChallenges;
