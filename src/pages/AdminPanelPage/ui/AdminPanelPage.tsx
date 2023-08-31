'use client';

import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './AdminPanelPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

export interface IAdminPanelPageProps {
  className?: string;
}

const AdminPanelPage: FC<IAdminPanelPageProps> = props => {
  const { className } = props;

  const { t } = useTranslation();

  return (
    <Page
      data-testid='AdminPanelPage'
      className={classNames(cls.adminPanelPage, {}, [className])}
    >
      {t('Админка')}
    </Page>
  );
};

export default AdminPanelPage;
