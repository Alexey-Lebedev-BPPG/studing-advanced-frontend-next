import { FC, memo, useCallback } from 'react';
import cls from './Code.module.scss';
import { Button as ButtonDeprecated } from '../../../deprecated/Button';
import { Icon } from '../../Icon';
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';
import CopyIconNew from '@/shared/assets/icons/copy.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

interface ICodeProps {
  className?: string;
  text: string;
}

export const Code: FC<ICodeProps> = memo(props => {
  const { className, text } = props;

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <ToggleFeatures
      nameFeatures={'isAppRedesigned'}
      off={
        // pre позволяет сохранять пробелы и переносы для кода
        <pre className={classNames(cls.code, {}, [className])}>
          <ButtonDeprecated
            className={cls['copy-btn']}
            theme='clear'
            onClick={onCopy}
          >
            <CopyIcon className={cls['copy-icon']} />
          </ButtonDeprecated>
          <code>{text}</code>
        </pre>
      }
      on={
        // pre позволяет сохранять пробелы и переносы для кода
        <pre className={classNames(cls['code-redesigned'], {}, [className])}>
          <Icon
            clickable
            className={cls['copy-btn']}
            Svg={CopyIconNew}
            onClick={onCopy}
          />
          <code>{text}</code>
        </pre>
      }
    />
  );
});
