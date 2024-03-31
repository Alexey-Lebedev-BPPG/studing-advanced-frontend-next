import { FC } from 'react';
import cls from './PageLoader.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/deprecated/Loader';

interface IPageLoaderProps {
  className?: string;
}

export const PageLoader: FC<IPageLoaderProps> = props => {
  const { className } = props;

  return (
    <div className={classNames(cls['page-loader'], {}, [className])}>
      <Loader />
    </div>
  );
};
