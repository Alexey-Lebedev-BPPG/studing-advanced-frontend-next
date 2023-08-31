'use client';

import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsPageReducer } from '../../model/slice';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';
import ArticleDetailsComments from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { ArticleDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { StickyLayout } from '@/shared/layouts/StickyLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/deprecated/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Page } from '@/widgets/Page';

interface IArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage: FC<IArticleDetailsPageProps> = props => {
  const { className } = props;

  const searchParams = useSearchParams();

  const id = searchParams?.get('id');

  if (!id) return null;

  return (
    <DynamicModuleLoader reducers={reducers}>
      <ToggleFeatures
        nameFeatures={'isArticleRatingEnabled'}
        off={
          <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
            <VStack max gap='16'>
              <ArticleDetailsPageHeader />
              <DetailsContainer />
              <Card>{'Оценка статей скоро появится!'}</Card>
              <ArticleRecommendationsList />
              <ArticleDetailsComments id={id} />
            </VStack>
          </Page>
        }
        on={
          <StickyLayout
            right={<AdditionalInfoContainer />}
            content={
              <Page
                className={classNames(cls.articleDetailsPage, {}, [className])}
              >
                <VStack max gap='16'>
                  <ArticleDetails id={id} />
                  <ArticleRating articleId={id} />
                  <ArticleRecommendationsList />
                  <ArticleDetailsComments id={id} />
                </VStack>
              </Page>
            }
          />
        }
      />
    </DynamicModuleLoader>
  );
};

export default ArticleDetailsPage;
