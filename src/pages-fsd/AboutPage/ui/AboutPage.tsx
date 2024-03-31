import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { Page } from '@/widgets/Page';

export const AboutPage: FC = () => {
  // в хук можем передать только тот файл перевода, который нам необходим
  const t = useTranslations();
  return <Page data-testid='AboutPage'>{t('О сайте')}</Page>;
};
