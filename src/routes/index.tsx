import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../screens/HomePage';
import MovieDetails from '../screens/MovieDetails';
import NotFoundPage from '../screens/NotFound';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" Component={HomePage} />
    <Route path="/filmes/:id" Component={MovieDetails} />
    <Route path="*" Component={NotFoundPage} />
  </Routes>
);

export default AppRoutes;
