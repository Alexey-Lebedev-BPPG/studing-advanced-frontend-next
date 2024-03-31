import { FC, memo, SVGProps } from 'react';
import cls from './Icon.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>;

interface IIconBaseProps extends SvgProps {
  // принимаем ссылку на свг
  Svg: FC<SVGProps<SVGSVGElement>>;
  className?: string;
}

interface NoneClickableIconProps extends IIconBaseProps {
  clickable?: false;
}

interface ClickableIconProps extends IIconBaseProps {
  clickable: true;
  onClick: () => void;
}

type IconProps = NoneClickableIconProps | ClickableIconProps;

// обертка для свг, которая будет задавать цвета
export const Icon: FC<IconProps> = memo(props => {
  const {
    className,
    clickable,
    height = 32,
    Svg,
    width = 32,
    ...otherProps
  } = props;

  const icon = (
    <Svg
      width={width}
      height={height}
      className={classNames(cls.icon, {}, [className])}
      {...otherProps}
      onClick={undefined}
    />
  );

  if (clickable)
    return (
      <button
        style={{ height, width }}
        type='button'
        className={cls.button}
        onClick={props.onClick}
      >
        {icon}
      </button>
    );

  return icon;
});
