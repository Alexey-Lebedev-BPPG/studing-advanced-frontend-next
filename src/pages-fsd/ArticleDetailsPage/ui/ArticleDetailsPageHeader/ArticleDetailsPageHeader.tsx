import { useTranslations } from 'next-intl';
import { FC, memo, useCallback } from 'react';
import { getCanEditArticle } from '../../model/selectors/article/article';
import { getArticleDetailsData } from '@/entities/Article';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppSelector } from '@/shared/lib/hooks/redux';
import { useAppNavigation } from '@/shared/lib/hooks/useAppNavigation/useAppNavigation';
import { Button } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';

export interface IArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader: FC<IArticleDetailsPageHeaderProps> =
  memo(props => {
    const { className } = props;
    const t = useTranslations();
    const { push } = useAppNavigation();

    const article = useAppSelector(getArticleDetailsData);
    const canEdit = useAppSelector(getCanEditArticle);

    const onBackToList = useCallback(() => {
      push({ path: getRouteArticles() });
    }, [push]);
    const onEditArticle = useCallback(() => {
      article && push({ path: getRouteArticleEdit(article.id) });
    }, [article, push]);

    return (
      <HStack max justify='between' className={classNames('', {}, [className])}>
        <Button onClick={onBackToList}>{t('Назад к списку')}</Button>
        {!!canEdit && (
          <Button onClick={onEditArticle}>{t('Редактировать')}</Button>
        )}
      </HStack>
    );
  });
