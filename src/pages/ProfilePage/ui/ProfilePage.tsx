'use client';

import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import cls from './ProfilePage.module.scss';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Page } from '@/widgets/Page';

interface IProfilePageProps {
  className?: string;
}

const ProfilePage: FC<IProfilePageProps> = props => {
  const { className } = props;

  const searchParams = useSearchParams();

  const id = searchParams?.get('id');

  return (
    <Page
      data-testid='ProfilePage'
      className={classNames(cls.profilePage, {}, [className])}
    >
      <VStack max gap='16'>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;
