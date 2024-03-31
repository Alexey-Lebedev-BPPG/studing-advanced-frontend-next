import { Listbox as HListbox } from '@headlessui/react';
import { Fragment, ReactNode, useMemo } from 'react';
import cls from './ListBox.module.scss';
import { classNames } from '../../../../../lib/classNames/classNames';
import { DropDownDirection } from '../../../../../types/ui';
import { Button } from '../../../Button';
import { Icon } from '../../../Icon';
import { HStack } from '../../../Stack';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popups.module.css';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { typedMemo } from '@/shared/lib/typedMemo/typedMemo';

export interface ListBoxItem<T extends string> {
  content: ReactNode;
  disabled?: boolean;
  valueOpt: T;
}

interface IListBoxProps<T extends string> {
  className?: string;
  defaultValue?: T;
  direction?: DropDownDirection;
  items?: ListBoxItem<T>[];
  label?: string;
  onChange: (value: T) => void;
  readonly?: boolean;
  value?: string;
}

export const ListBox = typedMemo(
  <T extends string>(props: IListBoxProps<T>) => {
    const {
      className,
      defaultValue,
      direction = 'bottom left',
      items,
      label,
      onChange,
      readonly,
      value,
    } = props;

    const optionsClasses = [mapDirectionClass[direction], popupCls.menu];

    const selectedItem = useMemo(
      () => items?.find(item => item.valueOpt === value),
      [items, value],
    );

    return (
      <HStack gap='4'>
        {!!label && <span>{`${label}>`}</span>}
        <HListbox
          as='div'
          disabled={readonly}
          className={classNames('', {}, [className, popupCls.popup])}
          value={value}
          onChange={onChange}
        >
          <HListbox.Button
            as={Button}
            variant='filled'
            readonly={readonly}
            addonRight={<Icon Svg={ArrowIcon} />}
            className={popupCls.trigger}
          >
            {selectedItem?.content ?? defaultValue}
          </HListbox.Button>
          <HListbox.Options
            className={classNames(cls.options, {}, optionsClasses)}
          >
            {items?.map(item => (
              <HListbox.Option
                key={item.valueOpt}
                value={item.valueOpt}
                // делаем как фрагмент элемент, чтоб не создавать новые ноды
                as={Fragment}
                disabled={item.disabled}
              >
                {/* selected - выбранный элемент, а active - ховер элемент */}
                {({ active, selected }) => (
                  <li
                    className={classNames(cls.item, {
                      [popupCls.active]: active,
                      [popupCls.disabled]: item.disabled,
                      [popupCls.selected]: selected,
                    })}
                  >
                    {selected}
                    {item.content}
                  </li>
                )}
              </HListbox.Option>
            ))}
          </HListbox.Options>
        </HListbox>
      </HStack>
    );
  },
);
