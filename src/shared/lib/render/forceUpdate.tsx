import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

// создаем контекст
const ForceUpdateContext = createContext({
  forceUpdate: () => {},
  value: true,
});

// хук для использования (пример в файле LoginForm и UiDesignSwitcher). Применять с ОСТОРОЖНОСТЬЮ!!!
export const useForceUpdate = () => {
  const { forceUpdate } = useContext(ForceUpdateContext);

  return forceUpdate;
};

// провайдер делает свое состояние на 120 миллисекунд удаляет все приложение из дерева.затем встраивает его обратно.ввиду того, что встраивание происходит заново с нуля, то все статичные данные заново перерисовываются
export function ForceUpdateProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState(true);

  const forceUpdate = () => {
    setValue(prev => !prev);
    setTimeout(() => {
      setValue(prev => !prev);
    }, 120);
  };

  const valueContext = useMemo(() => ({ forceUpdate, value }), [value]);

  if (!value) return null;

  return (
    <ForceUpdateContext.Provider value={valueContext}>
      {children}
    </ForceUpdateContext.Provider>
  );
}
