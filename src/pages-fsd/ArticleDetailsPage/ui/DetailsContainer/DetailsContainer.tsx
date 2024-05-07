import { FC, memo } from 'react';
import { ArticleDetails } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';

interface IDetailsContainerProps {
  className?: string;
  id: string;
}

export const DetailsContainer: FC<IDetailsContainerProps> = memo(props => {
  const { className, id } = props;

  return (
    <Card
      fullHeight
      fullWidth
      border='partial'
      className={className}
      padding='24'
    >
      <ArticleDetails id={id} />
    </Card>
  );
});
