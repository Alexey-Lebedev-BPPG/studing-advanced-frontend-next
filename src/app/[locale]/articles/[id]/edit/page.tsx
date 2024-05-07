'use client';

import { ArticleEditPage } from '@/pages-fsd/ArticleEditPage';

export default function ArticleEdit({
  params: { id },
}: {
  params: { id: string };
}) {
  return <ArticleEditPage id={id} />;
}
