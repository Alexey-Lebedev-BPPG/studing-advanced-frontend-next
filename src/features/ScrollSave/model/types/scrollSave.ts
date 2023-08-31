// строка - адрес страницы, число - значение скролла на этой странице
export type ScrollSchema = Record<string, number>;

export interface ScrollSaveSchema {
  scroll: ScrollSchema;
}
