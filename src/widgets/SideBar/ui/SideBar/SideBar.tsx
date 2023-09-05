'use client';

import { useSession } from 'next-auth/react';
import { FC, useMemo, useState } from 'react';
import cls from './SideBar.module.scss';
import { useSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem';
import { LanguageSwitcher } from '@/features/LanguageSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/deprecated/Button';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface ISideBarProps {
  className?: string;
}

export const SideBar: FC<ISideBarProps> = props => {
  const { className } = props;
  const session = useSession();
  console.log('session', session);

  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSidebarItems();

  const onToggle = () => {
    setCollapsed(prev => !prev);
  };

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map(item => (
        <SidebarItem key={item.path} item={item} collapsed={collapsed} />
      )),
    [collapsed, sidebarItemsList],
  );

  return (
    <ToggleFeatures
      nameFeatures='isAppRedesigned'
      on={
        <aside
          data-testid='sidebar'
          className={classNames(
            cls.sideBarRedesigned,
            { [cls.collapsedRedesigned]: collapsed },
            [className],
          )}
        >
          <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo} />
          <VStack role='navigation' gap='8' className={cls.items}>
            {/* рендерим наши ссылки сайдбара */}
            {itemsList}
          </VStack>
          <Icon
            clickable
            data-testid='sidebar-toggle'
            className={cls.collapsedBtn}
            src={ArrowIcon}
            onClick={onToggle}
          />
          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LanguageSwitcher short={collapsed} className={cls.lang} />
          </div>
        </aside>
      }
      off={
        <aside
          data-testid='sidebar'
          className={classNames(cls.sideBar, { [cls.collapsed]: collapsed }, [
            className,
          ])}
        >
          <Button
            square
            type='button'
            data-testid='sidebar-toggle'
            className={cls.collapsedBtn}
            theme='backgroundInverted'
            size='l'
            onClick={onToggle}
          >
            {collapsed ? '>' : '<'}
          </Button>
          <VStack role='navigation' gap='8' className={cls.items}>
            {/* рендерим наши ссылки сайдбара */}
            {itemsList}
          </VStack>
          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LanguageSwitcher short={collapsed} className={cls.lang} />
          </div>
        </aside>
      }
    />
  );
};
