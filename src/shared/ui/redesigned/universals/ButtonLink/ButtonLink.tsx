import { useTranslations } from 'next-intl';
import { ComponentProps, ElementType } from 'react';
// import cls from './buttonLink.module.scss';
// import { classNames } from '@/shared/lib/classNames/classNames';

type TextOwnProps<T extends ElementType = ElementType> = {
  as?: T;
  children?: string;
  className?: string;
};

type IButtonLinkProps<T extends ElementType> = TextOwnProps<T> &
  Omit<ComponentProps<T>, keyof TextOwnProps>;

const defaultElement = 'button';

export const ButtonLink = <T extends ElementType = typeof defaultElement>(
  props: IButtonLinkProps<T>,
) => {
  const { as, children, className, ...otherProps } = props;

  const t = useTranslations();

  const TagName = as || defaultElement;

  return (
    <TagName
      // className={classNames(cls.buttonLink, {}, [className])}
      {...otherProps}
    >
      {children}
    </TagName>
  );
};
