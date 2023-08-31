const getCamelCase = require('../helpers/stringToCamelCase');
const getPascalCase = require('../helpers/stringToPascalCase');

// шаблон создания файла слайса редакса
module.exports = componentName => {
  const nameToCamelCase = `${getCamelCase(componentName)}`;
  const nameToPascalCase = `${getPascalCase(componentName)}`;

  return `import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetch${nameToPascalCase} } from '../services/fetch${nameToPascalCase}';
import { ${nameToPascalCase}Schema } from '../types/${nameToCamelCase}';

const initialState: ${nameToPascalCase}Schema = {
  isLoading: false,
};

export const ${nameToCamelCase}Slice = createSlice({
  // используется для асинхронного изменения стейта
  extraReducers: builder => {
    // у каждого thunk-a есть 3 состояния: 1. pending, 2. fulfilled, 3. rejected
    // все 3 состояния можно здесь обработать
    builder
      // используем наш thunk
      .addCase(fetch${nameToPascalCase}.pending, state => {
        // это состояние, когда наш thunk начинается
        // обнуляем ошибку, если она была и делаем isLoading true
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetch${nameToPascalCase}.fulfilled,
        (state, action: PayloadAction<unknown>) => {
          // здесь обрабатываем ответ сервера
          state.isLoading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetch${nameToPascalCase}.rejected, (state, action) => {
        // action - поле, которое мы возвращаем из thunk-a при ошибке(3 аргумент в дженерике)
        state.isLoading = false;
        state.error = action.payload;
      });
  },
  initialState,
  name: '${nameToCamelCase}',
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
});

export const { actions: ${nameToCamelCase}Actions } = ${nameToCamelCase}Slice;
export const { reducer: ${nameToCamelCase}Reducer } = ${nameToCamelCase}Slice;
`;
};
