import { useTranslations } from 'next-intl';
import { FC, memo, useCallback } from 'react';
import {
  useArticleRating,
  useCreateArticleRating,
} from '../api/articleRatingApi';
import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import { useAppSelector } from '@/shared/lib/hooks/redux';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

export interface IArticleRatingProps {
  articleId: string;
  className?: string;
}

const ArticleRating: FC<IArticleRatingProps> = memo(props => {
  const { articleId, className } = props;

  const t = useTranslations();
  const userData = useAppSelector(getUserAuthData);
  const { data, isLoading } = useArticleRating({
    articleId,
    userId: userData?.id || '',
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
          userId: userData?.id || '',
        });
      } catch (error) {
        console.log('error', error);
      }
    },
    [articleId, rateArticleMutation, userData?.id],
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
});

export default ArticleRating;
