import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const details = {
  'caesar': {
    title: 'Caesar Cipher',
    description: 'Déchiffre ce message avec un décalage classique.',
    difficulty: 'Facile',
    points: 100,
    launchUrl: 'https://challenge.example.com/caesar',
    expectedFlag: 'FLAG{caesar_123}',
  },
  'rsa-crack': {
    title: 'Crack RSA',
    description: 'Explose cette clé RSA vulnérable.',
    difficulty: 'Difficile',
    points: 300,
    launchUrl: 'https://challenge.example.com/rsa',
    expectedFlag: 'FLAG{rsa_is_broken}',
  },
};

function CryptoChallengeDetail() {
  const { challengeId } = useParams();
  const challenge = details[challengeId];

  const [flag, setFlag] = useState('');
  const [feedback, setFeedback] = useState('');

  if (!challenge) return <p>Challenge introuvable.</p>;

  const handleFlagSubmit = () => {
    setFeedback(flag.trim() === challenge.expectedFlag
      ? 'Bravo !'
      : 'Mauvais flag.');
  };

  return (
    <div>
      <h2>{challenge.title}</h2>
      <p>{challenge.description}</p>
      <p><strong>Difficulté:</strong> {challenge.difficulty}</p>
      <p><strong>Points:</strong> {challenge.points}</p>
      <button onClick={() => window.open(challenge.launchUrl, '_blank')}>
          Lancer le challenge
      </button>
      <div>
        <input
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          placeholder="FLAG{...}"
        />
        <button onClick={handleFlagSubmit}>Soumettre</button>
        {feedback && <p>{feedback}</p>}
      </div>
      <Link to="/challenges/crypto">← Retour</Link>
    </div>
  );
}

export default CryptoChallengeDetail;
