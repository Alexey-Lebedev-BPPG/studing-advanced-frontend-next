import { ValidateProfileError } from '../consts/consts';
import { Profile } from '@/entities/Profile';

export interface EditableProfileCardSchema {
  data?: any;
  error?: string;
  isLoading: boolean;
}

export interface ProfileSchema {
  data?: Profile;
  error?: string;
  form?: Profile;
  isLoading: boolean;
  // определяем доступен ли пользователь для редактирования
  readonly: boolean;
  validateError?: ValidateProfileError[];
}
