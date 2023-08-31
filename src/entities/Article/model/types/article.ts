import { User } from '@/entities/User';

export type ArticleSortFields = 'createdAt' | 'title' | 'views';

export type ArticleBlockType = 'CODE' | 'IMAGE' | 'TEXT';

export type ArticleType = 'ALL' | 'ECONOMICS' | 'IT' | 'SCIENCE';

export type ArticleView = 'BIG' | 'SMALL';

export interface ArticleBlockBase {
  id: string;
  type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
  code: string;
  type: 'CODE';
}

export interface ArticleImageBlock extends ArticleBlockBase {
  src: string;
  title: string;
  type: 'IMAGE';
}

export interface ArticleTextBlock extends ArticleBlockBase {
  paragraphs: string[];
  title?: string;
  type: 'TEXT';
}

export type ArticleBlock =
  | ArticleCodeBlock
  | ArticleImageBlock
  | ArticleTextBlock;

export interface Article {
  blocks: ArticleBlock[];
  createdAt: string;
  id: string;
  img: string;
  subtitle: string;
  title: string;
  type: ArticleType[];
  user: User;
  views: number;
}
