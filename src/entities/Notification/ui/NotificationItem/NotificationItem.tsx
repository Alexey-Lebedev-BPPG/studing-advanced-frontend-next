import { FC, memo } from 'react';
import cls from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

interface INotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem: FC<INotificationItemProps> = memo(props => {
  const { className, item } = props;

  const content = (
    <ToggleFeatures
      nameFeatures={'isAppRedesigned'}
      off={
        <CardDeprecated
          theme='outline'
          className={classNames(cls['notification-item'], {}, [className])}
        >
          <TextDeprecated title={item.title} text={item.description} />
        </CardDeprecated>
      }
      on={
        <Card className={classNames(cls['notification-item'], {}, [className])}>
          <Text title={item.title} text={item.description} />
        </Card>
      }
    />
  );

  if (item.href)
    return (
      <a className={cls.link} target='_blank' href={item.href} rel='noreferrer'>
        {content}
      </a>
    );

  return content;
});
