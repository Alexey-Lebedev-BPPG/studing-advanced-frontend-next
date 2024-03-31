export type BuildMode = 'production' | 'development';

export interface BuildPaths {
  build: string;
  // путь, куда переводы помещать
  buildLocales: string;
  entry: string;
  html: string;
  icon?: string;
  // путь до файлов с переводами
  locales: string;
  src: string;
  // envPath: string;
}

export interface BuildEnv {
  apiURL: string;
  mode: BuildMode;
  modeDebug: string;
  port: string;
  // NEXT_PUBLIC_SENTRY_AUTH_TOKEN?: string;
  // NEXT_PUBLIC_SENTRY_ORG?: string;
  // NEXT_PUBLIC_SENTRY_RELEASE?: string;
  // NEXT_PUBLIC_SENTRY_PROJECT?: string;
}

export interface BuildOptions {
  apiURL: string;
  isDev: boolean;
  isDevDebug: boolean;
  mode: BuildMode;
  paths: BuildPaths;
  port: number;
  // создаем переменную для разделения сред выполнения
  project: 'storybook' | 'frontend' | 'jest';
  // sentryToken: string;
  // sentryRelease: string;
  // sentryOrg: string;
  // sentryProject: string;
}
