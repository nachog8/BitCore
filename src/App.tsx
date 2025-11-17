import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import VotingPage from './pages/VotingPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/votar" element={<VotingPage />} />
      <Route path="/resultados" element={<ResultsPage />} />
    </Routes>
  );
}

export default App;
