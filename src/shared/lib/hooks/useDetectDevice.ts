export const useDetectDevice = () => {
  if (!window || !window.matchMedia)
    return {
      isDesktop: false,
      isMobile: false,
      isTablet: false,
      isTabletHorizontal: false,
    };

  const currentMatchMedia = window.matchMedia;

  const deviceTabletHorizontal = currentMatchMedia(
    '(width < 1440px) and (width > 1024px)',
  );
  const isTabletHorizontal = deviceTabletHorizontal.matches;

  const deviceTablet = currentMatchMedia(
    '(width <= 1024px) and (width >= 768px)',
  );
  const isTablet = deviceTablet.matches;

  const deviceMobile = currentMatchMedia('(width < 768px)');
  const isMobile = deviceMobile.matches;

  return {
    isDesktop: !isMobile && !isTablet && !isTabletHorizontal,
    isMobile,
    isTablet,
    isTabletHorizontal,
  };
};
