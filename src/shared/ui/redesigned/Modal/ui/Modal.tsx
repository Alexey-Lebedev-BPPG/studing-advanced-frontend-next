'use client';

import { FC, ReactNode } from 'react';
import cls from './Modal.module.scss';
import { Overlay } from '../../Overlay';
import { Portal } from '../../Portal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

interface IModalProps {
  children?: ReactNode;
  className?: string;
  isOpen?: boolean;
  lazy?: boolean;
  onClose?: () => void;
}

export const Modal: FC<IModalProps> = props => {
  const { children, className, isOpen, lazy = true, onClose } = props;

  const { theme } = useTheme();
  const { close, isClosing, isMounting } = useModal({
    animationDelay: 300,
    isOpen,
    onClose,
  });

  const mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };
  // если lazy и компонент не вмонтирован, то модалку не отрисовываем
  if (lazy && !isMounting) return null;

  return (
    <Portal>
      <div
        className={classNames(cls.modal, mods, [
          className,
          theme,
          'app_modal',
          toggleFeatures({
            name: 'isAppRedesigned',
            off: () => cls.oldModal,
            on: () => cls.newModal,
          }),
        ])}
      >
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
