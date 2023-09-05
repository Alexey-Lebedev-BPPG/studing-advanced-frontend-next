'use client';

import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import cls from './NotFoundPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface INotFoundPageProps {
  className?: string;
}

export const NotFoundPage: FC<INotFoundPageProps> = props => {
  const { className } = props;

  const { t } = useTranslation();
  return (
    <div
      data-testid='NotFoundPage'
      className={classNames(cls.notFoundPage, {}, [className])}
    >
      {t('Страница не найдена')}
    </div>
  );
};