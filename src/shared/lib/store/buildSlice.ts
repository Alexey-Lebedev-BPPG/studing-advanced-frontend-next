import {
  CaseReducerActions,
  CreateSliceOptions,
  SliceCaseReducers,
  bindActionCreators,
  createSlice,
} from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useAppDispatch } from '../hooks/redux';

// создаем функцию, которая позволяет использовать buildSlice вместо createSlice в слайсах компонентов, а также использовать useActions вместо dispatch(actions) в самих компонентах, при этом типы берем из библиотеки (пример в файле counterSlice)
export function buildSlice<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string,
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
  const slice = createSlice(options);

  const useActions = (): typeof slice.actions => {
    const dispatch = useAppDispatch();

    return useMemo(
      () =>
        bindActionCreators<
          CaseReducerActions<CaseReducers, Name>,
          // @ts-ignore
          CaseReducerActions<CaseReducers>
        >(slice.actions, dispatch),
      [dispatch],
    );
  };

  return { ...slice, useActions };
}
