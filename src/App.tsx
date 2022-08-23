import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import PokemonList from './pages/PokemonList';
import SinglePokemonPage from './pages/SinglePokemonPage';

function App() {
  return (
    <div className="App">
      <Router>
         <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<SinglePokemonPage />} />
        </Routes>
     </Router>
  
    </div>
  );
}

export default App;
