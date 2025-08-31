import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LanguageSwitcher from './components/LanguageSwitcher';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Language-prefixed routes */}
            <Route path="/:lang/" element={<Home />} />
            <Route path="/:lang/about" element={<About />} />
            <Route path="/:lang/contact" element={<Contact />} />
          </Routes>
        </main>
        <LanguageSwitcher />
      </div>
    </Router>
  );
}

export default App;
