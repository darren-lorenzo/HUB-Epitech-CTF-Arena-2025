import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register  from './Register';
import Login from './Login';
import UserProfile from './Profil';
import HomePage from './Home';
import Logout from './Logout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profil" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;