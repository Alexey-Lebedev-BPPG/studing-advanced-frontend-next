'use client';

import { FC } from 'react';
import { Flex, IFlexProps } from '../Flex/Flex';

type IVStackProps = Omit<IFlexProps, 'direction'>;

export const VStack: FC<IVStackProps> = props => {
  const { align = 'start' } = props;

  return <Flex {...props} direction='column' align={align} />;
};
