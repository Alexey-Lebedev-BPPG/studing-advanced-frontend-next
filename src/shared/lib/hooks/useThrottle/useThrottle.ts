import { useCallback, useRef } from 'react';

export const useThrottle = (
  callback: (...args: any[]) => void,
  delay: number = 500,
) => {
  // реф, который хранит все булевые значения, которые показывают можно сейчас вызывать колбэк или нет
  const throttleRef = useRef(false);

  return useCallback(
    (...args: any[]) => {
      // делаем условие, при котором когда реф будет равен false
      if (!throttleRef.current) {
        callback(...args);
        // передаем тру, чтобы считать, что этот колбэк выполнился
        throttleRef.current = true;

        setTimeout(() => {
          throttleRef.current = false;
        }, delay);
      }
    },
    [callback, delay],
  );
};

// то есть другими словами, мы вызываем колбэк (10) и делаем реф трушным, поэтому все остальные вызовы колбэка будут проигнорированы. И только тогда, когда мы выполним таймаут по окончанию, новый колбэк выполнится заново
