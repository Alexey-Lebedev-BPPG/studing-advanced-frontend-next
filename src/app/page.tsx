import { Counter } from '@/entities/Counter';
import { Page } from '@/widgets/Page';
import { BugButton } from '@/widgets/PageError';
// import { useState } from 'react';

const MainPage = () => (
  // const { t } = useTranslation();
  // const [value, setValue] = useState('');

  // const onChange = (val: string) => setValue(val);

  <Page data-testid='MainPage'>
    {/* компонент для тестирования создания ошибки */}
    <BugButton />
    {/* <Input value={value} placeholder='Введите текст' onChange={onChange} /> */}
    {/* {t('Главная страница')} */}
    {'Главная страница'}
    <Counter />
  </Page>
);
export default MainPage;
