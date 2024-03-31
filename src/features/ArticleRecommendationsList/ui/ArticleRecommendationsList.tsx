import { t } from 'i18next';
import { FC, memo } from 'react';
import { useArticleRecommendationsList } from '../api/articleRecommendationApi';
import { ArticleList } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export interface IArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList: FC<IArticleRecommendationsListProps> =
  memo(props => {
    const { className } = props;
    // передаем в хук наш лимит и получаем поля по умолчанию (data, isLoading, error и т.д)
    const {
      data: recommendations,
      error,
      isLoading,
    } = useArticleRecommendationsList(3);

    if (isLoading || error || !recommendations) return null;

    return (
      <VStack
        data-testid='ArticleRecommendationsList'
        gap='8'
        className={classNames('', {}, [className])}
      >
        <ToggleFeatures
          nameFeatures={'isAppRedesigned'}
          on={<Text size='l' title={`${t('Рекомендуем')}`} />}
          off={<TextDeprecated size='l' title={`${t('Рекомендуем')}`} />}
        />
        <ArticleList
          target='_blank'
          articles={recommendations}
          isLoading={isLoading}
          virtualized={false}
        />
      </VStack>
    );
  });
