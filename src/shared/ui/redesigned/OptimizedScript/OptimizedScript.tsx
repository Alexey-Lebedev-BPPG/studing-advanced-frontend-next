import Script, { ScriptProps } from 'next/script';
import { FC } from 'react';

interface OptimizedScriptProps extends ScriptProps {}

export const OptimizedScript: FC<OptimizedScriptProps> = props => {
  const { onError, onLoad } = props;

  return (
    <Script
      // При использовании strategyprop в next/script компоненте, можно использовать три подхода к загрузке скрипта:
      // afterInteractive — скрипт будет загружен на стороне клиента после того, как страница станет интерактивной;
      // beforeInteractive — скрипт будет загружен на стороне сервера до того, как будет выполнен JavaScript;
      // lazyOnload — скрипт будет загружен после загрузки всех других ресурсов.
      onError={err => {
        console.error('Error', err);
        onError?.(err);
      }}
      onLoad={event => {
        onLoad?.(event);
      }}
      {...props}
    />
  );
};
