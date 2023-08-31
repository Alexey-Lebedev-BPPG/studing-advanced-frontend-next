import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface SidebarItemType {
  // ввиду того, что компоненты пишутся с большой буквы, поле icon пишем также с большой буквы
  // Icon: VFC<SVGProps<SVGSVGElement>>;
  Icon: string | StaticImport;
  authOnly?: boolean;
  path: string;
  text: string;
}
