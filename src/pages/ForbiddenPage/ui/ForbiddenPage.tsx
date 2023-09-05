'use client';

import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import cls from './ForbiddenPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

export interface IForbiddenPageProps {
  className?: string;
}

const ForbiddenPage: FC<IForbiddenPageProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Page
      data-testid='ForbiddenPage'
      className={classNames(cls.forbiddenPage, {}, [className])}
    >
      {t('У Вас нет доступа на эту страницу')}
    </Page>
  );
};

export default ForbiddenPage;
