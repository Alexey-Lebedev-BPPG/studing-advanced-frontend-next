import { AllLocales } from 'next-intl/dist/types/src/shared/types';

type IntlNavigateOptions<Locales extends AllLocales> = {
  locale?: Locales[number];
};

interface ICommonUseDefineNextURLProps {
  path: string;
  options?: { scroll?: boolean; locale?: string };
}

interface TPropsWithoutParams {
  withParams?: false;
  paramsToDelete?: never;
  newParams?: never;
}

interface TPropsWithParams {
  withParams?: true;
  paramsToDelete?: string[];
  newParams?: { [key: string]: string | number };
}

type TUseDefineNextURLPropsWithParams = ICommonUseDefineNextURLProps &
  TPropsWithParams;

type TUseDefineNextURLPropsWithoutParams = ICommonUseDefineNextURLProps &
  TPropsWithoutParams;

export type TUseDefineNextURLProps =
  | TUseDefineNextURLPropsWithParams
  | TUseDefineNextURLPropsWithoutParams;
