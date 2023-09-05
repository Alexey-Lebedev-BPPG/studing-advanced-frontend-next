'use client';

import { signIn } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { FC, useCallback, useState } from 'react';
import cls from './LoginForm.module.scss';

import { loginReducer } from '../../model/slice/loginSlice';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';

import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export interface ILoginFormProps {
  className?: string;
  onSuccess: () => void;
}

// чтоб напрямую не передавать в пропсы объект такого типа reducers={{ loginForm: loginReducer }}, т.к. это каждый раз будет создавать новый объект, мы делаем редьюсер по ум.
const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm: FC<ILoginFormProps> = props => {
  const { className, onSuccess } = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorResponse, setErrorResponse] = useState('');

  const onChangeUsername = useCallback((value: string) => {
    setErrorResponse('');
    setUsername(value);
  }, []);

  const onChangePassword = useCallback((value: string) => {
    setErrorResponse('');
    setPassword(value);
  }, []);

  const { t } = useTranslation();

  const forceUpdate = useForceUpdate();

  const onLoginClick = useCallback(async () => {
    // вызываем наш thunk для передачи данных на бэк
    // const result = await dispatch(loginByUsername({ password, username }));
    const response = await signIn('credentials', {
      // передаем данные на сервер
      password,
      // с случае ошибки нас перебросит на форму, которую генерирует некст. можно создать компонент ошибки, сделать под него стейт и показывать его
      redirect: false,
      username,
    });

    if (response && !response.error) {
      onSuccess();
      // + перерисовываем все приложение для изменения фичи-флагов
      forceUpdate();
    } else {
      setErrorResponse(String(response?.error));
      console.log('response', response);
    }
  }, [forceUpdate, onSuccess, password, username]);

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <ToggleFeatures
        nameFeatures={'isAppRedesigned'}
        off={
          <div className={classNames(cls.loginForm, {}, [className])}>
            <TextDeprecated title={`${t('Форма авторизации')}`} />
            {!!errorResponse && (
              <TextDeprecated text={errorResponse} theme='error' />
            )}
            <InputDeprecated
              autofocus
              type='text'
              className={cls.input}
              placeholder={`${t('Введите username')}`}
              value={username}
              onChange={onChangeUsername}
            />
            <InputDeprecated
              type='text'
              className={cls.input}
              placeholder={`${t('Введите пароль')}`}
              value={password}
              onChange={onChangePassword}
            />
            <ButtonDeprecated
              theme='outline'
              className={cls.loginBtn}
              // disabled={isLoading}
              onClick={onLoginClick}
            >
              {t('Войти')}
            </ButtonDeprecated>
          </div>
        }
        on={
          <VStack gap='16'>
            <Text title={`${t('Форма авторизации')}`} />
            {!!errorResponse && <Text text={errorResponse} variant='error' />}
            <Input
              autofocus
              type='text'
              className={cls.input}
              placeholder={`${t('Введите username')}`}
              value={username}
              onChange={onChangeUsername}
            />
            <Input
              type='text'
              className={cls.input}
              placeholder={`${t('Введите пароль')}`}
              value={password}
              onChange={onChangePassword}
            />
            <Button
              variant='outline'
              className={cls.loginBtn}
              // disabled={isLoading}
              onClick={onLoginClick}
            >
              {t('Войти')}
            </Button>
          </VStack>
        }
      />
    </DynamicModuleLoader>
  );
};

export default LoginForm;
