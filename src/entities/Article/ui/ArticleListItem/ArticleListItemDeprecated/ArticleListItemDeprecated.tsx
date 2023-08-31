'use client';

import { FC } from 'react';
import { ArticleTextBlock } from '../../../model/types/article';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { IArticleListItemProps } from '../ArticleListItem';
import cls from '../ArticleListItem.module.scss';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button } from '@/shared/ui/deprecated/Button';
import { Card } from '@/shared/ui/deprecated/Card';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text } from '@/shared/ui/deprecated/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
// import { useHover } from "shared/lib/hooks/useHover/useHover";

export const ArticleListItemDeprecated: FC<IArticleListItemProps> = props => {
  const { article, className, target, view } = props;
  // const [isHover, bindHover] = useHover();

  const types = <Text text={article.type.join(', ')} className={cls.type} />;
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon src={EyeIcon} alt='' />
    </>
  );

  if (view === 'BIG') {
    const textBlock = article.blocks.find(
      block => block.type === 'TEXT',
    ) as ArticleTextBlock;

    return (
      <div
        className={classNames('', {}, [className, cls[view]])}
        data-testid='ArticleListItem'
      >
        <Card>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text text={article.title} className={cls.title} />
          {types}
          <AppImage
            fallback={<Skeleton width='100%' height={250} />}
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
          {!!textBlock && (
            <ArticleTextBlockComponent
              block={textBlock}
              className={cls.textBlock}
            />
          )}
          <div className={cls.footer}>
            <AppLink
              // target={target}
              href={getRouteArticleDetails(article.id)}
            >
              <Button>{'Читать далее...'}</Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      // target={target}
      href={getRouteArticleDetails(article.id)}
      className={classNames('', {}, [className, cls[view]])}
      data-testid='ArticleListItem'
      // {...bindHover}
    >
      <Card>
        <div className={cls.imageWrapper}>
          <AppImage
            fallback={<Skeleton width={200} height={200} />}
            src={article.img}
            className={cls.img}
            alt={article.title}
          />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </AppLink>
  );
};
