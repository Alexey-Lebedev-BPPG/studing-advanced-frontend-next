'use client';

import { ProfilePage } from '@/pages-fsd/ProfilePage';

export default function Profile({
  params: { id },
}: {
  params: { id: string };
}) {
  return <ProfilePage id={id} />;
}
