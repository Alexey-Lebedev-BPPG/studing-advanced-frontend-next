'use client';

import { ArticleDetailsPage } from '@/pages-fsd/ArticleDetailsPage';

export default function ArticleDetails({
  params: { id },
}: {
  params: { id: string };
}) {
  return <ArticleDetailsPage id={id} />;
}
