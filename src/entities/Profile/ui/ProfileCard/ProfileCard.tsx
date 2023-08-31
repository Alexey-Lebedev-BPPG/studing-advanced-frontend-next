'use client';

import { FC } from 'react';
import {
  IProfileCardProps,
  ProfileCardDeprecated,
  ProfileCardDeprecatedError,
  ProfileCardDeprecatedSkeleton,
} from '../ProfileCardDeprecated/ProfileCardDeprecated';
import {
  ProfileCardRedesigned,
  ProfileCardRedesignedError,
  ProfileCardRedesignedSkeleton,
} from '../ProfileCardRedesigned/ProfileCardRedesigned';
import { ToggleFeatures } from '@/shared/lib/features';

export const ProfileCard: FC<IProfileCardProps> = props => {
  const { error, isLoading } = props;

  if (isLoading)
    return (
      <ToggleFeatures
        nameFeatures={'isAppRedesigned'}
        off={<ProfileCardDeprecatedSkeleton />}
        on={<ProfileCardRedesignedSkeleton />}
      />
    );

  if (error)
    return (
      <ToggleFeatures
        nameFeatures={'isAppRedesigned'}
        off={<ProfileCardDeprecatedError />}
        on={<ProfileCardRedesignedError />}
      />
    );

  return (
    <ToggleFeatures
      nameFeatures={'isAppRedesigned'}
      off={<ProfileCardDeprecated {...props} />}
      on={<ProfileCardRedesigned {...props} />}
    />
  );
};
