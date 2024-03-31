import { FC, memo } from 'react';
import cls from './ArticleCodeBlockComponent.module.scss';
import { ArticleCodeBlock } from '../../model/types/article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Code } from '@/shared/ui/redesigned/Code';

interface IArticleCodeBlockComponentProps {
  block: ArticleCodeBlock;
  className?: string;
}

export const ArticleCodeBlockComponent: FC<IArticleCodeBlockComponentProps> =
  memo(({ block, className }) => (
    <div
      className={classNames(cls['article-code-block-component'], {}, [
        className,
      ])}
    >
      <Code text={block.code} />
    </div>
  ));
