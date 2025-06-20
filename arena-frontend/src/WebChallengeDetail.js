import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from './axiosSetup';

function WebChallengeDetail() {
  const { id } = useParams();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flag, setFlag] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const challengeIdToFetch = id;

  useEffect(() => {
    const fetchChallenge = async () => {
      if (!challengeIdToFetch) {
        setLoading(false);
        setError("Challenge ID or Type is missing.");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.post(`challenges/${challengeIdToFetch}`, {
          type: "web",
        });

        setChallenge(response.data);
      } catch (err) {
        console.error(`Error fetching web challenge (ID: ${challengeIdToFetch}):`, err);
        setError(err.response?.data?.message || 'Failed to load challenge details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [challengeIdToFetch]);

  if (loading) {
    return <div className="text-center p-4 text-xl">Loading challenge details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 p-4 text-xl">Error: {error}</div>;
  }

  if (!challenge) {
    return <div className="text-center p-4 text-xl">Challenge not found or no data available.</div>;
  }

  const handleLaunch = () => {
    window.open(challenge.URL, '_blank');
  };

  const handleFlagSubmit = async () => {
    if (!flag) {
      setMessage('Please enter a flag.');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    setMessageType('');

    try {
      const response = await axiosInstance.post(`/challenges/${id}/submit`, {
        challengeId: challengeIdToFetch,
        challengeType: "web",
        submittedFlag: flag,
      });

      if (response.data.success) {
        setMessage(response.data.message);
        setMessageType('success');
      } else {
        setMessage(response.data.message || 'An unknown error occurred during submission.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage(error.response?.data?.message || 'Failed to submit flag. Please try again.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>{challenge.Nom}</h2>

      <p><strong>Difficulté:</strong> {challenge.Difficulty}</p>
      <p><strong>Points:</strong> {challenge.Points}</p>
      <p><strong>Description:</strong> {challenge.Description}</p>

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
        <button style={styles.submitButton} onClick={handleFlagSubmit} disabled={isSubmitting}>
          Soumettre
        </button>
        {message && (
          <p style={{ color: messageType === 'success' ? '#238636' : '#ff4d4f', marginTop: '10px' }}>
            {message}
          </p>
        )}
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
