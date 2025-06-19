import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Exemple statique, tu pourras plus tard charger ça depuis une API
const challengeDetails = {
  'xss-basic': {
    title: 'XSS Basique',
    description: 'Trouvez et exploitez une faille XSS simple dans un formulaire.',
    points: 100,
    difficulty: 'Facile',
    launchUrl: 'https://challenge.example.com/xss-basic',
    expectedFlag: 'FLAG{basic_xss_123}',
  },
  'sql-injection': {
    title: 'Injection SQL',
    description: 'Trouvez une injection SQL dans le champ login.',
    points: 200,
    difficulty: 'Moyen',
    launchUrl: 'https://challenge.example.com/sql-injection',
    expectedFlag: 'FLAG{sql_inject_power}',
  },
  'csrf-bypass': {
    title: 'CSRF Token Bypass',
    description: 'Contournez la protection CSRF sur un formulaire critique.',
    points: 300,
    difficulty: 'Difficile',
    launchUrl: 'https://challenge.example.com/csrf-bypass',
    expectedFlag: 'FLAG{csrf-bypass-likeaboss}',
  },
};

function WebChallengeDetail() {
  const { challengeId } = useParams();
  const challenge = challengeDetails[challengeId];

  const [flag, setFlag] = useState('');
  const [feedback, setFeedback] = useState('');

  if (!challenge) {
    return <p>Challenge introuvable.</p>;
  }

  const handleLaunch = () => {
    window.open(challenge.launchUrl, '_blank');
  };

  const handleFlagSubmit = () => {
    if (flag.trim() === challenge.expectedFlag) {
      setFeedback('Bravo ! Flag correct !');
    } else {
      setFeedback('Mauvais flag, réessaie encore.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>{challenge.title}</h2>

      <p><strong>Difficulté:</strong> {challenge.difficulty}</p>
      <p><strong>Points:</strong> {challenge.points}</p>
      <p><strong>Description:</strong> {challenge.description}</p>

      <button style={styles.launchButton} onClick={handleLaunch}>
          Lancer le challenge
      </button>

      <div style={styles.flagSection}>
        <h3>Soumets ton flag</h3>
        <input
          type="text"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          placeholder="FLAG{...}"
          style={styles.input}
        />
        <button style={styles.submitButton} onClick={handleFlagSubmit}>
          Soumettre
        </button>
        {feedback && <p>{feedback}</p>}
      </div>

      <Link to="/challenges/web/">← Retour aux challenges Web</Link>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    color: '#c9d1d9',
    backgroundColor: '#0d1117',
    minHeight: '100vh',
  },
  launchButton: {
    padding: '12px 20px',
    backgroundColor: '#238636',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    margin: '20px 0',
  },
  flagSection: {
    marginTop: '30px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '250px',
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #30363d',
    backgroundColor: '#161b22',
    color: '#c9d1d9',
  },
  submitButton: {
    padding: '10px 16px',
    fontSize: '16px',
    backgroundColor: '#238636',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default WebChallengeDetail;
