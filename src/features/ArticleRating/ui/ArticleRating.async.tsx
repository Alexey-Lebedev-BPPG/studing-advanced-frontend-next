import { Suspense, lazy } from 'react';
import { IArticleRatingProps } from './ArticleRating';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

export const ArticleRatingLazy = lazy(() => import('./ArticleRating'));

export const ArticleRatingAsync = (props: IArticleRatingProps) => (
  <Suspense fallback={<Skeleton width='100%' height={140} />}>
    <ArticleRatingLazy {...props} />
  </Suspense>
);
