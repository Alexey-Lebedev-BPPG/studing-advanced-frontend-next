import { EntityState } from '@reduxjs/toolkit';
import { Article } from '@/entities/Article';

// наследуемся от внутреннего типа redux, которое добавляет ids: string[] и entities с нашими типами комментов
export interface ArticleDetailsRecommendationsSchema
  extends EntityState<Article, string> {
  error?: string;
  isLoading?: boolean;
}
