import { FC, memo } from 'react';
import cls from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

interface IArticleTextBlockComponentProps {
  block: ArticleTextBlock;
  className?: string;
}

export const ArticleTextBlockComponent: FC<IArticleTextBlockComponentProps> =
  memo(props => {
    const { block, className } = props;

    return (
      <div
        className={classNames(cls['article-text-block-component'], {}, [
          className,
        ])}
      >
        {!!block.title && (
          <ToggleFeatures
            nameFeatures={'isAppRedesigned'}
            off={<TextDeprecated title={block.title} className={cls.title} />}
            on={<Text title={block.title} className={cls.title} />}
          />
        )}
        {block.paragraphs.map((paragraph, index) => (
          <ToggleFeatures
            key={index + paragraph.slice(0, 5)}
            nameFeatures={'isAppRedesigned'}
            off={<TextDeprecated text={paragraph} className={cls.paragraph} />}
            on={<Text text={paragraph} className={cls.paragraph} />}
          />
        ))}
      </div>
    );
  });
