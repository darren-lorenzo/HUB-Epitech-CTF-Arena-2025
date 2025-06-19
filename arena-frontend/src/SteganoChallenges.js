import React from 'react';
import { useNavigate } from 'react-router-dom';

const steganoChallenges = [
  { id: 'image-hidden', name: 'Image cachée', difficulty: 'Facile', points: 100 },
  { id: 'audio-flag', name: 'Message audio', difficulty: 'Moyen', points: 150 },
];

function SteganoChallenges() {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Challenges Stéganographie</h2>
      <ul>
        {steganoChallenges.map(ch => (
          <li key={ch.id} onClick={() => navigate(`/challenges/steganographie/${ch.id}`)} style={{ cursor: 'pointer' }}>
            <strong>{ch.name}</strong> — {ch.difficulty} — {ch.points} pts
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SteganoChallenges;
