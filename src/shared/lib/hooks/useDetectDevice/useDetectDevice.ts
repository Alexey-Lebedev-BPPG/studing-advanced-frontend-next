// один из вариантов вычисления, когда сайт открыт на мобильной версии, можно использовать библу react-device-detect. Но лучше использовать функцию detectDevice как здесь (https://github.com/jepser/use-match-media/blob/master/src/use-match-media.ts)
export const useDetectDevice = () => {
  const isMobile = window.matchMedia;
  if (!isMobile) return false;

  const device = isMobile('(pointer:coarse)');
  return device.matches;
};

// другой вариант
// export const useDetectDevice = () => {
//   const currentMatchMedia = window.matchMedia;

//   const deviceTablet = currentMatchMedia(
//     '(width < 1440px) and (width > 767px)',
//   );
//   const isTablet = deviceTablet.matches;

//   const deviceMobile = currentMatchMedia('(width < 768px)');
//   const isMobile = deviceMobile.matches;

//   return {
//     isDesktop: !isMobile && !isTablet,
//     isMobile,
//     isTablet,
//   };
// };
// здесь мы задаем параметры и вызываем хук где необходимо, доставая необходимые параметры
