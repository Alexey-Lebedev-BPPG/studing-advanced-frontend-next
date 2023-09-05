'use client';

import Image, { ImageProps } from 'next/image';
import { FC, SVGProps } from 'react';
import cls from './Icon.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>;

interface IIconBaseProps extends Omit<ImageProps, 'alt'> {
  // принимаем ссылку на свг
  // Svg: FC<SVGProps<SVGSVGElement>>;
  alt?: string;
  className?: string;
}

interface NoneClickableIconProps extends IIconBaseProps {
  clickable?: false;
}

interface ClickableIconProps extends IIconBaseProps {
  clickable: true;
  onClick: () => void;
}

type IconProps = NoneClickableIconProps | ClickableIconProps;

// обертка для свг, которая будет задавать цвета
export const Icon: FC<IconProps> = props => {
  const {
    alt = '',
    className,
    clickable,
    height = 32,
    width = 32,
    ...otherProps
  } = props;

  const icon = (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      alt={alt}
      className={classNames(cls.icon, {}, [className])}
      {...otherProps}
      onClick={undefined}
    />
  );

  if (clickable)
    return (
      <button
        style={{ height, width }}
        type='button'
        className={cls.button}
        // eslint-disable-next-line react/destructuring-assignment
        onClick={props.onClick}
      >
        {icon}
      </button>
    );

  return icon;
};
