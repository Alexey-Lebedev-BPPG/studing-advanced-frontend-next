import { Rating } from '@/entities/Rating';
import { rtkApi } from '@/shared/api/rtkApi';

interface GetArticleRatingArg {
  articleId: string;
  userId: string;
}

interface CreateArticleRatingArg extends GetArticleRatingArg {
  feedback?: string;
  rate: number;
}

// вызываем кастомный rtk запрос, в котором динамически можем указывать данные
const articleRatingApi = rtkApi.injectEndpoints({
  endpoints: build => ({
    createArticleRating: build.mutation<void, CreateArticleRatingArg>({
      query: params => ({
        body: params,
        method: 'POST',
        url: '/article-ratings',
      }),
    }),
    // указываем название эндпоинта + указываем в дженерике первым аргументом, что запрос будет возвращать,
    // и во стором, что  за аргументы
    getArticleRating: build.query<Rating[], GetArticleRatingArg>({
      // колбэк принимает какие-то аргументы для передачи на сервер
      query: params => ({
        // указываем параметры
        params: { ...params },

        // здесь есть все поля как в стандартных запросах
        // указываем урл
        url: '/article-ratings',
      }),
    }),
  }),
});

// создаем хук, в который помещаем данные из запроса
export const useArticleRating = articleRatingApi.useGetArticleRatingQuery;

// пример запроса на создание (через mutation)
export const useCreateArticleRating =
  articleRatingApi.useCreateArticleRatingMutation;
