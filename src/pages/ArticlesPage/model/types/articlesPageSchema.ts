import { EntityState } from '@reduxjs/toolkit';
import {
  Article,
  ArticleView,
  ArticleSortFields,
  ArticleType,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';

// наследуемся от внутреннего типа redux, которое добавлет ids: string[] и entitis с нашими типами комментов
export interface ArticlesPageSchema extends EntityState<Article> {
  // указывает, инициализировался у нас стейт или нет (чтоб заново его не инициализировать, когда стейт не удаляем из редакса)
  _inited: boolean;
  error?: string;
  // показывает, загрузили мы все статьи или есть еще
  hasMore: boolean;
  isLoading?: boolean;
  limit: number;
  order: SortOrder;
  // данные пагинации
  page: number;
  search: string;
  sort: ArticleSortFields;
  type: ArticleType;
  // фильтры
  view: ArticleView;
}
