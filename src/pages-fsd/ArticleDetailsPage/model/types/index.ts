import { ArticleDetailsCommentSchema } from './articleDetailsCommentSchema';
import { ArticleDetailsRecommendationsSchema } from './articleDetailsRecommendationsSchema';

// обобщающий тип для нескольких редьюсеров. Лучше не использовать. Делается в учебных целях
export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentSchema;
  recommendations: ArticleDetailsRecommendationsSchema;
}
