import { PluginItem } from '@babel/core';

// аналогов бейбла очень много. Лучше использовать swc-loader(от создателей некста)

// создаем свой babel плагин, чтоб удалять аргументы вида data-testid из элементов при сборке проекта
// eslint-disable-next-line func-names, import/no-anonymous-default-export
export default function (): PluginItem {
  return {
    visitor: {
      // указываем такую конструкцию, чтоб в ноду можно было прокидывать пропсы (прокидывать атрибуты, чтоб при продакшн сборке удалять их)
      Program(paths, state) {
        // берем массив всех переданных в плагин атрибутов, которые будет выпиливать, и называем его forbidden
        const forbidden = state.opts.props || [];

        // метод, с помощью которого проходим по всем нодам дерева
        paths.traverse({
          // указываем тип ноды, которую хотим выпиливать (data-testid является JSXIdentifier)
          JSXIdentifier(current) {
            // получаем имя искомой ноды
            const nodeName = current.node.name;
            // чтоб не хардкодить такого вида условие (nodeName === "data-testid"), исп. более динамичный подход
            if (forbidden.includes(nodeName))
              // и удаляем этот атрибут
              current.parentPath.remove();
          },
        });
      },
    },
  };
}
