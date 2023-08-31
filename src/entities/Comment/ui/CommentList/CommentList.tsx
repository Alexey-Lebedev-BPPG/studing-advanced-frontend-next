'use client';

import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface ICommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList: FC<ICommentListProps> = props => {
  const { className, comments, isLoading } = props;
  const { t } = useTranslation();

  if (isLoading)
    return (
      <VStack max gap='16' className={classNames('', {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>
    );

  return (
    <VStack max gap='16' className={classNames('', {}, [className])}>
      {comments?.length ? (
        comments.map(comment => (
          <CommentCard
            key={comment.id}
            isLoading={isLoading}
            comment={comment}
          />
        ))
      ) : (
        <ToggleFeatures
          nameFeatures={'isAppRedesigned'}
          off={<TextDeprecated text={`${t('Комментарии отсутствуют')}`} />}
          on={<Text text={`${t('Комментарии отсутствуют')}`} />}
        />
      )}
    </VStack>
  );
};
