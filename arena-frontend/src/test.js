import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChallengeList = () => {
    const [challenges, setChallenges] = useState({
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
        <div className="challenges-container">
            <h1>Liste des Challenges</h1>

            <section className="challenge-category">
                <h2>Cryptographie</h2>
                {challenges.cryptography.length > 0 ? (
                    challenges.cryptography.map(challenge => (
                        <article key={challenge._id} className="challenge-card">
                            <h3>{challenge.Nom}</h3>
                            <p>{challenge.Description}</p>
                            <small>Auteur: {challenge.Auteur}</small>
                        </article>
                    ))
                ) : (
                    <p>Aucun challenge de cryptographie disponible.</p>
                )}
            </section>

            <section className="challenge-category">
                <h2>Steganographie</h2>
                {challenges.steganography.length > 0 ? (
                    challenges.steganography.map(challenge => (
                        <article key={challenge._id} className="challenge-card">
                            <h3>{challenge.Nom}</h3>
                            <p>{challenge.Description}</p>
                            <small>Auteur: {challenge.Auteur}</small>
                        </article>
                    ))
                ) : (
                    <p>Aucun challenge de steganographie disponible.</p>
                )}
            </section>

            <section className="challenge-category">
                <h2>Web</h2>
                {challenges.web.length > 0 ? (
                    challenges.web.map(challenge => (
                        <article key={challenge._id} className="challenge-card">
                            <h3>{challenge.Nom}</h3>
                            <p>{challenge.Description}</p>
                            <a href={challenge.URL} target="_blank" rel="noopener noreferrer">Accéder au challenge</a>
                            <br />
                            <small>Auteur: {challenge.Auteur}</small>
                        </article>
                    ))
                ) : (
                    <p>Aucun challenge Web disponible.</p>
                )}
            </section>

            <section className="challenge-category">
                <h2>OSINT</h2>
                {challenges.osint.length > 0 ? (
                    challenges.osint.map(challenge => (
                        <article key={challenge._id} className="challenge-card">
                            <h3>{challenge.Nom}</h3>
                            <p>{challenge.Description}</p>
                            {challenge.Image && <img src={challenge.Image} alt={`Image pour ${challenge.Nom}`} style={{ maxWidth: '100%', height: 'auto' }} />}
                            <br />
                            <small>Auteur: {challenge.Auteur}</small>
                        </article>
                    ))
                ) : (
                    <p>Aucun challenge OSINT disponible.</p>
                )}
            </section>
        </div>
    );
};

export default ChallengeList;