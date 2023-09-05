'use client';

import { signOut, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { FC, useCallback } from 'react';
import { User, isUserAdmin, isUserManager } from '@/entities/User';
import {
  getRouteAdminPanel,
  getRouteProfile,
  getRouteSettings,
} from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppSelector } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Dropdown } from '@/shared/ui/redesigned/Popups';

export interface IAvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown: FC<IAvatarDropdownProps> = props => {
  const { className } = props;

  const { t } = useTranslation();
  const { data: dataSession } = useSession();
  const authData = (dataSession?.user || undefined) as User;
  const isAdmin = useAppSelector(isUserAdmin);
  const isManager = useAppSelector(isUserManager);

  const isAdminPanelAvailable = isAdmin || isManager;

  const onLogout = useCallback(() => signOut({ callbackUrl: '/' }), []);

  if (!authData) return null;

  const items = [
    // добавление объектов в массив по условию
    ...(isAdminPanelAvailable
      ? [{ content: t('Админка'), href: getRouteAdminPanel() }]
      : []),
    { content: t('Настройки'), href: getRouteSettings() },
    { content: t('Профиль'), href: getRouteProfile(authData.id) },
    { content: t('Выйти'), onClick: onLogout },
  ];

  return (
    <ToggleFeatures
      nameFeatures={'isAppRedesigned'}
      off={
        <DropdownDeprecated
          direction='bottom left'
          className={classNames('', {}, [className])}
          items={items}
          trigger={
            <AvatarDeprecated
              fallbackInverted
              size={30}
              src={authData.avatar || ''}
            />
          }
        />
      }
      on={
        <Dropdown
          direction='bottom left'
          className={classNames('', {}, [className])}
          items={items}
          trigger={<Avatar size={40} src={authData.avatar || ''} />}
        />
      }
    />
  );
};
