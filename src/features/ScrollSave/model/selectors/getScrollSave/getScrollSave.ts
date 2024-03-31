import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app-fsd/providers/StoreProvider';

export const getScrollSaveScroll = (state: StateSchema) =>
  state?.scrollSave?.scroll;

// используем реселект для мемоизации
export const getScrollSavePath = createSelector(
  // получаем весь объект
  getScrollSaveScroll,
  // передаем путь
  (state: StateSchema, path: string) => path,
  // получаем значение скролла
  (scroll, path) => scroll[path] || 0,
);
