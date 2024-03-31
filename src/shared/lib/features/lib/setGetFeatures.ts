import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/const/localStorage';
import { FeatureFlags } from '@/shared/types/featureFlags';

// задаем дефолтное значение для фичи
const defaultFeatureFlags: FeatureFlags = {
  isAppRedesigned:
    typeof window !== 'undefined'
      ? localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new'
      : false,
  isTest: true,
};

// пока делаем фичи-флаги в константах, потому что в рамках одной сессии они навряд ли поменяются. Однако потом нужно будет переделать на сохранение в редакс
let featureFlags: FeatureFlags = {
  // разворачиваем дефолтное значение для фичи
  ...defaultFeatureFlags,
};

// создаем геттер и сеттер, чтоб случайно не перезатереть константу. именно поэтому мы ее не импортим

export const setFeatureFlags = (newFeatureFlags?: FeatureFlags) => {
  if (newFeatureFlags) featureFlags = newFeatureFlags;
};

export const getFeatureFlags = (flag: keyof FeatureFlags) =>
  featureFlags?.[flag];

export const getAllFeatureFlags = () => featureFlags;
