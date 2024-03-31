import { useLocale } from 'next-intl';
import { useLayoutEffect } from 'react';

export const useChangeBaseTags = () => {
  const language = useLocale();

  useLayoutEffect(() => {
    document.title = language === 'ru' ? 'заголовок' : 'title';

    const title = document.getElementsByName('twitter:title')[0];
    title.setAttribute('content', language === 'ru' ? 'заголовок' : 'title');

    const description = document.getElementsByName('twitter:description')[0];
    description.setAttribute(
      'content',
      language === 'ru' ? 'описание' : 'description',
    );
  }, [language]);
};
