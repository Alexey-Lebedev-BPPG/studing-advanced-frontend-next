// добавляем, чтоб typescript начал понимать модули
declare module '*.mp4';
declare module '*.svg' {
  import { SVGProps, FunctionComponent } from 'react';

  const SVG: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;
  export default SVG;
}

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

type ValidRowModel = {
  [key: string]: any;
};

// service
interface IResponse<R = unknown> {
  data: R;
  status: number;
  success?: boolean;
}

interface IAction<P = unknown> {
  type: string;
  payload?: P;
}

interface IMessage {
  message: string;
}

interface IErrorMessage extends IMessage {
  error: string;
  statusCode: number;
}
