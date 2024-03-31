import cls from './popups.module.css';
import { DropDownDirection } from '../../../../types/ui';

export const mapDirectionClass: Record<DropDownDirection, string> = {
  'bottom left': cls['menu-bottom-left'],
  'bottom right': cls['menu-bottom-right'],
  'top left': cls['menu-top-left'],
  'top right': cls['menu-bottom-right'],
};
