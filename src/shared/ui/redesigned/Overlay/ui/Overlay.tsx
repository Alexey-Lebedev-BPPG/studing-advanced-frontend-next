import { FC, memo } from 'react';
import cls from './Overlay.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface IOverlayProps {
  className?: string;
  onClick?: () => void;
}

// компонент для затемнения модального окна
export const Overlay: FC<IOverlayProps> = memo(props => {
  const { className, onClick } = props;

  return (
    <div className={classNames(cls.overlay, {}, [className])} onClick={onClick}>
      <div />
    </div>
  );
});
