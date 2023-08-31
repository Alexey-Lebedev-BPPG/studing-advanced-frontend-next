'use client';

import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const AboutPage: FC = () => {
  // в хук можем передать только тот файл перевода, который нам необходим
  const { t } = useTranslation('about');
  return <Page data-testid='AboutPage'>{t('О сайте')}</Page>;
};

export default AboutPage;
