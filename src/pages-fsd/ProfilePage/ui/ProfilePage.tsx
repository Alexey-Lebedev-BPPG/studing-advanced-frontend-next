import { FC } from 'react';
import cls from './ProfilePage.module.scss';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Page } from '@/widgets/Page';

interface IProfilePageProps {
  className?: string;
  id: string;
}

export const ProfilePage: FC<IProfilePageProps> = props => {
  const { className, id } = props;

  return (
    <Page
      data-testid='ProfilePage'
      className={classNames(cls['profile-page'], {}, [className])}
    >
      <VStack max gap='16'>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
};
