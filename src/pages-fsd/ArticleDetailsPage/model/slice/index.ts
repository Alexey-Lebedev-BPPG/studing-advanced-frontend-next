import { combineReducers } from '@reduxjs/toolkit';
import { articleDetailsCommentReducer } from './articleDetailsCommentSlice';
import { articleDetailsRecommendationsReducer } from './articleDetailsRecommendationsSlice';
import { ArticleDetailsPageSchema } from '../types';

// обобщающий редьюсер для нескольких редьюсеров. Лучше не использовать. Делается в учебных целях
export const articleDetailsPageReducer =
  combineReducers<ArticleDetailsPageSchema>({
    // @ts-ignore
    comments: articleDetailsCommentReducer,
    // @ts-ignore
    recommendations: articleDetailsRecommendationsReducer,
  });
