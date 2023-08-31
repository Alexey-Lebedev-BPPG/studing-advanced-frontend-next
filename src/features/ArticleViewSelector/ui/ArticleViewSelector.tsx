'use client';

import { FC } from 'react';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';
import ListIcon from '@/shared/assets/icons/burger.svg';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';

export interface IArticleViewSelectorProps {
  className?: string;
  onViewClick?: (view: ArticleView) => void;
  view: ArticleView;
}

const viewTypes = [
  {
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      off: () => TiledIconDeprecated,
      on: () => TiledIcon,
    }),
    view: 'SMALL',
  },
  {
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      off: () => ListIconDeprecated,
      on: () => ListIcon,
    }),
    view: 'BIG',
  },
];

export const ArticleViewSelector: FC<IArticleViewSelectorProps> = props => {
  const { className, onViewClick, view } = props;

  // делаем замыкание (внешняя функция принимает отображение, а внутренняя уже срабатывает как событие)
  const onClick = (newView: ArticleView) => () => onViewClick?.(newView);

  return (
    <ToggleFeatures
      nameFeatures={'isAppRedesigned'}
      off={
        <div className={classNames(cls.articleViewSelector, {}, [className])}>
          {viewTypes.map(viewType => (
            <ButtonDeprecated
              key={viewType.view}
              theme='clear'
              onClick={onClick(viewType.view as ArticleView)}
            >
              <IconDeprecated
                src={viewType.icon}
                width={24}
                height={24}
                className={classNames(
                  '',
                  { [cls.notSelected]: viewType.view !== view },
                  [],
                )}
              />
            </ButtonDeprecated>
          ))}
        </div>
      }
      on={
        <Card
          border='round'
          className={classNames(cls.articleViewSelectorRedesigned, {}, [
            className,
            cls.getHStach,
          ])}
        >
          {viewTypes.map(viewType => (
            <Icon
              key={viewType.view}
              clickable
              src={viewType.icon}
              width={24}
              height={24}
              className={classNames(
                '',
                { [cls.notSelected]: viewType.view !== view },
                [],
              )}
              onClick={onClick(viewType.view as ArticleView)}
            />
          ))}
        </Card>
      }
    />
  );
};
