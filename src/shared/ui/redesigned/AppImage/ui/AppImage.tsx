import NextImage, { ImageProps } from 'next/image';
import { FC, ReactElement, memo, useState } from 'react';

export interface IAppImageProps extends ImageProps {
  className?: string;
  // компонент для отрисовки при ошибке загрузки
  errorFallback?: ReactElement;
  // компонент для отрисовки при загрузке
  fallback?: ReactElement;
}

export const AppImage: FC<IAppImageProps> = memo(props => {
  const {
    alt = 'Image',
    className,
    errorFallback,
    fallback,
    src,
    ...otherProps
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  // если при загрузке произошла ошибка
  const [hasError, setHasError] = useState(false);

  // // используем useLayoutEffect, чтоб действие синхронно происходило перед вмонтированием компонента
  // useLayoutEffect(() => {
  //   // создаем изображение. В этот момент будет происходить фоновая подгрузка изображения
  //   const img = new Image();
  //   // @ts-ignore
  //   img.src = src || '';
  //   // когда изображение подгрузилось, меняем флаг на false
  //   img.onload = () => setIsLoading(false);
  //   img.onerror = () => {
  //     setIsLoading(false);
  //     setHasError(true);
  //   };
  // }, [src]);

  if (isLoading && fallback) return fallback;

  if (hasError && errorFallback) return errorFallback;

  return (
    <NextImage className={className} src={src} alt={alt} {...otherProps} />
  );
});
