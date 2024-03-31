import { useLocale, useTranslations } from 'next-intl';
import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppNavigation } from '@/shared/lib/hooks/useAppNavigation/useAppNavigation';
import { useAppPathname } from '@/shared/lib/router/navigation';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';

interface ILanguageSwitcherProps {
  className?: string;
  // при true показывать сокращенные значения текста
  short?: boolean;
}

export const LanguageSwitcher: FC<ILanguageSwitcherProps> = memo(props => {
  const { className, short } = props;

  const t = useTranslations();
  const language = useLocale();
  const pathname = useAppPathname();
  const { replace } = useAppNavigation();

  // вызываем функцию перевода и в ней меняем язык на противоположный
  const onChangeLanguage = () => {
    replace({
      options: {
        locale: language === 'ru' || language === 'ru-RU' ? 'en' : 'ru',
      },
      path: pathname,
    });
    localStorage.setItem(
      'i18nextLng',
      language === 'ru' || language === 'ru-RU' ? 'en' : 'ru',
    );
  };

  return (
    <ToggleFeatures
      nameFeatures={'isAppRedesigned'}
      off={
        <ButtonDeprecated
          theme='clear'
          className={classNames('', {}, [className])}
          onClick={onChangeLanguage}
        >
          {t(short ? 'Короткий язык' : 'Язык')}
        </ButtonDeprecated>
      }
      on={
        <Button variant='clear' onClick={onChangeLanguage}>
          {t(short ? 'Короткий язык' : 'Язык')}
        </Button>
      }
    />
  );
});
