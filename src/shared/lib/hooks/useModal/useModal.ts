import { useState, useRef, useCallback, useEffect } from 'react';

interface UseModalProps {
  animationDelay: number;
  isOpen?: boolean;
  onClose?: () => void;
}

/**
 * Переиспользуемый хук для модальных компонентов (drawer/modal)
 * @param animationDelay
 * @param isOpen
 * @param onClose
 */

export const useModal = ({
  animationDelay,
  isOpen,
  onClose,
}: UseModalProps) => {
  // обработаем анимацию закрытия модального окна
  const [isClosing, setIsClosing] = useState(false);
  // состояние, отвечающее за то, смонтирована модалка или нет
  const [isMounting, setIsMounting] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // функция закрытия модалки
  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, animationDelay);
    }
  }, [animationDelay, onClose]);

  // оборачиваем в useCallback, чтоб при каждом рендеринге не создавалась новая функция, а сохранялась ссылка на старую
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeHandler();
    },
    [closeHandler],
  );

  useEffect(() => {
    if (isOpen)
      // навешиваем слушателя на все приложение, чтоб закрывать модалку по клавише Escape
      window.addEventListener('keydown', onKeyDown);

    return () => {
      if (timerRef?.current) clearTimeout(timerRef.current);

      // обязательно очищаем слушателя, чтоб он не был доступен вне модалки
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  useEffect(() => {
    if (isOpen) setIsMounting(true);
  }, [isOpen]);

  return { close: closeHandler, isClosing, isMounting };
};
