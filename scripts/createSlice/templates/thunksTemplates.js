const getCamelCase = require('../helpers/stringToCamelCase');
const getPascalCase = require('../helpers/stringToPascalCase');

// шаблон создания файла thun-ка в папке services
module.exports = componentName => {
  const nameToCamelCase = `${getCamelCase(componentName)}`;
  const nameToPascalCase = `${getPascalCase(componentName)}`;

  return `import { createAsyncThunk } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { ThunkConfig } from '@/app-fsd/providers/StoreProvider';

interface I${nameToPascalCase}Props {}

// первым аргументом дженерика - что возвращаем, второй - что передаем, а третьим можно передать свои типизацию объекта
// thunkAPI, в котором есть методы для использования в thunk-e
export const fetch${nameToPascalCase} = createAsyncThunk<
  unknown,
  I${nameToPascalCase}Props,
  ThunkConfig<string>
>('***/${nameToCamelCase}', async (_, thunkApi) => {
  const { dispatch, extra, getState, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.post<unknown>('/***', {});
    // делаем доп. проверку получения данных
    if (!response.data) throw new Error();

    return response.data;
  } catch (error) {
    console.log(error);
    // для обработки ошибок
    return rejectWithValue(i18next.t('ERROR'));
  }
});
`;
};
