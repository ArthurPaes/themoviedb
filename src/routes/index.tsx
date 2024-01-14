import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../screens/HomePage';
import MovieDetails from '../screens/MovieDetails';

const Rotas: React.FC = () => (
  <Routes>
    <Route path="/" Component={HomePage} />
    <Route path="/filmes/:id" Component={MovieDetails} />
  </Routes>
);

export default Rotas;
