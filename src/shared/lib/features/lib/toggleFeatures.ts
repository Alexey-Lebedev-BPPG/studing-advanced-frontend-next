import { getFeatureFlags } from './setGetFeatures';
import { FeatureFlags } from '@/shared/types/featureFlags';

interface ToggleFeaturesOptions<T> {
  name: keyof FeatureFlags;
  off: () => T;
  on: () => T;
}

// добавление фичи-флага (данные, кому показывать, а кому нет, должны храниться в БД (например, в модели юзера))
// в нашем случае мы добавили пользователю с id=1 этот фичи-флаг и второму пользователю отключили

// функция добавления/удаления только логики для фичи флагов
export const toggleFeatures = <T>({
  name,
  off,
  on,
}: ToggleFeaturesOptions<T>): T => (getFeatureFlags(name) ? on() : off());
