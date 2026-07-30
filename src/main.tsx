import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ExecutiveReport from './pages/ExecutiveReport';
import Interview from './pages/Interview';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-header">
          <h1>BACS — Executive Diagnostic</h1>
          <nav>
            <Link to="/">Executive Diagnostic</Link>
            <Link to="/interview">Interview</Link>
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<ExecutiveReport />} />
            <Route path="/interview" element={<Interview />} />
          </Routes>
        </main>
        <footer className="app-footer">© BACS — Evidence-Based Diagnostics</footer>
      </div>
    </BrowserRouter>
  );
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<App />);
}
