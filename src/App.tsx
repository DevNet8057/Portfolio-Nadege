import '@fortawesome/fontawesome-free/css/all.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from "./components/Home";
import Projet from "./components/Projet";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/projet" element={<Projet darkMode={darkMode} />} />
      </Routes>
    </Router>
  );
};

export default App;

