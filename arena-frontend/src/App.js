import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register  from './Register';
import Login from './Login';
import UserProfile from './Profil';
import HomePage from './Home';
import Logout from './Logout';
import UserScoreboard from './ScoreBoardUser';
import GlobalScoreboard from './ScoreBoard';
import NotFoundPage from './NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profil" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/scoreboard/user" element={<UserScoreboard />} />
        <Route path="/scoreboard/global" element={<GlobalScoreboard />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;