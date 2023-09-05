'use client';

import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { FC, useCallback } from 'react';
import {
  useArticleRating,
  useCreateArticleRating,
} from '../api/articleRatingApi';
import { RatingCard } from '@/entities/Rating';
import { User } from '@/entities/User';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

export interface IArticleRatingProps {
  articleId: string;
  className?: string;
}

const ArticleRating: FC<IArticleRatingProps> = props => {
  const { articleId, className } = props;

  const { t } = useTranslation();
  const { data: dataSession } = useSession();
  const authData = (dataSession?.user || undefined) as User;
  const { data, isLoading } = useArticleRating({
    articleId,
    userId: authData?.id || '',
  });
  // использование запроса на создание
  const [rateArticleMutation, { isLoading: isLoadingCreate }] =
    useCreateArticleRating();

  const rating = data?.[0];

  // ввиду того, что в onAccept и onCancel будет отправляться один и тот же запрос, то выносим его в отдельную функцию, которую переиспользуем
  const handleRateArticleMutation = useCallback(
    (starCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          articleId,
          feedback,
          rate: starCount,
          userId: authData?.id || '',
        });
      } catch (error) {
        console.log('error', error);
      }
    },
    [articleId, rateArticleMutation, authData?.id],
  );

  const onAccept = useCallback(
    (starCount: number, feedback?: string) =>
      handleRateArticleMutation(starCount, feedback),
    [handleRateArticleMutation],
  );

  const onCancel = useCallback(
    (starCount: number) => handleRateArticleMutation(starCount),
    [handleRateArticleMutation],
  );

  if (isLoading) return <Skeleton width='100%' height={120} />;

  return (
    <RatingCard
      hasFeedback
      rate={rating?.rate}
      className={className}
      title={t('Оцените статью')}
      feedbackTitle={t(
        'Оставьте свой отзыв о статье, это поможет улучшить качество',
      )}
      onAccept={onAccept}
      onCancel={onCancel}
    />
  );
};

export default ArticleRating;
