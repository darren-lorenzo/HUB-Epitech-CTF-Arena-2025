import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import UserProfile from './Profil';
import HomePage from './Home';
import NotFoundPage from './NotFoundPage';
import HomeChallenges from './HomeChallenges'
import WebChallenges from './WebChallenges';
import WebChallengeDetail from './WebChallengeDetail';
import CryptoChallenges from './CryptoChallenges'
import CryptoChallengeDetail from './CryptoChallengeDetail'
import OsintChallenges from './OsintChallenges'
import OsintChallengeDetail from './OsintChallengeDetail'
import SteganoChallenges from './SteganoChallenges'
import SteganoChallengeDetail from './SteganoChallengeDetail'
import UserScoreboard from './ScoreBoardUser';
import GlobalScoreboard from './ScoreBoard';
import NotFoundPage from './NotFoundPage';
import ChallengeList from './ChallengeList';
import ChallengeDetail from './ChallengesDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/challengespage" element={<HomeChallenges />} />
        <Route path="/challenges" element={<ChallengeList />} />
        <Route path="/challenges/:challengeId" element={<ChallengeDetail />} />
        <Route path="/challenges/web" element={<WebChallenges />} />
        <Route path="/challenges/web/:challengeId" element={<WebChallengeDetail />} />
        <Route path="/challenges/crypto" element={<CryptoChallenges />} />
        <Route path="/challenges/crypto/:challengeId" element={<CryptoChallengeDetail />} />
        <Route path="/challenges/osint" element={<OsintChallenges />} />
        <Route path="/challenges/osint/:challengeId" element={<OsintChallengeDetail />} />
        <Route path="/challenges/steganographie" element={<SteganoChallenges />} />
        <Route path="/challenges/steganographie/:challengeId" element={<SteganoChallengeDetail />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/scoreboard/user" element={<UserScoreboard />} />
        <Route path="/scoreboard/global" element={<GlobalScoreboard />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;