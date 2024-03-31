import { CSSProperties, FC, memo } from 'react';
import cls from './Skeleton.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ISkeletonProps {
  border?: string;
  className?: string;
  height?: string | number;
  width?: string | number;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

export const Skeleton: FC<ISkeletonProps> = memo(props => {
  const { border, className, height, width } = props;

  const styles: CSSProperties = {
    borderRadius: border,
    height,
    width,
  };

  return (
    <div className={classNames(cls.skeleton, {}, [className])} style={styles}>
      <div />
    </div>
  );
});
