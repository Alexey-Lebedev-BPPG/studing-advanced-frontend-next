const getCamelCase = require('../helpers/stringToCamelCase');
const getPascalCase = require('../helpers/stringToPascalCase');

// шаблон создания файла api
module.exports = componentName => {
  const nameToCamelCase = `${getCamelCase(componentName)}`;
  const nameToPascalCase = `${getPascalCase(componentName)}`;

  return `import { rtkApi } from '@/shared/api/rtkApi';

interface Get${nameToPascalCase}Arg {
  className?: string;
}

interface Create${nameToPascalCase}Arg {}

// вызываем кастомный rtk запрос, в котором динамически можем указывать данные
const ${nameToCamelCase}Api = rtkApi.injectEndpoints({
  endpoints: build => ({
    // указываем название эндпоинта + указываем в дженерике первым аргументом, что запрос будет возвращать,
    // и во стором, что  за аргументы
    get${nameToPascalCase}: build.query<void, Get${nameToPascalCase}Arg>({
      // колбэк принимает какие-то аргументы для передачи на сервер
      query: params => ({
        // указываем параметры
        params: { ...params },
        // здесь есть все поля как в стандартных запросах
        // указываем урл
        url: '/***',
      }),
    }),
    // пример запроса на создание (через mutation)
    // create${nameToPascalCase}: build.mutation<void, Create${nameToPascalCase}Arg>({
    //   query: (params) => ({
    //     url: '/***',
    //     body: { ...params },
    //     method: 'POST',
    //   }),
    // }),
  }),
});

// создаем хук, в который помещаем данные из запроса
export const use${nameToPascalCase} = ${nameToCamelCase}Api.useGet${nameToPascalCase}Query;

// пример запроса на создание (через mutation)
// export const useCreate${nameToPascalCase} = ${nameToCamelCase}Api.useCreate${nameToPascalCase}Mutation;
`;
};
