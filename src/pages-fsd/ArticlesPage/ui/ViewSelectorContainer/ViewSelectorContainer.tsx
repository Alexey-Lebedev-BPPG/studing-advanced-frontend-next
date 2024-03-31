import { FC, memo } from 'react';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';

export interface IViewSelectorContainerProps {
  className?: string;
}

export const ViewSelectorContainer: FC<IViewSelectorContainerProps> = memo(
  props => {
    const { className } = props;
    const { onChangeView, view } = useArticleFilters();

    return (
      <ArticleViewSelector
        className={className}
        view={view}
        onViewClick={onChangeView}
      />
    );
  },
);
