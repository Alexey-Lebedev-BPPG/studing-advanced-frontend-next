import { FC, memo, useCallback, useState } from 'react';
import cls from './NotificationButton.module.scss';
import { NotificationList } from '@/entities/Notification';
import NotificationIconDeprecated from '@/shared/assets/icons/notification-20-20.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useDetectDevice } from '@/shared/lib/hooks/useDetectDevice/useDetectDevice';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

export interface INotificationButtonProps {
  className?: string;
}

export const NotificationButton: FC<INotificationButtonProps> = memo(props => {
  const { className } = props;

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const isMobile = useDetectDevice();

  const onOpenDrawer = useCallback(() => setIsOpenDrawer(true), []);
  const onCloseDrawer = useCallback(() => setIsOpenDrawer(false), []);

  const trigger = (
    <ToggleFeatures
      nameFeatures={'isAppRedesigned'}
      on={<Icon clickable Svg={NotificationIcon} onClick={onOpenDrawer} />}
      off={
        <ButtonDeprecated theme='clear' onClick={onOpenDrawer}>
          <IconDeprecated inverted Svg={NotificationIconDeprecated} />
        </ButtonDeprecated>
      }
    />
  );
  return (
    <div>
      {isMobile ? (
        <>
          {trigger}
          {/* оборачиваем компонент для ленивой подгрузки библиотек, которые в нем используются */}
          <Drawer isOpen={isOpenDrawer} onClose={onCloseDrawer}>
            <NotificationList />
          </Drawer>
        </>
      ) : (
        <ToggleFeatures
          nameFeatures={'isAppRedesigned'}
          off={
            <PopoverDeprecated
              className={classNames(cls.notificationButton, {}, [className])}
              trigger={trigger}
            >
              <NotificationList className={cls.notifications} />
            </PopoverDeprecated>
          }
          on={
            <Popover
              className={classNames(cls.notificationButton, {}, [className])}
              trigger={trigger}
            >
              <NotificationList className={cls.notifications} />
            </Popover>
          }
        />
      )}
    </div>
  );
});
