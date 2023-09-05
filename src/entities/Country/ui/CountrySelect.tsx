'use client';

import { useTranslation } from 'next-i18next';
import { FC, useCallback } from 'react';
import { Country } from '../model/types/types';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface ICountryProps {
  className?: string;
  onChange?: (value: Country) => void;
  readonly?: boolean;
  value?: Country;
}

// ввиду того, что массив всегда статичен, его не нужно оборачивать в memo
const options = [
  { content: 'Armenia', valueOpt: 'Armenia' },
  { content: 'Russia', valueOpt: 'Russia' },
  { content: 'Belarus', valueOpt: 'Belarus' },
  { content: 'Kazakhstan', valueOpt: 'Kazakhstan' },
  { content: 'Ukraine', valueOpt: 'Ukraine' },
];

export const CountrySelect: FC<ICountryProps> = props => {
  const { className, onChange, readonly, value } = props;

  const { t } = useTranslation();

  // явно преобразовываем значения из onChange в наш тип
  const onChangeHandler = useCallback(
    (valueOpt: string) => onChange?.(valueOpt as Country),
    [onChange],
  );

  const childrenProps = {
    className,
    defaultValue: `${t('Укажите страну')}`,
    direction: 'top right' as const,
    items: options,
    label: `${t('Укажите страну')}`,
    onChange: onChangeHandler,
    readonly,
    value,
  };

  return (
    <ToggleFeatures
      nameFeatures={'isAppRedesigned'}
      off={<ListBoxDeprecated {...childrenProps} />}
      on={<ListBox {...childrenProps} />}
    />
  );
};
