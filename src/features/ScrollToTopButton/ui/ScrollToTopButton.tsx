import { FC, memo } from 'react';
import cls from './ScrollToTopButton.module.scss';
import CircleIcon from '@/shared/assets/icons/circle-up.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/redesigned/Icon';

export interface IScrollToTopButtonProps {
  className?: string;
}

export const ScrollToTopButton: FC<IScrollToTopButtonProps> = memo(props => {
  const { className } = props;

  const onClick = () => window.scrollTo({ behavior: 'smooth', top: 0 });

  return (
    <Icon
      clickable
      Svg={CircleIcon}
      width={32}
      height={32}
      className={classNames(cls['scroll-to-top-button'], {}, [className])}
      onClick={onClick}
    />
  );
});
