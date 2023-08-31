import { ImageProps } from 'next/image';
import { CSSProperties, FC, useMemo } from 'react';
import cls from './Avatar.module.scss';
import UserIcon from '../../../../assets/icons/user-filled.svg';
import { AppImage } from '../../AppImage';
import { Icon } from '../../Icon';
import { Skeleton } from '../../Skeleton';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IAvatarProps extends ImageProps {
  className?: string;
  size?: number;
}

export const Avatar: FC<IAvatarProps> = props => {
  const { alt = '', className, size = 100, src } = props;

  const styles = useMemo<CSSProperties>(
    () => ({
      height: size,
      width: size,
    }),
    [size],
  );
  const fallback = <Skeleton width={size} height={size} border='50%' />;
  const errorFallback = (
    <Icon width={size} height={size} src={UserIcon} alt='' />
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
