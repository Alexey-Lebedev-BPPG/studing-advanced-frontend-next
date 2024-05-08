import { FC, memo } from 'react';
import cls from './Text.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type TextTheme = 'error' | 'inverted' | 'primary';

type TextAlign = 'center' | 'left' | 'right';

type TextSize = 'l' | 'm' | 's';

type HeaderTagType = 'h1' | 'h2' | 'h3';

// маппер, который определяет тег в зависимости от размера
const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  l: 'h1',
  m: 'h2',
  s: 'h3',
};

const mapSizeClass: Record<TextSize, string> = {
  l: cls['size-l'],
  m: cls['size-m'],
  s: cls['size-s'],
};

interface ITextProps {
  align?: TextAlign;
  className?: string;
  'data-testid'?: string;
  size?: TextSize;
  text?: string | null;
  theme?: TextTheme;
  title?: string | null;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Text: FC<ITextProps> = memo(props => {
  const {
    align = 'left',
    className,
    'data-testid': dataTestId = 'Text',
    size = 'm',
    text,
    theme = 'primary',
    // ввиду того, что такое свойство не позволительно деструктуризировать, нужно переименовать его
    title,
  } = props;

  const HeaderTag = mapSizeToHeaderTag[size];

  return (
    <div
      className={classNames(cls['text-wrapper'], {}, [
        className,
        mapSizeClass[size],
        // @ts-ignore
        cls[theme],
        cls[align],
        // @ts-ignore
        cls[size],
      ])}
    >
      {!!title && (
        <HeaderTag className={cls.title} data-testid={`${dataTestId}.Header`}>
          {title}
        </HeaderTag>
      )}
      {!!text && (
        <p className={cls.text} data-testid={`${dataTestId}.Paragraph`}>
          {text}
        </p>
      )}
    </div>
  );
});
