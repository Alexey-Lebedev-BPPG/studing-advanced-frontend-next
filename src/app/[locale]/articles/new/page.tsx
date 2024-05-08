'use client';

import { ArticleEditPage } from '@/pages-fsd/ArticleEditPage';

export default function ArticleCreate({
  params: { id },
}: {
  params: { id: string };
}) {
  return <ArticleEditPage id={id} />;
}
