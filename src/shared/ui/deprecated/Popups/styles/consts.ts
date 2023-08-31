import cls from './popups.module.scss';
import { DropDownDirection } from '../../../../types/ui';

export const mapDirectionClass: Record<DropDownDirection, string> = {
  'bottom left': cls.menuBottomLeft,
  'bottom right': cls.menuBottomRight,
  'top left': cls.menuTopLeft,
  'top right': cls.menuTopRight,
};
