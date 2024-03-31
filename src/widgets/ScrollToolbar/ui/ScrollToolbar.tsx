import { FC, memo } from 'react';
import cls from './ScrollToolbar.module.scss';
import { ScrollToTopButton } from '@/features/ScrollToTopButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface IScrollToolbarProps {
  className?: string;
}

export const ScrollToolbar: FC<IScrollToolbarProps> = memo(props => {
  const { className } = props;

  return (
    <VStack
      max
      justify='center'
      align='center'
      className={classNames(cls['scroll-toolbar'], {}, [className])}
    >
      <ScrollToTopButton />
    </VStack>
  );
});
