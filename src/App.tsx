import './App.css';
import './styles/globalStyles.css';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './routes';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Rotas />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
