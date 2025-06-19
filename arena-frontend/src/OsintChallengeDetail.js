import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const details = {
  'twitter-trace': {
    title: 'Trace un profil Twitter',
    description: 'Identifie la personne derrière un pseudo.',
    difficulty: 'Facile',
    points: 100,
    launchUrl: 'https://challenge.example.com/osint1',
    expectedFlag: 'FLAG{john_doe_found}',
  },
  'image-metadata': {
    title: 'Analyse de métadonnées',
    description: 'Analyse une image pour trouver sa source.',
    difficulty: 'Moyen',
    points: 150,
    launchUrl: 'https://challenge.example.com/osint2',
    expectedFlag: 'FLAG{gps_48.85_2.35}',
  },
};

function OsintChallengeDetail() {
  const { challengeId } = useParams();
  const challenge = details[challengeId];

  const [flag, setFlag] = useState('');
  const [feedback, setFeedback] = useState('');

  if (!challenge) return <p>Introuvable</p>;

  const handleSubmit = () => {
    setFeedback(flag.trim() === challenge.expectedFlag
      ? 'Correct !'
      : 'Faux flag');
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
        <input value={flag} onChange={e => setFlag(e.target.value)} />
        <button onClick={handleSubmit}>Soumettre</button>
        <p>{feedback}</p>
      </div>
      <Link to="/challenges/osint">← Retour</Link>
    </div>
  );
}

export default OsintChallengeDetail;