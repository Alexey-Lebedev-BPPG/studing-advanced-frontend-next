'use client';

import { FC } from 'react';
import cls from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Text } from '@/shared/ui/redesigned/Text';

interface IArticleImageBlockComponentProps {
  block: ArticleImageBlock;
  className?: string;
}

export const ArticleImageBlockComponent: FC<
  IArticleImageBlockComponentProps
> = props => {
  const { block, className } = props;

  return (
    <div
      className={classNames(cls.articleImageBlockComponent, {}, [className])}
    >
      <AppImage src={block.src} className={cls.img} alt={block.title} />
      {!!block.title && (
        <ToggleFeatures
          nameFeatures={'isAppRedesigned'}
          on={<Text title={block.title} align='center' />}
          off={<TextDeprecated title={block.title} align='center' />}
        />
      )}
    </div>
  );
};
