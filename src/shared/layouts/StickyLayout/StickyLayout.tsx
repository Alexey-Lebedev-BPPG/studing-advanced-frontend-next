'use client';

import { FC, ReactElement } from 'react';
import cls from './stickyLayout.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface IStickyLayoutProps {
  className?: string;
  content: ReactElement;
  left?: ReactElement;
  right?: ReactElement;
}

export const StickyLayout: FC<IStickyLayoutProps> = props => {
  const { className, content, left, right } = props;

  return (
    <div className={classNames(cls.stickyLayout, {}, [className])}>
      {!!left && <div className={cls.left}>{left}</div>}
      <div className={cls.content}>{content}</div>
      {!!right && <div className={cls.right}>{right}</div>}
    </div>
  );
};
