// eslint-disable-next-line unused-imports/no-unused-imports
// import NextAuth from 'next-auth';
// добавляем, чтоб typescript начал понимать модули
declare module '*.module.scss' {
  const value: Record<string, string>;
  export default value;
}

declare module '*.module.sass' {
  const value: Record<string, string>;
  export default value;
}

declare module '*.module.css' {
  const value: Record<string, string>;
  export default value;
}

declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.webp';
declare module '*.avif';
declare module '*.bmp';
declare module '*.gif';

declare module '*.svg' {
  import { SVGProps, FunctionComponent } from 'react';

  const SVG: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;
  export default SVG;
}

// чтоб кастомный объект юзера в сессию записать
// declare module 'next-auth' {
//   import { User } from '@/entities/User';
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     user: User;
//   }
// }

// декларируем константу из вебпака
declare const __IS_DEV__: boolean;
declare const __IS_DEV_DEBUG__: boolean;
declare const __API__: string;
declare const __PROJECT__: 'storybook' | 'frontend' | 'jest';

// используем глобальный тип для DeepPartial по всему проекту
type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

// кастомный тип для обычного рекорда, в котором ключ не обязателен
type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
