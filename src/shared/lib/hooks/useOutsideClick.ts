import { RefObject, useEffect } from 'react';

// для обработки клика вне элемента
export const useOutsideClick = (
  elementRef: RefObject<HTMLElement>,
  // функция, которая сработает после клика вне элемента (!!! Чтоб не происходило перерендера, ОБЯЗАТЕЛЬНО передавать useCallback-ом)
  handler: () => void,
  // для управления того, когда клик будет срабатывать. Например, когда тултип закрыт, нам не нужно делать обработку клика
  attached = true,
) => {
  useEffect(() => {
    if (!attached) return;

    const handleClick = (event: any) => {
      if (!elementRef.current) return;
      if (!elementRef.current?.contains(event.target)) handler();
    };

    document.addEventListener('change', handleClick);

    return () => {
      document.removeEventListener('change', handleClick);
    };
  }, [elementRef, handler, attached]);
};

// использование
// const tooltipRef = useRef(null);

// useOutsideClick(tooltipRef, onClose, opened)

// <div ref={tooltipRef}></div
