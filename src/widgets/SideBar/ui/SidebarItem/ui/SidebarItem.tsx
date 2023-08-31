'use client';

import { FC } from 'react';
import cls from './SidebarItem.module.scss';
import { SidebarItemType } from '../../../model/types/sidebar';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppSelector } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ISidebarItemProps {
  collapsed: boolean;
  item: SidebarItemType;
}

export const SidebarItem: FC<ISidebarItemProps> = props => {
  const { collapsed, item } = props;

  const isAuth = useAppSelector(getUserAuthData);

  if (item.authOnly && !isAuth) return null;

  return (
    <ToggleFeatures
      nameFeatures={'isAppRedesigned'}
      off={
        <AppLinkDeprecated
          href={item.path}
          theme='secondary'
          className={classNames(cls.item, { [cls.collapsed]: collapsed })}
        >
          <Icon src={item.Icon} alt='' className={cls.icon} />
          <span className={cls.link}>{item.text}</span>
        </AppLinkDeprecated>
      }
      on={
        <AppLink
          href={item.path}
          activeClassName={cls.active}
          className={classNames(cls.itemRedesigned, {
            [cls.collapsedRedesigned]: collapsed,
          })}
        >
          <Icon src={item.Icon} alt='' />
          <span className={cls.link}>{item.text}</span>
        </AppLink>
      }
    />
  );
};
