import Card from '../Card';
import { ICastCardProps } from './ICastCardProps';
const CastCard: React.FC<ICastCardProps> = ({
  actorName,
  characterName,
  actorImageUrl,
  className,
}) => {
  return (
    <>
      <Card className={className ?? ''} size={'sm'} imgUrl={actorImageUrl}>
        <div>
          <p className="font-bold">{actorName}</p>
          <p className="text-[12px] font-normal">{characterName}</p>
        </div>
      </Card>
    </>
  );
};

export default CastCard;
