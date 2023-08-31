'use client';

import { FC, lazy } from 'react';
import { IArticleEditPageProps } from './ArticleEditPage';

export const ArticleEditPageAsync = lazy<FC<IArticleEditPageProps>>(
  () => import('./ArticleEditPage'),
);
