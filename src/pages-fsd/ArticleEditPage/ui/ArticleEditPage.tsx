import { useTranslations } from 'next-intl';
import { FC, memo } from 'react';
import cls from './ArticleEditPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useQueryParams } from '@/shared/lib/hooks/useQueryParams';
import { Page } from '@/widgets/Page';

export interface IArticleEditPageProps {
  className?: string;
}

export const ArticleEditPage: FC<IArticleEditPageProps> = memo(props => {
  const { className } = props;

  const t = useTranslations();
  const { id } = useQueryParams();
  // если есть id, то страница для редактирования
  const isEdit = Boolean(id);

  return (
    <Page className={classNames(cls['article-edit-page'], {}, [className])}>
      {isEdit
        ? t('Редактирование статьи с ID = ') + id
        : t('Создание новой статьи')}
    </Page>
  );
});
