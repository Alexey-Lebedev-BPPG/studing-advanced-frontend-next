import { FC, memo, useCallback } from 'react';
import cls from './additionalInfoContainer.module.scss';
import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit } from '@/shared/const/router';
import { useAppSelector } from '@/shared/lib/hooks/redux';
import { useAppNavigation } from '@/shared/lib/hooks/useAppNavigation/useAppNavigation';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';

export const AdditionalInfoContainer: FC = memo(props => {
  const article = useAppSelector(getArticleDetailsData);

  const { push } = useAppNavigation();

  const onEditArticle = useCallback(() => {
    article && push({ path: getRouteArticleEdit(article.id) });
  }, [article, push]);

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
});
