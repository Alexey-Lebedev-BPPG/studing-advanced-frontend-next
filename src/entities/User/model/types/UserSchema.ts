import { JsonSettings } from './jsonSetting';
import { UserRole } from '../../../../app-fsd/consts/consts';
import { FeatureFlags } from '@/shared/types/featureFlags';

export interface User {
  avatar?: string;
  features?: FeatureFlags;
  id: string;
  jsonSettings?: JsonSettings;
  roles?: UserRole[];
  username: string;
}

export interface UserSchema {
  // добавляем типизацию для поля, которое будет показывать состояние инициализации данных пользователя (т.е. пока данные не инициализированы - false, как только пройдет инициализация - true)
  _inited: boolean;
  authData?: User;
}
