import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Subjects from './pages/Subjects';
import TestPage from './pages/TestPage';
import Results from './pages/Results';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subjects/:examType" element={<Subjects />} />
        <Route path="/test/:examType/:subject" element={<TestPage />} />
        <Route path="/results/:examType/:subject" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;