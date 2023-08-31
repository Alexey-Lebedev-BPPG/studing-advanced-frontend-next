'use client';

import Image, { ImageProps } from 'next/image';
import { FC } from 'react';
import cls from './Icon.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IIconProps extends ImageProps {
  // принимаем ссылку на свг
  // Svg: VFC<SVGProps<SVGSVGElement>>;
  className?: string;
  inverted?: boolean;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
// обертка для свг, которая будет задавать цвета
export const Icon: FC<IIconProps> = props => {
  const { className, inverted, ...otherProps } = props;

  return (
    // <Svg
    //   className={classNames(inverted ? cls.inverted : cls.icon, {}, [
    //     className,
    //   ])}
    //   {...otherProps}
    // />
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      className={classNames(inverted ? cls.inverted : cls.icon, {}, [
        className,
      ])}
      {...otherProps}
    />
  );
};
