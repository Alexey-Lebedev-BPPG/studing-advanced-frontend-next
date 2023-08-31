'use client';

import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './ProfileCardDeprecated.module.scss';
import { Profile } from '../../model/types/profile';
import { Country, CountrySelect } from '@/entities/Country';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Loader as LoaderDeprecated } from '@/shared/ui/deprecated/Loader';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';

export interface IProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  onChangeAge?: (value?: string) => void;
  onChangeAvatar?: (value?: string) => void;
  onChangeCity?: (value?: string) => void;
  onChangeCountry?: (country: Country) => void;
  onChangeCurrency?: (currency: Currency) => void;
  onChangeFirstName?: (value?: string) => void;
  onChangeLastname?: (value?: string) => void;
  onChangeUsername?: (value?: string) => void;
  readonly?: boolean;
}

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation('profile');

  return (
    <HStack
      max
      justify='center'
      className={classNames(cls.profileCard, {}, [cls.error])}
    >
      <TextDeprecated
        theme='error'
        title={`${t('Произошла ошибка при загрузке профиля')}`}
        text={`${t('Попробуйте обновить страницу')}`}
        align='center'
      />
    </HStack>
  );
};

export const ProfileCardDeprecatedSkeleton = () => (
  <HStack
    max
    justify='center'
    className={classNames(cls.profileCard, { [cls.loading]: true })}
  >
    <LoaderDeprecated />
  </HStack>
);

export const ProfileCardDeprecated: FC<IProfileCardProps> = props => {
  const {
    className,
    data,
    error,
    isLoading,
    onChangeAge,
    onChangeAvatar,
    onChangeCity,
    onChangeCountry,
    onChangeCurrency,
    onChangeFirstName,
    onChangeLastname,
    onChangeUsername,
    readonly,
  } = props;

  const { t } = useTranslation('profile');

  const mods = {
    [cls.editing]: !readonly,
  };

  return (
    <VStack
      max
      gap='16'
      data-testid='ProfileCard'
      className={classNames(cls.profileCard, mods, [className])}
    >
      {!!data?.avatar && (
        <HStack max justify='center'>
          <AvatarDeprecated src={data?.avatar} />
        </HStack>
      )}
      <InputDeprecated
        value={data?.first}
        placeholder={`${t('Ваше имя')}`}
        className={cls.input}
        readonly={readonly}
        data-testid='ProfileCard.firstName'
        onChange={onChangeFirstName}
      />
      <InputDeprecated
        value={data?.lastname}
        placeholder={`${t('Ваша фамилия')}`}
        className={cls.input}
        readonly={readonly}
        data-testid='ProfileCard.lastname'
        onChange={onChangeLastname}
      />
      <InputDeprecated
        value={data?.age}
        placeholder={`${t('Ваш возраст')}`}
        className={cls.input}
        readonly={readonly}
        onChange={onChangeAge}
      />
      <InputDeprecated
        value={data?.city}
        placeholder={`${t('Город')}`}
        className={cls.input}
        readonly={readonly}
        onChange={onChangeCity}
      />
      <InputDeprecated
        value={data?.username}
        placeholder={`${t('Введите имя пользователя')}`}
        className={cls.input}
        readonly={readonly}
        onChange={onChangeUsername}
      />
      <InputDeprecated
        value={data?.avatar}
        placeholder={`${t('Введите ссылку на аватар')}`}
        className={cls.input}
        readonly={readonly}
        onChange={onChangeAvatar}
      />
      <CurrencySelect
        value={data?.currency}
        className={cls.input}
        readonly={readonly}
        onChange={onChangeCurrency}
      />
      <CountrySelect
        value={data?.country}
        className={cls.input}
        readonly={readonly}
        onChange={onChangeCountry}
      />
    </VStack>
  );
};
