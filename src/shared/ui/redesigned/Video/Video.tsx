import { FC, SourceHTMLAttributes, VideoHTMLAttributes, memo } from 'react';
import cls from './Video.module.css';
import { classNames } from '@/shared/lib/classNames/classNames';

interface IVideo
  extends VideoHTMLAttributes<HTMLVideoElement>,
    Pick<SourceHTMLAttributes<HTMLSourceElement>, 'type'> {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  width?: number | string;
  height?: number | string;
  position?: 'absolute' | 'relative' | 'static' | 'fixed';
}

export const Video: FC<IVideo> = memo(props => {
  const {
    className,
    src,
    left,
    top,
    width,
    height,
    right,
    bottom,
    position,
    loop = true,
    autoPlay = true,
    muted = true,
    type = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
    ...otherProps
  } = props;

  return (
    <video
      muted={muted}
      loop={loop}
      autoPlay={autoPlay}
      width={width}
      height={height}
      className={classNames(cls.video, {}, [className])}
      style={{ bottom, left, position, right, top }}
      {...otherProps}
    >
      <source src={src} type={type} />
    </video>
  );
});
