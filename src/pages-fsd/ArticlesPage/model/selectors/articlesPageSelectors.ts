import { StateSchema } from '@/app-fsd/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const getArticlesPageIsLoading = (state: StateSchema) =>
  state.articlesPage?.isLoading;

export const getArticlesPageError = (state: StateSchema) =>
  state.articlesPage?.error;

export const getArticlesPageView = (state: StateSchema) =>
  state.articlesPage?.view || 'SMALL';

export const getArticlesPageNum = (state: StateSchema) =>
  state.articlesPage?.page || 1;

export const getArticlesPageLimit = (state: StateSchema) =>
  state.articlesPage?.limit || 9;

export const getArticlesPageHasMore = (state: StateSchema) =>
  state.articlesPage?.hasMore;

export const getArticlesPageInited = (state: StateSchema) =>
  state.articlesPage?._inited;

export const getArticlesPageOrder = (state: StateSchema) =>
  state.articlesPage?.order ?? 'asc';

export const getArticlesPageSort = (state: StateSchema) =>
  state.articlesPage?.sort ?? 'createdAt';

export const getArticlesPageSearch = (state: StateSchema) =>
  state.articlesPage?.search ?? '';

export const getArticlesPageType = (state: StateSchema) =>
  state.articlesPage?.type ?? 'ALL';

// получим данные, при этом передав аргумент
export const [useArticleItemById] = buildSelector(
  (state: StateSchema, id: string) => state.articlesPage?.entities[id],
);
