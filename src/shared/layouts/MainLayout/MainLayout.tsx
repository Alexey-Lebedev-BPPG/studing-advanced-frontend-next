import { FC, ReactElement, memo } from 'react';
import cls from './mainLayout.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IMainLayoutProps {
  className?: string;
  content: ReactElement;
  header: ReactElement;
  sidebar: ReactElement;
  toolbar?: ReactElement;
}

// компонент для задания скелета страниц
export const MainLayout: FC<IMainLayoutProps> = memo(props => {
  const { className, content, header, sidebar, toolbar } = props;

  return (
    <div className={classNames(cls['main-layout'], {}, [className])}>
      <div className={cls.sidebar}>{sidebar}</div>
      <div className={cls.content}>{content}</div>
      <div className={cls.rightbar}>
        <div
        // className={cls.header}
        >
          {header}
        </div>
        <div className={cls.toolbar}>{toolbar}</div>
      </div>
    </div>
  );
});
