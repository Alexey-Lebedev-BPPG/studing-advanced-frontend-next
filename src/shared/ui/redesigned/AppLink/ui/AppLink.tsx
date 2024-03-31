import { LinkProps } from 'next/link';
import { useLocale } from 'next-intl';
import {
  AnchorHTMLAttributes,
  FC,
  ForwardedRef,
  ReactNode,
  forwardRef,
  useMemo,
} from 'react';
import cls from './AppLink.module.scss';
import { getRouteMain } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink as AppLinkNAv } from '@/shared/lib/router/navigation';
import { SizeElement } from '@/shared/types/ui';

export type AppLinkVariant = 'primary' | 'red';
export type TagLink = 'span' | 'div';
type BaseLinkProps = Omit<LinkProps, 'locale'> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>;
interface AppLinkProps extends BaseLinkProps {
  activeClassName?: string;
  className?: string;
  as?: TagLink;
  variant?: AppLinkVariant;
  startIcon?: boolean;
  endIcon?: boolean;
  size?: SizeElement;
  children?: ReactNode;
}

// не используем memo в компонентах, где у нас есть children
export const AppLink: FC<AppLinkProps> = forwardRef(
  (
    props,
    // добавляем реф, чтоб не было ошибки "Function components cannot be given refs..." в консоли
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    const {
      href,
      activeClassName = '',
      as = 'div',
      variant = 'primary',
      className,
      children,
      startIcon = false,
      endIcon = false,
      size = 'large',
      ...otherProps
    } = props;

    const currentTo = useMemo(() => {
      if (typeof href === 'number') return href as unknown as string;
      return href;
    }, [href]);

    const language = useLocale();
    const matcherPath = window.location.pathname.replace(`/${language}`, '');

    const isActive = useMemo(
      () =>
        href === matcherPath || (href === getRouteMain() && matcherPath === ''),
      [matcherPath, href],
    );

    return (
      <AppLinkNAv
        ref={ref}
        href={currentTo}
        className={classNames(
          cls['app-link'],
          { [activeClassName]: isActive, [cls.span]: as === 'span' },
          [className, cls[variant]],
        )}
        {...otherProps}
      >
        {/* {!!startIcon && <Icon Svg={LeftOutlinedSVG} />} */}
        {children}
        {/* {!!endIcon && <Icon Svg={RightOutlinedSVG} />} */}
      </AppLinkNAv>
    );
  },
);
