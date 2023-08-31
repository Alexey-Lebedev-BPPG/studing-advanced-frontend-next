'use client';

import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { ArticleDetails } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';

interface IDetailsContainerProps {
  className?: string;
}

export const DetailsContainer: FC<IDetailsContainerProps> = props => {
  const { className } = props;
  const searchParams = useSearchParams();

  const id = searchParams?.get('id');

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
};
