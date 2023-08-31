// один из вариантов вычисления, когда сайт открыт на мобильной версии, можно использовать библу react-device-detect. Но лучше использовать функцию detectDevice как здесь
export const useDetectDevice = () => {
  const isMobile = window.matchMedia;
  if (!isMobile) return false;

  const device = isMobile('(pointer:coarse)');
  return device.matches;
};
