'use client';

import { useSession } from 'next-auth/react';
import { FC } from 'react';
import cls from './SidebarItem.module.scss';
import { SidebarItemType } from '../../../model/types/sidebar';
import { User } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ISidebarItemProps {
  collapsed: boolean;
  item: SidebarItemType;
}

export const SidebarItem: FC<ISidebarItemProps> = props => {
  const { collapsed, item } = props;

  const { data: dataSession } = useSession();
  const authData = (dataSession?.user || undefined) as User;

  if (item.authOnly && !authData) return null;

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
