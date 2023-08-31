import { JsonSettings } from '../../types/jsonSetting';
import { buildSelector } from '@/shared/lib/store';

// объявляем константу вне селектора, чтоб каждый раз объект новый не создавался, а был постоянным
const defaultJsonSettings: JsonSettings = {};

export const [useJsonSettings, getJsonSettings] = buildSelector(
  state => state.user.authData?.jsonSettings || defaultJsonSettings,
);
