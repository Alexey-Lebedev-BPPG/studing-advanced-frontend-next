'use client';

import { FC, lazy } from 'react';
import { IAddCommentFormProps } from './AddCommentForm';

export const AddCommentFormAsync = lazy<FC<IAddCommentFormProps>>(
  () => import('./AddCommentForm'),
);
