import { useTranslations } from 'next-intl';
import { FC, memo } from 'react';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../../model/selectors/articleDetails';
import cls from '../ArticleDetails.module.scss';
import { renderArticleBlock } from '../renderBlock';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { useAppSelector } from '@/shared/lib/hooks/redux';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text } from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

export const DeprecatedContent: FC = memo(props => {
  const isLoading = useAppSelector(getArticleDetailsIsLoading);
  const article = useAppSelector(getArticleDetailsData);
  const error = useAppSelector(getArticleDetailsError);
  const t = useTranslations();

  if (isLoading)
    return (
      <VStack max gap='16'>
        <Skeleton
          className={cls.avatar}
          width={200}
          height={200}
          border='50%'
        />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width='100%' height={200} />
        <Skeleton className={cls.skeleton} width='100%' height={200} />
      </VStack>
    );

  if (error)
    return (
      <Text
        title={`${t('Произошла ошибка при загрузке статьи')}`}
        align='center'
      />
    );

  return (
    <>
      <HStack max justify='center' className={cls.avatarWrapper}>
        <Avatar size={200} src={article?.img} className={cls.avatar} />
      </HStack>
      <VStack gap='4' data-testid='ArticleDetails.Info'>
        <Text
          title={article?.title}
          text={article?.subtitle}
          className={cls.title}
          size='l'
        />
        <HStack gap='8' className={cls.articleInfo}>
          <Icon Svg={EyeIcon} className={cls.icon} />
          <Text title={String(article?.views)} />
        </HStack>
        <HStack gap='8' className={cls.articleInfo}>
          <Icon Svg={CalendarIcon} className={cls.icon} />
          <Text title={article?.createdAt} />
        </HStack>
      </VStack>
      {article?.blocks.map(renderArticleBlock)}
    </>
  );
});
