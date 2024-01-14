import MovieList from '../../components/MovieList';
import Input from '../../components/Input';

const HomePage: React.FC = () => {
  return (
    <div className="flex justify-center w-full h-full">
      <div className="flex flex-col w-[1300px]">
        <div
          data-testid="home-page"
          className={`flex justify-center flex-col text-[3em] text-white px-[40px] py-[40px] h-[360px]
            bg-cover
            bg-[url("https://cdn.discordapp.com/attachments/1194999935716839507/1195109479394578642/xpba0Dxz3sxV3QgYLR8UIe1LAAX.png?ex=65b2cb6f&is=65a0566f&hm=6772e8f385a1aa0398d7615dd77ae344b4a1d19d103889dc73f1edc0e8587447&")]`}>
          <span className="font-bold">Bem-Vindo(a)</span>
          <span className="text-[30px] mb-10">
            Milhões de Filmes, Séries e Pessoas para Descobrir. Explore já.
          </span>

          <Input
            placeholder="Procurar por filmes"
            button={{ label: 'Buscar', onClick: () => {} }}
          />
        </div>
        <div className="mt-8">
          <MovieList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
