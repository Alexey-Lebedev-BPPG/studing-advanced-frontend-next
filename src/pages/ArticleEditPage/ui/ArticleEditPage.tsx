'use client';

import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './ArticleEditPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

export interface IArticleEditPageProps {
  className?: string;
}

const ArticleEditPage: FC<IArticleEditPageProps> = props => {
  const { className } = props;

  const { t } = useTranslation();
  const searchParams = useSearchParams();

  const id = searchParams?.get('id');
  // если есть id, то страница для редактирования
  const isEdit = Boolean(id);

  return (
    <Page className={classNames(cls.articleEditPage, {}, [className])}>
      {isEdit
        ? t('Редактирование статьи с ID = ') + id
        : t('Создание новой статьи')}
    </Page>
  );
};

export default ArticleEditPage;
