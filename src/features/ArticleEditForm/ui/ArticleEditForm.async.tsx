'use client';

import { FC, lazy } from 'react';
import { IArticleEditFormProps } from './ArticleEditForm';

export const ArticleEditFormAsync = lazy<FC<IArticleEditFormProps>>(
  () => import('./ArticleEditForm'),
);
