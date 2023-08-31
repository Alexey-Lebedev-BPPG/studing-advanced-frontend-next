'use client';

import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';
import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { NotificationButton } from '@/features/NotificationButton';
import { getRouteArticleCreate } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { useAppSelector } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Text } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface NavbarProps {
  className?: string;
}

// все, что в виджете будет экспортиться не по дефолту
// навбар будет принимать доп класс, чтоб извне можно было поправить какие-то стили в нем
export const Navbar = (props: NavbarProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const authData = useAppSelector(getUserAuthData);
  const [isAuthModal, setIsAuthModal] = useState(false);

  // все функции, которые будут передаваться пропсами, ОБЯЗАТЕЛЬНО помещаем в useCallback, чтоб сохранять ссылку на эту функцию
  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const mainClass = toggleFeatures({
    name: 'isAppRedesigned',
    off: () => cls.navbar,
    on: () => cls.navbarRedesigned,
  });

  // для авторизованного юзера
  if (authData)
    return (
      <ToggleFeatures
        nameFeatures={'isAppRedesigned'}
        on={
          <header className={classNames(mainClass, {}, [className])}>
            <HStack gap='16' className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
        off={
          <header className={classNames(mainClass, {}, [className])}>
            <Text
              theme='inverted'
              className={cls.appName}
              title={`${t('Ulbi Example')}`}
            />
            <AppLink href={getRouteArticleCreate()} theme='secondary'>
              {t('Создать статью')}
            </AppLink>
            <HStack gap='16' className={cls.actions}>
              <NotificationButton />
              <AvatarDropdown />
            </HStack>
          </header>
        }
      />
    );

  // для не авторизованного юзера
  return (
    <header className={classNames(mainClass, {}, [className])}>
      <ToggleFeatures
        nameFeatures={'isAppRedesigned'}
        off={
          <ButtonDeprecated
            theme='clearInverted'
            className={cls.links}
            onClick={onShowModal}
          >
            {t('Войти')}
          </ButtonDeprecated>
        }
        on={
          <Button className={cls.links} variant='clear' onClick={onShowModal}>
            {t('Войти')}
          </Button>
        }
      />
      {/* если у нас модалка открывается, то только тогда мы модалку монтируем.если нет, то убираем ее из DOM-дерева */}
      {!!isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
};
