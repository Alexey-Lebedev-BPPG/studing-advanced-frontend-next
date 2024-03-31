import { FC, Suspense } from 'react';
import cls from './LoginModal.module.scss';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Modal } from '@/shared/ui/redesigned/Modal';

interface ILoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: FC<ILoginModalProps> = ({
  className,
  isOpen,
  onClose,
}) => (
  <Modal
    className={classNames(cls['login-modal'], {}, [className])}
    isOpen={isOpen}
    onClose={onClose}
  >
    {/* Оборачиваем в Suspense, т.к. подгружаем асинхронно  */}
    <Suspense fallback={<Loader />}>
      <LoginFormAsync onSuccess={onClose} />
    </Suspense>
  </Modal>
);
