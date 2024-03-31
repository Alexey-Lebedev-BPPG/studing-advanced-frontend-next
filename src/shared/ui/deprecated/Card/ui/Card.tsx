import { FC, HTMLAttributes, ReactNode } from 'react';
import cls from './Card.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type CardTheme = 'normal' | 'outline';

export interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  theme?: CardTheme;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Card: FC<ICardProps> = props => {
  const {
    children,
    className,
    fullWidth,
    theme = 'normal',
    ...otherProps
  } = props;

  return (
    <div
      className={classNames(cls.card, { [cls['full-width']]: fullWidth }, [
        className,
        cls[theme],
      ])}
      {...otherProps}
    >
      {children}
    </div>
  );
};
