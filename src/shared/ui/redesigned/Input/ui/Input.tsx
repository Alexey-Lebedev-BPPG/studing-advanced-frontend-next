import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  ReactNode,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import cls from './Input.module.scss';
import { HStack } from '../../Stack';
import { Text } from '../../Text';
import { classNames } from '@/shared/lib/classNames/classNames';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly' | 'size'
>;

type InputSize = 's' | 'm' | 'l';

interface IInputProps extends HTMLInputProps {
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  autofocus?: boolean;
  className?: string;
  label?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
  size?: InputSize;
  value?: string | number;
}

export const Input: FC<IInputProps> = memo(props => {
  const {
    addonLeft,
    addonRight,
    autofocus,
    className,
    label,
    onChange,
    placeholder,
    readonly,
    size = 'm',
    type = 'text',
    value,
    ...otherProps
  } = props;

  const ref = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // вызываем функцию только тогда, когда она была передана
    onChange?.(event.target.value);
  };

  const onBlurHandler = () => setIsFocused(false);
  const onFocusHandler = () => setIsFocused(true);

  const mods = {
    [cls.readonly]: readonly,
    [cls.focused]: isFocused,
    [cls['with-addon-left']]: Boolean(addonLeft),
    [cls['with-addon-right']]: Boolean(addonRight),
  };

  // делаем автофокус при открытии
  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
    return () => setIsFocused(false);
  }, [autofocus]);

  const input = (
    <div
      className={classNames(cls['input-wrapper'], mods, [className, cls[size]])}
    >
      {!!addonLeft && <div className={cls['addon-left']}>{addonLeft}</div>}
      <input
        ref={ref}
        type={type}
        value={value}
        className={cls.input}
        readOnly={readonly}
        placeholder={placeholder}
        onChange={onChangeHandler}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        {...otherProps}
      />
      {!!addonRight && <div className={cls['addon-right']}>{addonRight}</div>}
    </div>
  );

  if (label)
    return (
      <HStack max gap='8'>
        <Text text={label} />
        {input}
      </HStack>
    );

  return input;
});
