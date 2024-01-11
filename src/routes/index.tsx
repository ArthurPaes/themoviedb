import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../screens/HomePage';

const Rotas: React.FC = () => (
  <Routes>
    <Route path="/" Component={HomePage} />
  </Routes>
);

export default Rotas;
