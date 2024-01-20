import './App.css';
import './styles/globalStyles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import PHeader from './components/Header';
import PFooter from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <PHeader />
      <AppRoutes />
      <PFooter />
    </BrowserRouter>
  );
}

export default App;
