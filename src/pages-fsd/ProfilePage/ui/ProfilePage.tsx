import { FC } from 'react';
import cls from './ProfilePage.module.scss';
import { EditableProfileCard } from '@/features/EditableProfileCard';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useQueryParams } from '@/shared/lib/hooks/useQueryParams';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Page } from '@/widgets/Page';

interface IProfilePageProps {
  className?: string;
}

export const ProfilePage: FC<IProfilePageProps> = props => {
  const { className } = props;

  const { id } = useQueryParams();

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
