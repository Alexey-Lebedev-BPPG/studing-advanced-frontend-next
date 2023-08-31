import { Article } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';

// вызываем кастомный rtk запрос, в котором динамически можем указывать данные
const recommendationsList = rtkApi.injectEndpoints({
  endpoints: build => ({
    // указываем название эндпоинта + указываем в дженерике первым аргументом, что запрос будет возвращать, и во стором, что  за аргументы
    getArticleRecommendationsList: build.query<Article[], number>({
      // колбэк принимает какие-то аргументы для передачи на сервер
      query: limit => ({
        // указываем параметры
        params: {
          // фишка Json-server, по сути обычное объединение данных, как в бд
          _expand: 'user',
          _limit: limit,
        },

        // здесь есть все поля как в стандартных запросах
        // указываем урл
        url: '/articles',
      }),
    }),
    // пример запроса на создание (через mutation)
    // createArticleRecommendationsList: build.mutation({
    //   // колбэк принимает какие-то аргументы для передачи на сервер
    //   query: (limit) => ({
    //     // здесь есть все поля как в стандартных запросах
    //     // указываем урл
    //     url: "/articles",
    //     // указываем параметры
    //     params: {
    //       _limit: limit,
    //     },
    //     method: "POST",
    //   }),
    // }),
  }),
});

// создаем хук, в который помещаем данные из запроса
export const useArticleRecommendationsList =
  recommendationsList.useGetArticleRecommendationsListQuery;

// пример запроса на создание (через mutation)
// export const useCreateArticleRecommendationsList =
//   recommendationsList.useCreateArticleRecommendationsListMutation;
