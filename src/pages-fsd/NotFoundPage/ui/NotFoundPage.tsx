import { useTranslations } from 'next-intl';
import { FC } from 'react';
import cls from './NotFoundPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface INotFoundPageProps {
  className?: string;
}

export const NotFoundPage: FC<INotFoundPageProps> = props => {
  const { className } = props;

  const t = useTranslations();
  return (
    <div
      data-testid='NotFoundPage'
      className={classNames(cls['not-found-page'], {}, [className])}
    >
      {t('Страница не найдена')}
    </div>
  );
};
