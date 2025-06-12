import React from 'react';
import './Home.css';

const HomePage = () => {
  const sections = [
    {
      title: "Challenges",
      description: "Explore and solve cybersecurity challenges to improve your skills.",
      action: () => alert("Go to Challenges")
    },
    {
      title: "Classement",
      description: "View the leaderboard and compare your rank with others.",
      action: () => alert("View Leaderboard")
    },
    {
      title: "Proposer un challenge",
      description: "Submit your own challenge to the community.",
      action: () => alert("Submit a Challenge")
    },
    {
      title: "Profil utilisateur",
      description: "Access and manage your user profile.",
      action: () => alert("Go to Profile")
    }
  ];

  return (
    <div className="homepage">
      <h1>Bienvenue sur Arena Ctf</h1>
      <div className="sections-container">
        {sections.map((section, index) => (
          <div
            key={index}
            onClick={section.action}
            className="section-card"
          >
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            <button>{section.title}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
