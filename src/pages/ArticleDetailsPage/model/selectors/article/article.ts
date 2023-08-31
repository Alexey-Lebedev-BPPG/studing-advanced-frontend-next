import { createSelector } from '@reduxjs/toolkit';
import { getArticleDetailsData } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';

// селектор, который позволяет получить данные из entities и указывающий, может ли юзер изменять статью
export const getCanEditArticle = createSelector(
  getArticleDetailsData,
  getUserAuthData,
  (article, user) => {
    if (!article || !user) return false;

    return article.user.id === user.id;
  },
);
