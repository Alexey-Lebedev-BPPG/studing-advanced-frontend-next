import { useTranslations } from 'next-intl';
import { FC, memo } from 'react';
import { User } from '@/entities/User';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export interface IArticleAdditionalInfoProps {
  author: User;
  className?: string;
  createdAt: string;
  onEdit: () => void;
  views: number;
}

export const ArticleAdditionalInfo: FC<IArticleAdditionalInfoProps> = memo(
  props => {
    const { author, className, createdAt, onEdit, views } = props;
    const t = useTranslations();

    return (
      <VStack gap='32' className={className}>
        <HStack gap='8'>
          <Avatar src={author?.avatar || ''} size={32} />
          <Text bold text={author?.username} />
          <Text text={createdAt} />
        </HStack>
        <Button onClick={onEdit}>{t('Редактировать')}</Button>
        {/* используем плюральные формы для подстановки окончаний слова */}
        <Text text={t('{count} просмотров', { count: views })} />
      </VStack>
    );
  },
);
