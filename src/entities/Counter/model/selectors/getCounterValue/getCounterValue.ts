import { buildSelector } from '@/shared/lib/store';
// import { createSelector } from "@reduxjs/toolkit";

// здесь воспользуемся реселектом (через createSelector). Это позволит объединить несколько селекторов и получить готовый результат из них все. Данные подход мемоизирует значения и изменятся селекторы только в том случае, если изменятся значения
// Пример:
// const selectShopItems = (state) => state.shop.items;
// const selectTaxPercent = (state) => state.shop.taxPercent;

// const selectSubtotal = createSelector(selectShopItems, items =>
//   items.reduce((subtotal, item) => subtotal + item.value, 0)
// )

// const selectTax = createSelector(
//   selectSubtotal,
//   selectTaxPercent,
//   (subtotal, taxPercent) => subtotal * (taxPercent / 100)
// );
// комбинировать селекторы можно в любом количестве

// export const getCounterValue = createSelector(
//   // указываем селектор, который хотим переиспользовать
//   getCounter,
//   // вызываем колбэк, которая параметром принимает результат выполнения вышеуказанных селекторов
//   (counter) => counter.value
// );

// также можно использовать кастомную функцию, которая возвращает хук для вытягивания данных(аналог useSelector) и сам селект
export const [useCounterValue, getCounterValue] = buildSelector(
  state => state.counter.value,
);
