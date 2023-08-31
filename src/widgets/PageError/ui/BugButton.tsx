'use client';

import { FC, useEffect, useState } from 'react';
import { Button } from '@/shared/ui/deprecated/Button';

// компонент для имитации ошибки в приложении
export const BugButton: FC = () => {
  const [error, setError] = useState(false);

  const onThrow = () => setError(true);

  useEffect(() => {
    if (error) throw new Error();
  }, [error]);

  return <Button onClick={onThrow}>{'throw Error'}</Button>;
};
