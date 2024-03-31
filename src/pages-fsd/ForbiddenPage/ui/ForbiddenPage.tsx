import { useTranslations } from 'next-intl';
import { FC, memo } from 'react';
import cls from './ForbiddenPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

export interface IForbiddenPageProps {
  className?: string;
}

export const ForbiddenPage: FC<IForbiddenPageProps> = memo(({ className }) => {
  const t = useTranslations();

  return (
    <Page
      data-testid='ForbiddenPage'
      className={classNames(cls['forbidden-page'], {}, [className])}
    >
      {t('У Вас нет доступа на эту страницу')}
    </Page>
  );
});
