/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
import { useSearchParams } from 'next/navigation';

export const useQueryParams = () => {
  const location = useSearchParams();
  const searchParams = new URLSearchParams(location || '');
  const result: any = {};

  for (const param of searchParams) result[param[0]] = param[1];

  return result;
};
