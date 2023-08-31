/* eslint-disable no-unused-vars */
// позволяет создавать объекты с ключом строки и значением строки или булевого типа
type Mods = Record<string, string | boolean | undefined>;

// принимает главный класс(rootCls), модификаторы(mods), массив доп. классов
export const classNames = (
  rootCls: string,
  mods: Mods = {},
  additional: Array<string | undefined> = [],
): string =>
  [
    // возвращаем главный класс
    rootCls,
    // проходим по объекту, преобразовываем его в массив, фильтруем по трушному value и возвращаем только массив ключей
    ...Object.entries(mods)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([classKey, classValue]) => Boolean(classValue))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(([classKey, classValue]) => classKey),
    // добавляем доп. классы и фильтруем их от ложных значений
    ...additional.filter(Boolean),
    // склевиаем строку из массива по пробелу
  ].join(' ');

// пример вызова и результат
// classNames("remove-btn", { hovered: true, selectable: true, red: false }, [
//   "pdg",
// ]);
// вывод:
// "remove-btn hovered selectable pdg"
