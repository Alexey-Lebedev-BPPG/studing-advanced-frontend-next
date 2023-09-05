'use client';

import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Page } from '@/widgets/Page';

const AboutPage: FC = () => {
  // в хук можем передать только тот файл перевода, который нам необходим
  const { t } = useTranslation('about');
  return <Page data-testid='AboutPage'>{t('О сайте')}</Page>;
};

export default AboutPage;
