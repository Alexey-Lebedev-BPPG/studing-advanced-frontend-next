'use client';

import { FC } from 'react';
import cls from './ArticleDetails.module.scss';
import { DeprecatedContent } from './DeprecatedContent/DeprecatedContent';
import { RedesignedContent } from './RedesignedContent/RedesignedContent';

import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface IArticleDetailsProps {
  className?: string;
  id?: string;
}

// чтоб напрямую не передавать в пропсы объект такого типа reducers={{ loginForm: loginReducer }}, т.к. это каждый раз будет создавать новый объект, мы делаем редьюсер по ум.
const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails: FC<IArticleDetailsProps> = props => {
  const { className, id } = props;
  const dispatch = useAppDispatch();

  useInitialEffect(() => {
    dispatch(fetchArticleById(id));
  });

  return (
    // обертка для использования асинхронных редьюсеров в асинхронных компонентах
    <DynamicModuleLoader reducers={reducers}>
      <VStack
        max
        gap='16'
        className={classNames(cls.articleDetails, {}, [className])}
      >
        <ToggleFeatures
          nameFeatures={'isAppRedesigned'}
          off={<DeprecatedContent />}
          on={<RedesignedContent />}
        />
      </VStack>
    </DynamicModuleLoader>
  );
};
