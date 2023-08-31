import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
import cls from './Flex.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type FlexJustify = 'start' | 'center' | 'end' | 'between';
type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
type FlexWrap = 'nowrap' | 'wrap';
type FlexGap = '4' | '8' | '16' | '24' | '32';

// делаем сопоставлении пропса с классом, который хотим потом повесить
const justifyClasses: Record<FlexJustify, string> = {
  between: cls.justifyBetween,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  start: cls.justifyStart,
};

const alignClasses: Record<FlexAlign, string> = {
  center: cls.alignCenter,
  end: cls.alignEnd,
  start: cls.alignStart,
};

const directionClasses: Record<FlexDirection, string> = {
  column: cls.directionColumn,
  row: cls.directionRow,
};

const gapClasses: Record<FlexGap, string> = {
  4: cls.gap4,
  8: cls.gap8,
  16: cls.gap16,
  24: cls.gap24,
  32: cls.gap32,
};

// добавляем тип, чтоб расширить пропсы всеми свойствами дивов
type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface IFlexProps extends DivProps {
  align?: FlexAlign;
  children: ReactNode;
  className?: string;
  direction: FlexDirection;
  gap?: FlexGap;
  justify?: FlexJustify;
  max?: boolean;
  wrap?: FlexWrap;
}

export const Flex: FC<IFlexProps> = props => {
  const {
    align = 'center',
    children,
    className,
    direction = 'row',
    gap,
    justify = 'start',
    max,
    wrap = 'nowrap',
    ...otherProps
  } = props;

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap],
    cls[wrap],
  ];

  const mods = {
    [cls.max]: max,
  };

  return (
    <div className={classNames(cls.flex, mods, classes)} {...otherProps}>
      {children}
    </div>
  );
};
