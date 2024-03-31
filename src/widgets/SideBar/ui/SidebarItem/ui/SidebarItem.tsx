import { FC, memo } from 'react';
import cls from './SidebarItem.module.scss';
import { SidebarItemType } from '../../../model/types/sidebar';
import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppSelector } from '@/shared/lib/hooks/redux';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ISidebarItemProps {
  collapsed: boolean;
  item: SidebarItemType;
}

export const SidebarItem: FC<ISidebarItemProps> = memo(props => {
  const { collapsed, item } = props;

  const isAuth = useAppSelector(getUserAuthData);

  if (item.authOnly && !isAuth) return null;

  return (
    <ToggleFeatures
      nameFeatures={'isAppRedesigned'}
      off={
        <AppLink
          href={item.path}
          className={classNames(cls.item, { [cls.collapsed]: collapsed })}
        >
          <item.Icon className={cls.icon} />
          <span className={cls.link}>{item.text}</span>
        </AppLink>
      }
      on={
        <AppLink
          href={item.path}
          activeClassName={cls.active}
          className={classNames(cls['item-redesigned'], {
            [cls['collapsed-redesigned']]: collapsed,
          })}
        >
          <Icon Svg={item.Icon} />
          <span className={cls.link}>{item.text}</span>
        </AppLink>
      }
    />
  );
});
