import { FC } from 'react';
import { Flex, IFlexProps } from '../Flex/Flex';

type IHStackProps = Omit<IFlexProps, 'direction'>;

export const HStack: FC<IHStackProps> = props => (
  <Flex direction='row' {...props} />
);
