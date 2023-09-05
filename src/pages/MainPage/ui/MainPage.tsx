'use client';

import { useTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import { Counter } from '@/entities/Counter';
import { Input } from '@/shared/ui/deprecated/Input';
import { Page } from '@/widgets/Page';
import { BugButton } from '@/widgets/PageError';

const MainPage: FC = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  const onChange = (val: string) => setValue(val);

  return (
    <Page data-testid='MainPage'>
      {/* компонент для тестирования создания ошибки */}
      <BugButton />
      <Input value={value} placeholder='Введите текст' onChange={onChange} />
      {t('Главная страница')}
      <Counter />
    </Page>
  );
};

export default MainPage;
