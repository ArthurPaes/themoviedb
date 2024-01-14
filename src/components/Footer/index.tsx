const Footer: React.FC = () => {
  const logo =
    'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg';

  const titleClass = 'font-bold text-[20px] tracking-wide';

  return (
    <footer className="flex justify-center w-full h-[360px] bg-dark-blue">
      <div
        className="flex flex-row items-start justify-between w-[1300px] h-[200px] py-[50px]
          text-white">
        <img className="w-48" src={logo}></img>
        <div>
          <p className={titleClass}>O BÁSICO</p>
          <p>Sobre o TMDB</p>
          <p>Contate-nos</p>
          <p>Suporte</p>
          <p>API</p>
          <p>Status do sistema</p>
          <p>Sobre o TMDB</p>
        </div>
        <div>
          <p className={titleClass}>ENVOLVA-SE</p>
          <p>Bíblia do Colaborador</p>
          <p>Adicionar um novo Filme</p>
          <p>Adicionar uma nova Série</p>
        </div>
        <div>
          <p className={titleClass}>COMUNIDADE</p>
          <p>Diretrizes</p>
          <p>Discussões</p>
          <p>Placar de colaboradores</p>
        </div>
        <div>
          <p className={titleClass}>LEGALIDADE</p>
          <p>Termos de uso</p>
          <p>Termos de Uso da API</p>
          <p>Política de privacidade</p>
          <p>DMCA Policy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
