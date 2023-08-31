'use client';

import { Menu } from '@headlessui/react';

import { FC, Fragment, ReactNode } from 'react';
import cls from './Dropdown.module.scss';
import { AppLink } from '../../../AppLink/ui/AppLink';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popups.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropDownDirection } from '@/shared/types/ui';

export interface DropdownItem {
  content?: ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
}

interface IDropdownProps {
  className?: string;
  direction?: DropDownDirection;
  items: DropdownItem[];
  trigger: ReactNode;
}

export const Dropdown: FC<IDropdownProps> = props => {
  const { className, direction = 'bottom left', items, trigger } = props;

  const menuClasses = [mapDirectionClass[direction], popupCls.menu];

  return (
    <Menu as='div' className={classNames('', {}, [className, popupCls.popup])}>
      <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
        {items.map(({ content, disabled, href, onClick }, index) => {
          const contentMenuItem = ({ active }: { active: boolean }) => (
            <button
              type='button'
              disabled={disabled}
              className={classNames(cls.item, { [popupCls.active]: active })}
              onClick={onClick}
            >
              {content}
            </button>
          );

          if (href)
            return (
              <Menu.Item
                key={index}
                as={AppLink}
                href={href}
                disabled={disabled}
              >
                {contentMenuItem}
              </Menu.Item>
            );

          return (
            <Menu.Item key={index} as={Fragment} disabled={disabled}>
              {contentMenuItem}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};
