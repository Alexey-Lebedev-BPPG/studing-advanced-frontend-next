export const getQueryParams = (params: OptionalRecord<string, string>) => {
  // создаем параметры из урл
  const searchParams = new URLSearchParams(window.location.search);

  // проходимся по переданным параметрам и добавляем их в реальные параметры
  Object.entries(params).forEach(([name, value]) => {
    if (value !== undefined) searchParams.set(name, value);
  });

  return `?${searchParams.toString()}`;
};

export const addQueryParams = (params: OptionalRecord<string, string>) => {
  // добавляем параметры в строку запроса
  window.history.pushState(null, '', getQueryParams(params));
};
