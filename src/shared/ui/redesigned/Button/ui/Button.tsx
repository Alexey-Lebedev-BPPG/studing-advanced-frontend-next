import {
  ButtonHTMLAttributes,
  FC,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from 'react';
import cls from './Button.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type ButtonVariant = 'clear' | 'outline' | 'filled';
type ButtonColor = 'normal' | 'success' | 'error';
type ButtonSize = 'm' | 'l' | 'xl';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  /**
   * Содержимое кнопки
   */
  children?: ReactNode;
  className?: string;
  color?: ButtonColor;
  /**
   * Увеличивает кнопку на всю свободную ширину
   */
  fullWidth?: boolean;
  /**
   * Флаг, отвечающий за работу кнопки
   */
  readonly?: boolean;
  /**
   * Размер кнопки в соответствии с дизайн системой
   */
  size?: ButtonSize;
  /**
   * Флаг, делающий кнопку квадратной
   */
  square?: boolean;
  /**
   * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противоположный теме приложения цвет и тд)
   */
  variant?: ButtonVariant;
}

// не используем memo в компонентах, где у нас есть children
// обернем кнопку тоже в memo, хоть она и принимает чилдрены, но они будут в виде простого примитива без сложной древовидной структуры
export const Button: FC<IButtonProps> = forwardRef(
  (props, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
      addonLeft,
      addonRight,
      children,
      className,
      color = 'normal',
      fullWidth,
      readonly,
      size = 'm',
      square,
      variant = 'outline',
      ...otherProps
    } = props;

    const mods = {
      [cls.square]: square,
      [cls.disabled]: readonly,
      [cls['full-width']]: fullWidth,
      [cls['with-addon']]: Boolean(addonLeft) || Boolean(addonRight),
    };

    return (
      <button
        type='button'
        className={classNames(cls.button, mods, [
          className,
          cls[variant],
          cls[size],
          cls[color],
        ])}
        {...otherProps}
        ref={ref}
      >
        {!!addonLeft && <div className={cls['addon-left']}>{addonLeft}</div>}
        {children}
        {!!addonRight && <div className={cls['addon-right']}>{addonRight}</div>}
      </button>
    );
  },
);
