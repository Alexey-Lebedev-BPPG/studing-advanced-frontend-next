import { FC, memo } from 'react';
import { ArticleDetails } from '@/entities/Article';
import { useQueryParams } from '@/shared/lib/hooks/useQueryParams';
import { Card } from '@/shared/ui/redesigned/Card';

interface IDetailsContainerProps {
  className?: string;
}

export const DetailsContainer: FC<IDetailsContainerProps> = memo(props => {
  const { className } = props;
  const { id } = useQueryParams();

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
