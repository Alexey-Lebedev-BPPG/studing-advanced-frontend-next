import { FC, memo } from 'react';
import cls from './ArticleEditForm.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface IArticleEditFormProps {
  className?: string;
}

const ArticleEditForm: FC<IArticleEditFormProps> = memo(props => {
  const { className } = props;

  return (
    <div className={classNames(cls['article-edit-form'], {}, [className])}>
      <div />
    </div>
  );
});

export default ArticleEditForm;
