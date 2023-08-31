import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// вытягиваем типы из библиотек (@use-gesture/react - библиотека для dnd, @react-spring/web - библиотека для анимаций)
type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

interface AnimationContextPayload {
  Gesture?: GestureType;
  Spring?: SpringType;
  // будет трушным, когда библиотеки подгрузились
  isLoaded?: boolean;
}

// создаем контекст для наших библиотек
const AnimationContext = createContext<AnimationContextPayload>({});

// создаем функцию для асинхронной (ленивой) подгрузки библиотек
const getAsyncAnimationModules = () =>
  // такой способ позволяет подгружать библиотеки где угодно (мы подгружаем их параллельно)
  Promise.all([import('@react-spring/web'), import('@use-gesture/react')]);

// если мы хотим сделать независимые подгрузки (то есть подгружается сначала одна, за ней другая), то вышеуказанная функция будет выглядеть вот так:
// const getAsyncAnimationModules = async () => {
//   const Spring = await import("@react-spring/web");
//   const Gesture = await import("@use-gesture/react");
// };

// для удобства использования создаем хук, чтоб использовать его по проекту (и указываем, что данные пропсы теперь точно не undefined)
export const useAnimationLibs = () =>
  useContext(AnimationContext) as Required<AnimationContextPayload>;

// создаем провайдер, который будет оборачивать только те компоненты, в которых используются вышеуказанные библиотеки
export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  // создаем рефы и в них будем складывать сами библиотеки (используем рефы, чтоб от рендера к рендеру был доступ к значений без лишних перерисовок)
  const SpringRef = useRef<SpringType>();
  const GestureRef = useRef<GestureType>();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // вызываем функцию подгрузки библиотек
    getAsyncAnimationModules().then(([Spring, Gesture]) => {
      // сохраняем библиотеки в рефы
      SpringRef.current = Spring;
      GestureRef.current = Gesture;
      // сообщаем, что библиотеки подгрузились успешно
      setIsLoaded(true);
    });
  }, []);

  // создаем переменную, в которую помещаем результаты подгрузки библиотек и передаем в контекст
  const value = useMemo(
    () => ({
      Gesture: GestureRef.current,
      Spring: SpringRef.current,
      isLoaded,
    }),
    [isLoaded],
  );
  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};
