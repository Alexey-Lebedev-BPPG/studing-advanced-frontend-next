import { useCallback, useEffect, useRef, useState } from 'react';

// проверяет, что компонент отрендерился
export const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

// безопасный useState для компонента, который при асинхронной логике меняет стейт локальный, но может быть быстро удален из DOM, когда асинхронная логика еще не закончилась
export const useSafeState = <T>(initialValue: T) => {
  const [state, setState] = useState(initialValue);
  const isMounted = useIsMounted();

  const updateState = useCallback(
    (newValue: T) => {
      if (isMounted.current) setState(newValue);
    },
    [isMounted],
  );

  return [state, updateState];
};
