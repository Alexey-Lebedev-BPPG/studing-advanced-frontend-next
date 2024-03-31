import { useTranslations } from 'next-intl';
import { FC, memo } from 'react';
import cls from './AdminPanelPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

export interface IAdminPanelPageProps {
  className?: string;
}

export const AdminPanelPage: FC<IAdminPanelPageProps> = memo(props => {
  const { className } = props;

  const t = useTranslations();

  return (
    <Page
      data-testid='AdminPanelPage'
      className={classNames(cls['admin-panel-page'], {}, [className])}
    >
      {t('Админка')}
    </Page>
  );
});
