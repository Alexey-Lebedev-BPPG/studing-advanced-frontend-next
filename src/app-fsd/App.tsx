'use client';

import { FC, ReactNode, useEffect } from 'react';
import { getUserInited, initAuthData } from '@/entities/User';
import { AppLoadLayout } from '@/shared/layouts/AppLoadLayout';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { SideBar } from '@/widgets/SideBar';

interface IAppProps {
  children?: ReactNode;
}

export const App: FC<IAppProps> = props => {
  const { children } = props;

  // const pathname = useAppPathname();
  // const isLocal = process.env.NEXT_PUBLIC_APP_ENV === 'local';

  const dispatch = useAppDispatch();
  const inited = useAppSelector(getUserInited);
  // получаем компонент, который необходимо показывать на текущей странице
  // const toolbar = useAppToolbar();

  // при инициализации приложения проверяем авторизованность юзера из локал стораджа
  useEffect(() => {
    // делаем обязательную проверку на то, проинициализированы ли были данные или нет, т.к. при принудительном перерендере всего приложения (когда меняем фичи-флаги) запрос пройдет заново
    if (!inited) dispatch(initAuthData());
  }, [dispatch, inited]);

  if (!inited)
    return (
      <ToggleFeatures
        nameFeatures={'isAppRedesigned'}
        off={
          <div id='app' className='app'>
            <PageLoader />
          </div>
        }
        on={
          <div id='app' className={classNames('app-redesigned', {}, [])}>
            <AppLoadLayout />
          </div>
        }
      />
    );

  // меняем отображение в зависимости от включенного флага редизайна
  return (
    <ToggleFeatures
      nameFeatures='isAppRedesigned'
      off={
        <div id='app' className='app'>
          <Navbar />
          <div className='content-page'>
            <SideBar />
            {children}
          </div>
        </div>
      }
      on={
        <div id='app' className={classNames('app-redesigned', {}, [])}>
          <MainLayout
            // @ts-ignore
            content={children}
            header={<Navbar />}
            sidebar={<SideBar />}
            // toolbar={toolbar}
          />
        </div>
      }
    />
  );
};
