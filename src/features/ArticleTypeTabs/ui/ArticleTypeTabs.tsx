import { useTranslations } from 'next-intl';
import { FC, memo, useCallback, useMemo } from 'react';
import { ArticleType } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { ITabItem, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

export interface IArticleTypeTabsProps {
  className?: string;
  onChangeType: (type: ArticleType) => void;
  selectedValue: ArticleType;
}

export const ArticleTypeTabs: FC<IArticleTypeTabsProps> = memo(props => {
  const { className, onChangeType, selectedValue } = props;

  const t = useTranslations();

  const tabs = useMemo<ITabItem<ArticleType>[]>(
    () => [
      { content: t('Все статьи'), value: 'ALL' },
      { content: t('Айти'), value: 'IT' },
      { content: t('Экономика'), value: 'ECONOMICS' },
      { content: t('Наука'), value: 'SCIENCE' },
    ],
    [t],
  );

  const onClickTab = useCallback(
    (newTab: ITabItem<ArticleType>) => onChangeType(newTab.value),
    [onChangeType],
  );

  return (
    <ToggleFeatures
      nameFeatures={'isAppRedesigned'}
      off={
        <TabsDeprecated
          className={classNames('', {}, [className])}
          tabs={tabs}
          selectedValue={selectedValue}
          onTabClick={onClickTab}
        />
      }
      on={
        <Tabs
          className={classNames('', {}, [className])}
          tabs={tabs}
          selectedValue={selectedValue}
          direction='column'
          onTabClick={onClickTab}
        />
      }
    />
  );
});
