import { useEffect } from 'react';

export const useChangeMetaTags = (name: string, image: string) => {
  useEffect(() => {
    const path = window.location.href;
    const head = document.getElementsByTagName('head')[0];

    const metaCard = document.createElement('meta');
    metaCard.setAttribute('name', 'twitter:card');
    metaCard.setAttribute('content', 'summary');

    const metaSite = document.createElement('meta');
    metaSite.setAttribute('name', 'twitter:site');
    metaSite.setAttribute('content', '@Collector_Crypt');

    const metaCreator = document.createElement('meta');
    metaCreator.setAttribute('name', 'twitter:creator');
    metaCreator.setAttribute('content', '@Collector_Crypt');

    const metaOgURL = document.createElement('meta');
    metaOgURL.setAttribute('property', 'og:url');
    metaOgURL.setAttribute('content', path);

    const metaOgTitle = document.createElement('meta');
    metaOgTitle.setAttribute('property', 'og:title');
    metaOgTitle.setAttribute('content', name);

    const metaOgDescription = document.createElement('meta');
    metaOgDescription.setAttribute('property', 'og:description');
    metaOgDescription.setAttribute('content', '');

    const metaOgImage = document.createElement('meta');
    metaOgImage.setAttribute('property', 'og:image');
    metaOgImage.setAttribute('content', image);

    head.append(
      metaCard,
      metaSite,
      metaCreator,
      metaOgURL,
      metaOgTitle,
      metaOgDescription,
      metaOgImage,
    );

    return () => {
      head.removeChild(metaCard);
      head.removeChild(metaSite);
      head.removeChild(metaCreator);
      head.removeChild(metaOgURL);
      head.removeChild(metaOgTitle);
      head.removeChild(metaOgDescription);
      head.removeChild(metaOgImage);
    };
  }, [image, name]);
};
