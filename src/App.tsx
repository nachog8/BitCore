import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import VotingPage from './pages/VotingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/votar" element={<VotingPage />} />
    </Routes>
  );
}

export default App;
