import React from 'react';
import { useNavigate } from 'react-router-dom';

const challenges = [
  { id: 'xss-basic', name: 'XSS Basique', difficulty: 'Facile', points: 100 },
  { id: 'sql-injection', name: 'Injection SQL', difficulty: 'Moyen', points: 200 },
  { id: 'csrf-bypass', name: 'CSRF Token Bypass', difficulty: 'Difficile', points: 300 },
];

function WebChallenges() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Challenges Web</h2>
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.id} onClick={() => navigate(`/challenges/web/${challenge.id}`)} style={styles.challenge}>
            <strong>{challenge.name}</strong> — {challenge.difficulty} — {challenge.points} pts
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  challenge: {
    cursor: 'pointer',
    marginBottom: '10px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '5px',
  }
};

export default WebChallenges;
