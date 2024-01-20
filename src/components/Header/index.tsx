import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const PHeader: React.FC = () => {
  const logo =
    'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg';

  return (
    <header className="flex static justify-center w-full h-16 bg-dark-blue">
      <div className="w-[1300px] h-full px-8 flex place-content-between">
        <Link className="flex" to="/">
          <img className="w-48" src={logo}></img>
        </Link>
        <MagnifyingGlassIcon className="text-light-blue" />
      </div>
    </header>
  );
};

export default PHeader;
