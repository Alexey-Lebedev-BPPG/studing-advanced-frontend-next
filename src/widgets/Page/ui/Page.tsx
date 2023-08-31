'use client';

import { usePathname } from 'next/navigation';

import { FC, MutableRefObject, ReactNode, UIEvent, useRef } from 'react';
import cls from './Page.module.scss';
import type { StateSchema } from '@/app-fsd/providers/StoreProvider';
import { getScrollSavePath, scrollSaveActions } from '@/features/ScrollSave';
import { PAGE_ID } from '@/shared/const/pageId';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import {
  useAppDispatch,
  useAppSelector,
} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { TestProps } from '@/shared/types/tests';

export interface IPageProps extends TestProps {
  children: ReactNode;
  className?: string;
  // функция для отработки при достижении конца страницы
  onScrollEnd?: () => void;
}

// компонент для оборачивания страниц, который применяет некоторые стили для всех страниц
export const Page: FC<IPageProps> = props => {
  const { children, className, onScrollEnd, ...otherProps } = props;

  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  // получаем позицию скролла из редакса по нашей странице
  const scrollPosition = useAppSelector(
    (state: StateSchema) => getScrollSavePath(state, pathname || ''),
    // eslint-disable-next-line function-paren-newline
  );

  useInfiniteScroll({
    callback: onScrollEnd,
    triggerRef,
    // чиним скролл, т.к. теперь у нас скролл на главной странице
    wrapperRef: toggleFeatures({
      name: 'isAppRedesigned',
      off: () => wrapperRef,
      on: () => undefined,
    }),
  });

  // возвращаем страницу на позицию
  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  // функция сохранения скролла
  const onScrollHandler = useThrottle((event: UIEvent<HTMLDivElement>) => {
    // получаем значение в пикселях от крайней точки сверху и записываем в редакс
    dispatch(
      scrollSaveActions.setScrollPosition({
        path: pathname || '',
        position: event.currentTarget.scrollTop,
      }),
    );
  });

  return (
    <main
      ref={wrapperRef}
      id={PAGE_ID}
      data-testid={otherProps['data-testid'] || 'Page'}
      className={classNames(
        // отображаем класс от фичи
        toggleFeatures({
          name: 'isAppRedesigned',
          off: () => cls.page,
          on: () => cls.pageRedesigned,
        }),
        {},
        [className],
      )}
      onScroll={onScrollHandler}
    >
      {children}
      {!!onScrollEnd && <div ref={triggerRef} className={cls.trigger} />}
    </main>
  );
};
