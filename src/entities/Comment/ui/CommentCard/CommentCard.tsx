'use client';

import { FC } from 'react';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';
import { getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface ICommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard: FC<ICommentCardProps> = props => {
  const { className, comment, isLoading } = props;

  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => SkeletonDeprecated,
    on: () => SkeletonRedesigned,
  });

  if (isLoading)
    return (
      <VStack
        max
        gap='8'
        className={classNames(cls.commentCard, {}, [className, cls.loading])}
        data-testid='CommentCard.Loading'
      >
        <div className={cls.header}>
          <Skeleton width={30} height={30} border='50%' />
          <Skeleton width={100} height={16} className={cls.username} />
        </div>
        <Skeleton className={cls.text} width='100%' height={50} />
      </VStack>
    );

  if (!comment) return null;

  return (
    <ToggleFeatures
      nameFeatures={'isAppRedesigned'}
      off={
        <VStack
          max
          gap='8'
          className={classNames(cls.commentCard, {}, [className])}
          data-testid='CommentCard.Content'
        >
          <AppLinkDeprecated
            href={getRouteProfile(comment?.user.id)}
            className={cls.header}
          >
            {!!comment?.user.avatar && (
              <AvatarDeprecated size={30} src={comment.user.avatar} />
            )}
            <TextDeprecated
              className={cls.username}
              title={comment?.user.username}
            />
          </AppLinkDeprecated>
          <TextDeprecated className={cls.text} text={comment?.text} />
        </VStack>
      }
      on={
        <Card fullWidth padding='24' border='partial'>
          <VStack
            max
            gap='8'
            className={classNames(cls.commentCardRedesigned, {}, [className])}
            data-testid='CommentCard.Content'
          >
            <AppLink href={getRouteProfile(comment?.user.id)}>
              <HStack gap='8'>
                {!!comment?.user.avatar && (
                  <Avatar size={30} src={comment.user.avatar} />
                )}
                <Text bold text={comment?.user.username} />
              </HStack>
            </AppLink>
            <Text text={comment?.text} />
          </VStack>
        </Card>
      }
    />
  );
};
