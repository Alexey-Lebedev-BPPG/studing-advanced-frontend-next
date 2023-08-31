import { profileActions, profileReducer } from './profileSlice';
import { ValidateProfileError } from '../consts/consts';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema } from '../types/editableProfileCard';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

const data = {
  age: 22,
  city: 'asd',
  country: 'Ukraine' as Country,
  currency: 'USD' as Currency,
  first: 'asd',
  lastname: 'test',
  username: 'admin',
};

describe('profileSlice', () => {
  test('test set readonly', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false };
    expect(
      profileReducer(state as ProfileSchema, profileActions.setReadonly(true)),
    ).toEqual({ readonly: true });
  });

  test('test cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } };
    expect(
      profileReducer(state as ProfileSchema, profileActions.cancelEdit()),
    ).toEqual({ data, form: data, readonly: true, validateError: undefined });
  });

  test('test update profile', () => {
    const state: DeepPartial<ProfileSchema> = { form: { username: '123' } };
    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({ username: '123456' }),
      ),
    ).toEqual({ form: { username: '123456' } });
  });
  // тестируем экстра редьюсеры
  // сначала тестируем pending состояние
  test('test update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateError: [ValidateProfileError.SERVER_ERROR],
    };
    expect(
      profileReducer(state as ProfileSchema, updateProfileData.pending),
    ).toEqual({
      isLoading: true,
      validateError: undefined,
    });
  });

  // далее тестируем fulfilled состояние
  test('test update profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
      validateError: [ValidateProfileError.SERVER_ERROR],
    };
    expect(
      profileReducer(
        state as ProfileSchema,
        // передаем данные профиля в наш экшен
        updateProfileData.fulfilled(data, ''),
      ),
    ).toEqual({
      data,
      form: data,
      isLoading: false,
      readonly: true,
      validateError: undefined,
    });
  });
});
