import CastCard from '../CastCard';
import { ICastSliderProps } from './ICastSliderProps';
import { getFullImageUrl } from '../../utils/utilFunctions';

const CastSlider: React.FC<ICastSliderProps> = ({ movieCast }) => {
  return (
    <div>
      {!movieCast ? (
        <div>Não temos uma lista do elenco deste filme</div>
      ) : (
        <div
          className="flex flex-row gap-x-[40px] w-[1300px] h-[300px] mt-[15px] overflow-x-scroll
            overflow-y-hidden">
          {movieCast.map(actor => (
            <CastCard
              key={actor.id}
              actorImageUrl={getFullImageUrl(actor.profile_path)}
              actorName={actor.name}
              characterName={actor.character}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CastSlider;
