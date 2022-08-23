import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import PokemonList from './pages/PokemonList';
import SinglePokemonPage from './pages/SinglePokemonPage';
import { ThemeProvider } from './context/themeToggle';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Router basename="/">
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:id" element={<SinglePokemonPage />} />
          </Routes>
      </Router>
     </ThemeProvider> 
    </div>
  );
}

export default App;
