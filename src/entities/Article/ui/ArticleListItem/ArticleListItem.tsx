import { FC, HTMLAttributeAnchorTarget, memo } from 'react';
import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';
import { Article, ArticleView } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';

export interface IArticleListItemProps {
  article: Article;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
  view: ArticleView;
}

export const ArticleListItem: FC<IArticleListItemProps> = memo(props => (
  <ToggleFeatures
    nameFeatures={'isAppRedesigned'}
    off={<ArticleListItemDeprecated {...props} />}
    on={<ArticleListItemRedesigned {...props} />}
  />
));
