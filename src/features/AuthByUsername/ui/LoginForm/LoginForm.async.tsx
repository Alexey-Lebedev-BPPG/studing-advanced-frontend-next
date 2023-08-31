'use client';

import { FC, lazy } from 'react';
import { ILoginFormProps } from './LoginForm';

export const LoginFormAsync = lazy<FC<ILoginFormProps>>(
  () => import('./LoginForm'),
);
