import cls from './ArticleDetails.module.scss';
import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

export const renderArticleBlock = (block: ArticleBlock) => {
  if (block.type === 'CODE')
    return (
      <ArticleCodeBlockComponent
        key={block.id}
        className={cls.block}
        block={block}
      />
    );
  if (block.type === 'IMAGE')
    return (
      <ArticleImageBlockComponent
        key={block.id}
        className={cls.block}
        block={block}
      />
    );
  if (block.type === 'TEXT')
    return (
      <ArticleTextBlockComponent
        key={block.id}
        className={cls.block}
        block={block}
      />
    );
  return null;
};
