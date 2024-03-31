import { ComponentProps, ElementType, ReactNode, useMemo } from 'react';
import cls from './anyText.module.css';
import { classNames } from '@/shared/lib/classNames/classNames';

type Variants =
  | 'H1'
  | 'H2'
  | 'H3'
  | 'Subheading'
  | 'BodyL'
  | 'BodyM'
  | 'Table'
  | 'Button'
  | 'Button-CL'
  | 'Input1'
  | 'Input2';

const selectedVariantClass: Record<Variants, string> = {
  BodyL: cls.BodyL,
  BodyM: cls.BodyM,
  Button: cls.Button,
  'Button-CL': cls['Button-CL'],
  H1: cls.H1,
  H2: cls.H2,
  H3: cls.H3,
  Input1: cls.Input1,
  Input2: cls.Input2,
  Subheading: cls.Subheading,
  Table: cls.Table,
};

type TagName =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'strong'
  | 'em'
  | 'label'
  | 'sub';

type AnyTextOwnProps<T extends ElementType = ElementType> = {
  as?: T;
  children?: ReactNode;
  variant: Variants;
};

type IAnyTextProps<T extends ElementType> = AnyTextOwnProps<T> &
  Omit<ComponentProps<T>, keyof AnyTextOwnProps>;

export const AnyText = <T extends ElementType = TagName>(
  props: IAnyTextProps<T>,
) => {
  const { as = 'p', children, className, variant, ...otherProps } = props;

  const TagName = as;

  const currentClass = useMemo(
    () => classNames(cls.text, {}, [className, selectedVariantClass[variant]]),
    [className, variant],
  );

  return (
    <TagName className={currentClass} {...otherProps}>
      {children}
    </TagName>
  );
};
