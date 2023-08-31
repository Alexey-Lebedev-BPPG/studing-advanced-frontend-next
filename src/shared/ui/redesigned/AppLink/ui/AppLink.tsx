'use client';

import Link, { LinkProps } from 'next/link';
import { FC, ForwardedRef, ReactNode, forwardRef } from 'react';

export type AppLinkVariant = 'primary' | 'secondary' | 'red';

interface AppLinkProps extends LinkProps {
  activeClassName?: string;
  children?: ReactNode;
  className?: string;
  variant?: AppLinkVariant;
}

// не используем memo в компонентах, где у нас есть children
export const AppLink: FC<AppLinkProps> = forwardRef(
  (
    props,
    // добавляем реф, чтоб не было ошибки "Function components cannot be given refs..." в консоли
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    const {
      activeClassName = '',
      children,
      className,
      variant = 'primary',
      ...otherProps
    } = props;

    return (
      // навлинк позволяет отслеживать активную ссылку
      <Link
        ref={ref}
        // className={({ isActive }) =>
        //   classNames(cls.appLink, { [activeClassName]: isActive }, [
        //     className,
        //     cls[variant],
        //   ])
        // }
        {...otherProps}
      >
        {children}
      </Link>
    );
  },
);
