import { useTranslations } from 'next-intl';
import { FC, memo } from 'react';
import cls from './ArticleEditPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

export interface IArticleEditPageProps {
  className?: string;
  id: string;
}

export const ArticleEditPage: FC<IArticleEditPageProps> = memo(props => {
  const { className, id } = props;

  const t = useTranslations();

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
