import { EntityState } from '@reduxjs/toolkit';
import { Article } from '@/entities/Article';

// наследуемся от внутреннего типа redux, которое добавлет ids: string[] и entitis с нашими типами комментов
export interface ArticleDetailsRecommendationsSchema
  extends EntityState<Article> {
  error?: string;
  isLoading?: boolean;
}
