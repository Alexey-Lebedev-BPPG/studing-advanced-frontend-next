'use client';

import { FC } from 'react';
import cls from './ArticleEditForm.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface IArticleEditFormProps {
  className?: string;
}

const ArticleEditForm: FC<IArticleEditFormProps> = props => {
  const { className } = props;

  return (
    <div className={classNames(cls.articleEditForm, {}, [className])}>
      <div />
    </div>
  );
};

export default ArticleEditForm;
