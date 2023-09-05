'use client';

import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { IProfileCardProps } from '../ProfileCardDeprecated/ProfileCardDeprecated';
import cls from '../ProfileCardDeprecated/ProfileCardDeprecated.module.scss';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { VStack, HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation('profile');

  return (
    <HStack
      max
      justify='center'
      className={classNames(cls.profileCard, {}, [cls.error])}
    >
      <Text
        variant='error'
        title={`${t('Произошла ошибка при загрузке профиля')}`}
        text={`${t('Попробуйте обновить страницу')}`}
        align='center'
      />
    </HStack>
  );
};

export const ProfileCardRedesignedSkeleton = () => (
  <Card fullWidth padding='24' border='partial'>
    <VStack gap='32'>
      <HStack max justify='center'>
        <Skeleton border='100%' width={128} height={128} />
      </HStack>
      <HStack max gap='32'>
        <VStack max gap='16'>
          <Skeleton width={'100%'} height={38} />
          <Skeleton width={'100%'} height={38} />
          <Skeleton width={'100%'} height={38} />
          <Skeleton width={'100%'} height={38} />
        </VStack>
        <VStack max gap='16'>
          <Skeleton width={'100%'} height={38} />
          <Skeleton width={'100%'} height={38} />
          <Skeleton width={'100%'} height={38} />
          <Skeleton width={'100%'} height={38} />
        </VStack>
      </HStack>
    </VStack>
  </Card>
);

export const ProfileCardRedesigned: FC<IProfileCardProps> = props => {
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

  const { t } = useTranslation();

  return (
    <Card
      fullWidth
      padding='24'
      border='partial'
      data-testid='ProfileCard'
      className={className}
    >
      <VStack gap='32'>
        {!!data?.avatar && (
          <HStack max justify='center'>
            <Avatar size={128} src={data?.avatar} />
          </HStack>
        )}
        <HStack max gap='24'>
          <VStack max gap='16'>
            <Input
              value={data?.first}
              label={`${t('Имя')}`}
              readonly={readonly}
              data-testid='ProfileCard.firstName'
              onChange={onChangeFirstName}
            />
            <Input
              value={data?.lastname}
              label={`${t('Фамилия')}`}
              readonly={readonly}
              data-testid='ProfileCard.lastname'
              onChange={onChangeLastname}
            />
            <Input
              value={data?.age}
              label={`${t('Возраст')}`}
              readonly={readonly}
              onChange={onChangeAge}
            />
            <Input
              value={data?.city}
              label={`${t('Город')}`}
              readonly={readonly}
              onChange={onChangeCity}
            />
          </VStack>
          <VStack max gap='16'>
            <Input
              value={data?.username}
              label={`${t('Имя пользователя')}`}
              readonly={readonly}
              onChange={onChangeUsername}
            />
            <Input
              value={data?.avatar}
              label={`${t('Ссылка на аватар')}`}
              readonly={readonly}
              onChange={onChangeAvatar}
            />
            <CurrencySelect
              value={data?.currency}
              readonly={readonly}
              onChange={onChangeCurrency}
            />
            <CountrySelect
              value={data?.country}
              readonly={readonly}
              onChange={onChangeCountry}
            />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};
