'use client';

import { FC, ReactNode } from 'react';
import { hotjar } from 'react-hotjar';

interface IHotjarProviderProps {
  children: ReactNode;
}

export const HotjarProvider: FC<IHotjarProviderProps> = props => {
  const { children } = props;

  const hotjarId = Number(process.env.NEXT_PUBLIC_HOTJAR_ID) || 0;
  const hotjarSv = Number(process.env.NEXT_PUBLIC_HOTJAR_SV) || 0;

  const isProd =
    process.env.NEXT_PUBLIC_APP_ENV === 'prod' ||
    process.env.NEXT_PUBLIC_APP_ENV === 'stage';

  isProd && hotjar.initialize({ hjid: hotjarId, hjsv: hotjarSv });

  return children;
};
