import { FC, memo } from 'react';
import cls from './NotificationList.module.scss';
import { useNotification } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface INotificationListProps {
  className?: string;
}

export const NotificationList: FC<INotificationListProps> = memo(props => {
  const { className } = props;

  const { data, isLoading } = useNotification(null, {
    // запрос будет отправляться каждую секунду
    pollingInterval: 10000,
  });

  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => SkeletonDeprecated,
    on: () => SkeletonRedesigned,
  });

  if (isLoading)
    return (
      <VStack
        max
        gap='16'
        className={classNames(cls['notification-list'], {}, [className])}
      >
        <Skeleton width='100%' border='8px' height='80px' />
        <Skeleton width='100%' border='8px' height='80px' />
        <Skeleton width='100%' border='8px' height='80px' />
      </VStack>
    );

  return (
    <VStack
      max
      gap='16'
      className={classNames(cls['notification-list'], {}, [className])}
    >
      {data?.map(item => <NotificationItem key={item.id} item={item} />)}
    </VStack>
  );
});
