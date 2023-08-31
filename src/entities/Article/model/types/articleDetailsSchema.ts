import { Article } from './article';

export interface ArticleDetailsSchema {
  data?: Article;
  error?: string;
  isLoading: boolean;
}
