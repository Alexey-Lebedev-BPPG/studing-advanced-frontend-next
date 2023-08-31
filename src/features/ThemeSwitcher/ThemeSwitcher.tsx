'use client';

import { FC, useCallback } from 'react';
import { saveJsonSettings } from '@/entities/User';
import ThemeIconDeprecated from '@/shared/assets/icons/theme-light.svg';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface IThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<IThemeSwitcherProps> = props => {
  const { className } = props;

  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  const onToggleHandler = useCallback(
    () =>
      toggleTheme(newTheme => dispatch(saveJsonSettings({ theme: newTheme }))),
    [dispatch, toggleTheme],
  );

  return (
    <ToggleFeatures
      nameFeatures={'isAppRedesigned'}
      on={<Icon clickable src={ThemeIcon} onClick={onToggleHandler} />}
      off={
        <ButtonDeprecated
          theme='clear'
          className={classNames('', {}, [className])}
          onClick={onToggleHandler}
        >
          <IconDeprecated
            inverted
            src={ThemeIconDeprecated}
            width={40}
            height={40}
          />
        </ButtonDeprecated>
      }
    />
  );
};
