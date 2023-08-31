'use client';

import { FC } from 'react';
import cls from './PageError.module.scss';
import { Button } from '@/shared/ui/deprecated/Button';

interface IPageErrorProps {}

export const PageError: FC<IPageErrorProps> = () => {
  const reloadPage = () => window.location.reload();

  return (
    <div className={cls.pageError}>
      <p>{'Произошла непредвиденная ошибка'}</p>
      <Button onClick={reloadPage}>{'Обновить страницу'}</Button>
    </div>
  );
};
