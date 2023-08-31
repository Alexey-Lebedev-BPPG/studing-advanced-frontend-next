'use client';

import Link, { LinkProps } from 'next/link';
import { FC, ForwardedRef, ReactNode, forwardRef } from 'react';
import cls from './AppLink.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type AppLinkTheme = 'primary' | 'secondary';

interface AppLinkProps extends LinkProps {
  children?: ReactNode;
  className?: string;
  theme?: AppLinkTheme;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
// не используем memo в компонентах, где у нас есть children
export const AppLink: FC<AppLinkProps> = forwardRef(
  (
    props,
    // добавляем реф, чтоб не было ошибки "Function components cannot be given refs..." в консоли
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    const { children, className, theme = 'primary', ...otherProps } = props;

    return (
      <Link
        ref={ref}
        className={classNames(cls.appLink, {}, [className, cls[theme]])}
        {...otherProps}
      >
        {children}
      </Link>
    );
  },
);
