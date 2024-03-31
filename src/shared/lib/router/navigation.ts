import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['ru', 'en'] as const;
export const localePrefix = 'always';

export const {
  Link: AppLink,
  redirect: redirectApp,
  usePathname: useAppPathname,
  useRouter: useAppRouter,
  permanentRedirect: permanentAppRedirect,
} = createSharedPathnamesNavigation({ localePrefix, locales });
