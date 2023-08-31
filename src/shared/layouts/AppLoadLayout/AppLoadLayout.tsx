'use client';

import { FC } from 'react';
import cls from './appLoadLayout.module.scss';
import { MainLayout } from '../MainLayout';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

export const AppLoadLayout: FC = () => (
  <MainLayout
    sidebar={<Skeleton width={220} height='100%' border='32px' />}
    header={
      <HStack className={cls.header}>
        <Skeleton width={40} height={40} border='50%' />
      </HStack>
    }
    content={
      <VStack gap='16' style={{ height: '100%' }}>
        <Skeleton width='70%' height={32} border='16px' />
        <Skeleton width='40%' height={20} border='16px' />
        <Skeleton width='50%' height={20} border='16px' />
        <Skeleton width='30%' height={32} border='16px' />
        <Skeleton width='80%' height='40%' border='16px' />
        <Skeleton width='80%' height='40%' border='16px' />
      </VStack>
    }
  />
);
