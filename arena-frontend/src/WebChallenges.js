import React from 'react';
import { useNavigate } from 'react-router-dom';

const challenges = [
  { id: 'xss-basic', name: 'XSS Basique', difficulty: 'Facile', points: 100 },
  { id: 'sql-injection', name: 'Injection SQL', difficulty: 'Moyen', points: 200 },
  { id: 'csrf-bypass', name: 'CSRF Token Bypass', difficulty: 'Difficile', points: 300 },
];

function WebChallenges() {
  const navigate = useNavigate();
  const [allchallenges, setChallenges] = useState({
        cryptography: [],
        steganography: [],
        web: [],
        osint: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const response = await axios.get('/api/getChallenges');
                setChallenges(response.data);
            } catch (err) {
                setError('Une erreur est survenue lors de la récupération des challenges.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges();
    }, []);

    if (loading) {
        return <div className="loading">Chargement en cours...</div>;
    }
    if (error) {
        return <div className="error">{error}</div>;
    }

  return (
    <div>
      <h2>Challenges Web</h2>
      <ul>
        {allchallenges.map((challenge) => (
          <li key={challenge._id} onClick={() => navigate(`/challenges/web/${challenge._id}`)} style={styles.challenge}>
            <strong>{challenge.Nom}</strong> — {challenge.Difficulty} — {challenge.Points} pts
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
