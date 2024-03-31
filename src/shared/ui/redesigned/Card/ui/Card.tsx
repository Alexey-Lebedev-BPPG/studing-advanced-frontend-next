import { FC, HTMLAttributes, ReactNode } from 'react';
import cls from './Card.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type CardTheme = 'normal' | 'outline' | 'light';
type CardPadding = '0' | '8' | '16' | '24';
type CardBorder = 'round' | 'normal-border' | 'partial';

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  border?: CardBorder;
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
  fullWidth?: boolean;
  padding?: CardPadding;
  variant?: CardTheme;
}

const mapPaddingToClass: Record<CardPadding, string> = {
  '0': 'gap-0',
  '8': 'gap-8',
  '16': 'gap-16',
  '24': 'gap-24',
};

export const Card: FC<ICardProps> = props => {
  const {
    border = 'normal',
    children,
    className,
    fullHeight,
    fullWidth,
    padding = '8',
    variant = 'normal',
    ...otherProps
  } = props;

  const paddings = mapPaddingToClass[padding];

  return (
    <div
      className={classNames(
        cls.card,
        { [cls['full-width']]: fullWidth, [cls['full-height']]: fullHeight },
        // @ts-ignore
        [className, cls[variant], cls[paddings], cls[border]],
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
};
