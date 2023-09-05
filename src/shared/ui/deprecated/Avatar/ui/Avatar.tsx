import { ImageProps } from 'next/image';
import { CSSProperties, FC, useMemo } from 'react';
import cls from './Avatar.module.scss';
import UserIcon from '../../../../assets/icons/user-filled.svg';
import { AppImage } from '../../../redesigned/AppImage';
import { Icon } from '../../Icon';
import { Skeleton } from '../../Skeleton';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IAvatarProps extends Omit<ImageProps, 'alt'> {
  alt?: string;
  className?: string;
  // для использования в компонентах, где инвертированы цвета
  fallbackInverted?: boolean;
  size?: number;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Avatar: FC<IAvatarProps> = props => {
  const { alt = '', className, fallbackInverted, size = 100, src } = props;

  const styles = useMemo<CSSProperties>(
    () => ({
      height: size,
      width: size,
    }),
    [size],
  );

  const fallback = <Skeleton width={size} height={size} border='50%' />;

  const errorFallback = (
    <Icon
      alt={alt}
      inverted={fallbackInverted}
      width={size}
      height={size}
      src={UserIcon}
    />
  );

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      style={styles}
      className={classNames(cls.avatar, {}, [className])}
      alt={alt}
    />
  );
};
