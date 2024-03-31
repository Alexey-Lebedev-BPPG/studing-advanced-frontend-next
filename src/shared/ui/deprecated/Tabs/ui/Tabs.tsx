import { ReactNode, useCallback } from 'react';
import cls from './Tabs.module.scss';
import { Card } from '../../Card';
import { classNames } from '@/shared/lib/classNames/classNames';
import { typedMemo } from '@/shared/lib/typedMemo/typedMemo';

export interface ITabItem<T> {
  content: ReactNode;
  value: T;
}

export interface ITabsProps<T> {
  className?: string;
  onTabClick: (tab: ITabItem<T>) => void;
  selectedValue: T;
  tabs: ITabItem<T>[];
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Tabs = typedMemo(<T extends string>(props: ITabsProps<T>) => {
  const { className, onTabClick, selectedValue, tabs } = props;
  // используем замыкание, чтоб в JSX не указывать коллбек
  const clickHandle = useCallback(
    (tab: ITabItem<T>) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <div className={classNames(cls.tabs, {}, [className])}>
      {tabs.map(tab => (
        <Card
          key={tab.value}
          className={cls.tab}
          theme={tab.value === selectedValue ? 'normal' : 'outline'}
          onClick={clickHandle(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
});
