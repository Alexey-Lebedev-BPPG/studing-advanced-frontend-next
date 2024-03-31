import { FC, memo } from 'react';
import cls from './articleListItemRedesigned.module.scss';
import { ArticleTextBlock } from '../../../model/types/article';
import { IArticleListItemProps } from '../ArticleListItem';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export const ArticleListItemRedesigned: FC<IArticleListItemProps> = memo(
  props => {
    const { article, className, target, view } = props;
    // const [isHover, bindHover] = useHover();

    const types = (
      <Text
        text={article.type.join(', ')}
        //  className={cls.type}
      />
    );

    const userInfo = (
      <>
        <Avatar size={32} src={article.user.avatar} className={cls.avatar} />
        <Text bold text={article.user.username} />
      </>
    );

    const views = (
      <HStack gap='8'>
        <Icon Svg={EyeIcon} />
        <Text
          text={String(article.views)}
          className={cls[view === 'SMALL' ? 'small' : 'big']}
        />
      </HStack>
    );

    if (view === 'BIG') {
      const textBlock = article.blocks.find(
        block => block.type === 'TEXT',
      ) as ArticleTextBlock;

      return (
        <Card
          fullWidth
          padding='24'
          data-testid='ArticleListItem'
          className={classNames('', {}, [
            className,
            cls[view === 'BIG' ? 'big' : 'small'],
          ])}
        >
          <VStack max gap='16'>
            <HStack max gap='8'>
              {userInfo}
              <Text text={article.createdAt} />
            </HStack>
            <Text bold text={article.title} />
            <Text text={article.subtitle} size='s' />
            {types}
            <AppImage
              fallback={<Skeleton width='100%' height={250} />}
              src={article.img}
              className={cls.img}
              alt={article.title}
            />
            {!!textBlock?.paragraphs && (
              <Text
                text={textBlock.paragraphs.slice(0, 2).join(' ')}
                className={cls['text-block']}
              />
            )}
            <HStack max justify='between'>
              <AppLink
                target={target}
                href={getRouteArticleDetails(article.id)}
              >
                <Button variant='outline'>{'Читать далее...'}</Button>
              </AppLink>
              {views}
            </HStack>
          </VStack>
        </Card>
      );
    }

    return (
      <AppLink
        target={target}
        href={getRouteArticleDetails(article.id)}
        data-testid='ArticleListItem'
        className={classNames(
          // cls.articleListItem,
          '',
          {},
          [className, cls[view === 'SMALL' ? 'small' : 'big']],
        )}
        // {...bindHover}
      >
        <Card className={cls.card} border='partial' padding='0'>
          <AppImage
            fallback={<Skeleton width='100%' height={200} />}
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
          <VStack className={cls.info} gap='4'>
            <Text
              text={article.title}
              // className={cls.title}
            />
            <VStack max gap='4' className={cls.footer}>
              <HStack max justify='between'>
                <Text
                  text={article.createdAt}
                  // className={cls.date}
                />
                {types}
                {views}
              </HStack>
              <HStack gap='4'>{userInfo}</HStack>
            </VStack>
          </VStack>
        </Card>
      </AppLink>
    );
  },
);
