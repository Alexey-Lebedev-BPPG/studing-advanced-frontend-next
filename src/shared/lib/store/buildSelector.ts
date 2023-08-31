import { useAppSelector } from '../hooks/useAppDispatch/useAppDispatch';
import { StateSchema } from '@/app-fsd/providers/StoreProvider';

// добавляем возможность прокидывать доп аргументы
type Selector<T, Args extends any[]> = (state: StateSchema, ...args: Args) => T;
// делаем отдельный тип для хука
type Hook<T, Args extends any[]> = (...args: Args) => T;
type Result<T, Args extends any[]> = [Hook<T, Args>, Selector<T, Args>];

// используя эту функцию в файлах селекторов, мы создаем хук (который будет использоваться вместо useSelector) и значение, которое будем вытягивать (пример в компоненте <Counter> и его селекторах)
export function buildSelector<T, Args extends any[]>(
  selector: Selector<T, Args>,
): Result<T, Args> {
  const useSelectorHook: Hook<T, Args> = (...args: Args) =>
    // добавляем прокинутые аргументы
    useAppSelector((state: StateSchema) => selector(state, ...args));

  return [useSelectorHook, selector];
}
