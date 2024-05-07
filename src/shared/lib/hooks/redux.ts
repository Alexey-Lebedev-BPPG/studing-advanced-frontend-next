'use client';

/* eslint-disable @typescript-eslint/no-restricted-imports */
import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line path-checher-ulbi-example/layer-imports
import {
  StateSchema,
  ThunkExtraArg,
} from '@/app-fsd/providers/StoreProvider/config/stateSchema';

// создаем тип для диспатча, чтоб подхватывались используемые типы
export type AppDispatch = ThunkDispatch<
  StateSchema,
  ThunkExtraArg,
  UnknownAction
>;

// или
// export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
