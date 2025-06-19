import React from 'react';
import { useNavigate } from 'react-router-dom';

function ChallengeHome() {
  const navigate = useNavigate();

  const challengeTypes = [
    { type: 'web', label: 'Web' },
    { type: 'crypto', label: 'Crypto' },
    { type: 'OSINT', label: 'Osint' },
    { type: 'steganographie', label: 'Steganographie' },
  ];

  const handleRedirect = (type) => {
    navigate(`/challenges/${type}`);
  };

  return (
    <div className="challenge-home">
      <h2>Choisis un type de challenge</h2>
      <div className="challenge-buttons">
        {challengeTypes.map(({ type, label }) => (
          <button key={type} onClick={() => handleRedirect(type)}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ChallengeHome;
