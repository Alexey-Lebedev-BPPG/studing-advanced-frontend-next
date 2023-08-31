'use client';

import { useRouter } from 'next/navigation';
import { FC, useCallback } from 'react';
import cls from './additionalInfoContainer.module.scss';
import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit } from '@/shared/const/router';
import { useAppSelector } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';

export const AdditionalInfoContainer: FC = props => {
  const article = useAppSelector(getArticleDetailsData);

  const navigate = useRouter();

  const onEditArticle = useCallback(() => {
    article && navigate.push(getRouteArticleEdit(article.id));
  }, [article, navigate]);

  if (!article) return null;

  return (
    <Card padding='24' border='partial' className={cls.card}>
      <ArticleAdditionalInfo
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
        onEdit={onEditArticle}
      />
    </Card>
  );
};
