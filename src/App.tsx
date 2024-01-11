// import logo from '../public/logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './routes';

function App() {
  return (
    // Adicionar providers caso necessário
    <BrowserRouter>
      <Rotas />
    </BrowserRouter>
  );
}

export default App;
