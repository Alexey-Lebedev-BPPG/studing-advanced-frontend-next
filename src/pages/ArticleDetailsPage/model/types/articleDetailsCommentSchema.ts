import { EntityState } from '@reduxjs/toolkit';
import { Comment } from '@/entities/Comment';

// наследуемся от внутреннего типа redux, которое добавлет ids: string[] и entitis с нашими типами комментов
export interface ArticleDetailsCommentSchema extends EntityState<Comment> {
  error?: string;
  isLoading?: boolean;
}
