import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const details = {
  'image-hidden': {
    title: 'Image cachée',
    description: 'Trouve le flag dissimulé dans l’image.',
    difficulty: 'Facile',
    points: 100,
    launchUrl: 'https://challenge.example.com/steg1',
    expectedFlag: 'FLAG{hidden_pixel}',
  },
  'audio-flag': {
    title: 'Message audio',
    description: 'Analyse un fichier audio pour extraire un message caché.',
    difficulty: 'Moyen',
    points: 150,
    launchUrl: 'https://challenge.example.com/steg2',
    expectedFlag: 'FLAG{waveform_steg}',
  },
};

function SteganoChallengeDetail() {
  const { challengeId } = useParams();
  const challenge = details[challengeId];

  const [flag, setFlag] = useState('');
  const [feedback, setFeedback] = useState('');

  if (!challenge) return <p>Introuvable</p>;

  const handleSubmit = () => {
    setFeedback(flag.trim() === challenge.expectedFlag
      ? '✅ Correct !'
      : '❌ Faux flag');
  };

  return (
    <div>
      <h2>{challenge.title}</h2>
      <p>{challenge.description}</p>
      <p><strong>Difficulté:</strong> {challenge.difficulty}</p>
      <p><strong>Points:</strong> {challenge.points}</p>
      <button onClick={() => window.open(challenge.launchUrl, '_blank')}>
        Lancer
      </button>
      <div>
        <input value={flag} onChange={e => setFlag(e.target.value)} />
        <button onClick={handleSubmit}>Soumettre</button>
        <p>{feedback}</p>
      </div>
      <Link to="/challenges/steganographie">← Retour</Link>
    </div>
  );
}

export default SteganoChallengeDetail;
