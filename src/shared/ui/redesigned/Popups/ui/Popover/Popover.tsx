'use client';

import { Popover as PopoverHeadless } from '@headlessui/react';
import { FC, ReactNode } from 'react';
import cls from './Popover.module.scss';
import { DropDownDirection } from '../../../../../types/ui';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popups.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface IPopoverProps {
  children: ReactNode;
  className?: string;
  direction?: DropDownDirection;
  trigger: ReactNode;
}

export const Popover: FC<IPopoverProps> = props => {
  const { children, className, direction = 'bottom left', trigger } = props;

  const menuClasses = [mapDirectionClass[direction], popupCls.menu];

  return (
    <PopoverHeadless
      className={classNames('', {}, [className, popupCls.popup])}
    >
      <PopoverHeadless.Button as='div' className={popupCls.trigger}>
        {trigger}
      </PopoverHeadless.Button>
      <PopoverHeadless.Panel className={classNames(cls.panel, {}, menuClasses)}>
        {children}
      </PopoverHeadless.Panel>
    </PopoverHeadless>
  );
};
