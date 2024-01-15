import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid place-items-center w-full h-[calc(100vh-400px)]">
        <div className="flex flex-col items-center">
          <p className="text-[50px]">Página não encontrada</p>
          <p>
            Ops, não conseguimos encontrar a página que você está procurando.
            Tente voltar para a página anterior
          </p>
          <Button
            data-testid="goback-button"
            className="mt-[40px]"
            label="Voltar para a página inicial"
            textSize={'lg'}
            rounded={'sm'}
            variant={'primary'}
            onClick={() => {
              navigate('/');
            }}
          />
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
