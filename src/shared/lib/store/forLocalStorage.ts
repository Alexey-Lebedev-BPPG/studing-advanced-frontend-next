interface ForLocalStorage {
  key?: string;
  method: 'get' | 'set' | 'clear' | 'remove';
  value?: string;
}

export const forLocalStorage = (props: ForLocalStorage) => {
  const { key, method, value } = props;

  if (typeof window !== 'undefined') {
    if (method === 'get' && typeof key !== 'undefined')
      return localStorage.getItem(key);
    if (
      method === 'set' &&
      typeof key !== 'undefined' &&
      typeof value !== 'undefined'
    )
      localStorage.setItem(key, value);
    if (method === 'clear') localStorage.clear();
    if (method === 'remove' && typeof key !== 'undefined')
      return localStorage.removeItem(key);
  }
};
