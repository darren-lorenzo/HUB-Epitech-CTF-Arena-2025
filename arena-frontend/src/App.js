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
        <Route path="/" element={<HomePage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profil" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;