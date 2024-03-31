import { useTranslations } from 'next-intl';
import { FC, memo, useCallback } from 'react';
import { ValidateProfileError } from '../../model/consts/consts';
import {
  getProfileForm,
  getProfileIsLoading,
  getProfileError,
  getProfileIsReadonly,
  getProfileValidateErrors,
} from '../../model/selectors/getEditableProfileCard';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ProfileCard } from '@/entities/Profile';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';

export interface IEditableProfileCardProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  profile: profileReducer,
};

export const EditableProfileCard: FC<IEditableProfileCardProps> = memo(
  props => {
    const { className, id } = props;

    const dispatch = useAppDispatch();
    const t = useTranslations();

    const formData = useAppSelector(getProfileForm);
    const isLoading = useAppSelector(getProfileIsLoading);
    const error = useAppSelector(getProfileError);
    const readonly = useAppSelector(getProfileIsReadonly);
    const errors = useAppSelector(getProfileValidateErrors);

    const validateErrorTranslate = {
      [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
      [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректный регион'),
      [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
      [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия не указаны'),
      [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    };

    const onChangeFirstName = useCallback(
      (value?: string) =>
        dispatch(profileActions.updateProfile({ first: value || '' })),
      [dispatch],
    );

    const onChangeLastname = useCallback(
      (value?: string) =>
        dispatch(profileActions.updateProfile({ lastname: value || '' })),
      [dispatch],
    );
    const onChangeAge = useCallback(
      (value?: string) =>
        dispatch(
          profileActions.updateProfile({
            age: Number(value?.replace(/\D/gi, '') || 0),
          }),
        ),
      [dispatch],
    );
    const onChangeCity = useCallback(
      (value?: string) =>
        dispatch(profileActions.updateProfile({ city: value || '' })),
      [dispatch],
    );

    const onChangeUsername = useCallback(
      (value?: string) =>
        dispatch(profileActions.updateProfile({ username: value || '' })),
      [dispatch],
    );

    const onChangeAvatar = useCallback(
      (value?: string) =>
        dispatch(profileActions.updateProfile({ avatar: value || '' })),
      [dispatch],
    );

    const onChangeCurrency = useCallback(
      (currency: Currency) =>
        dispatch(profileActions.updateProfile({ currency })),
      [dispatch],
    );

    const onChangeCountry = useCallback(
      (country: Country) => dispatch(profileActions.updateProfile({ country })),
      [dispatch],
    );

    useInitialEffect(() => {
      if (id) dispatch(fetchProfileData(id));
    });

    return (
      <DynamicModuleLoader reducers={reducers}>
        <VStack max gap='16' className={classNames('', {}, [className])}>
          <EditableProfileCardHeader />
          {!!errors &&
            !!errors.length &&
            errors.map(err => (
              <Text
                key={err}
                theme='error'
                text={validateErrorTranslate[err]}
                data-testid='EditableProfileCard.Error'
              />
            ))}
          <ProfileCard
            data={formData}
            isLoading={isLoading}
            error={error}
            readonly={readonly}
            onChangeFirstName={onChangeFirstName}
            onChangeLastname={onChangeLastname}
            onChangeAge={onChangeAge}
            onChangeCity={onChangeCity}
            onChangeUsername={onChangeUsername}
            onChangeAvatar={onChangeAvatar}
            onChangeCurrency={onChangeCurrency}
            onChangeCountry={onChangeCountry}
          />
        </VStack>
      </DynamicModuleLoader>
    );
  },
);
