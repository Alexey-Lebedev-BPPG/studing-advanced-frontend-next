// функция, которая просто принимает название testId и возвращает подготовленную строку для сайпресс
export const selectByTestId = (testId: string) => `[data-testid="${testId}"]`;
