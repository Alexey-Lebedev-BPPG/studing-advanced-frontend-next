// подключаем глобальные стили
import '@/app-fsd/styles/index.scss';
import { getServerSession } from 'next-auth';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Providers } from '@/app-fsd/providers/Providers';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Navbar } from '@/widgets/Navbar';
import { SideBar } from '@/widgets/SideBar';

// настраиваем шрифты
// const inter = Inter({ subsets: ["latin"] });

// подключение метаданных на странице
export const metadata: Metadata = {
  description: '',
  title: 'Studying advanced frontend next',
};

interface RootLayoutProps {
  children: ReactNode;
}

// компонент, который предназначен для добавления html и body во все файлы. Здесь чилдреном выступает любая страница
const RootLayout = async (props: RootLayoutProps) => {
  const { children } = props;

  const theme = 'app_dark_theme';

  const session = await getServerSession();

  // const { theme } = useTheme();
  // const dispatch = useAppDispatch();
  // const inited = useAppSelector(getUserInited);
  // // получаем компонент, который необходимо показывать на текущей странице
  // const toolbar = useAppToolbar();

  // // при инициализации приложения проверяем авторизованность юзера из локал стораджа
  // useEffect(() => {
  //   // делаем обязательную проверку на то, проинициализированы ли были данные или нет, т.к. при принудительном перерендере всего приложения (когда меняем фичи-флаги) запрос пройдет заново
  //   if (!inited) dispatch(initAuthData());
  // }, [dispatch, inited]);

  const content = (
    // !session ? (
    //   <ToggleFeatures
    //     nameFeatures={'isAppRedesigned'}
    //     off={
    //       <div id='app' className={classNames('app', {}, [theme])}>
    //         <PageLoader />
    //       </div>
    //     }
    //     on={
    //       <div id='app' className={classNames('app-redesigned', {}, [theme])}>
    //         <AppLoadLayout />
    //       </div>
    //     }
    //   />
    // ) : (
    <ToggleFeatures
      nameFeatures='isAppRedesigned'
      off={
        <div id='app' className={classNames('app', {}, [theme])}>
          {/* оборачиваем приложение в Suspense, чтоб корректно работали переводы */}
          <Navbar />
          <div className='content-page'>
            <SideBar />
            {children}
          </div>
        </div>
      }
      on={
        <div id='app' className={classNames('app-redesigned', {}, [theme])}>
          {/* оборачиваем приложение в Suspense, чтоб корректно работали переводы */}
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
  // );

  // меняем отображение в зависимости от включенного флага редизайна
  return (
    <html lang='en'>
      <body
      // подключаем шрифты на страницу
      // className={inter.className}
      >
        <Providers>
          {/* добавляем хедер и футер, чтоб они появлялись на каждой странице */}
          {/* <Header /> */}
          <main className='container'>{content}</main>
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
};

// @ts-ignore
// export default appWithTranslation(RootLayout);
export default RootLayout;
