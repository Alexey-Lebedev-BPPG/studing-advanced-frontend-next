import clsPopover from './positions.module.css';
import { DropDownDirection, Margins } from '../types/ui';

export const mapDirectionClass: Record<DropDownDirection, string> = {
  'bottom left': clsPopover['menu-bottom-left'],
  'bottom right': clsPopover['menu-bottom-right'],
  'top left': clsPopover['menu-top-left'],
  'top right': clsPopover['menu-top-right'],
};

export const mapMarginsSize: Record<Margins, number> = {
  '0': 0, // 0px
  '2-x-l': 2, // 32px
  '3-x-l': 2.5, // 40px
  '4-x-l': 3, // 48px
  l: 1.25, // 20px
  m: 1, // 16px
  s: 0.75, // 12px
  'x-l': 1.5, // 24px
  'x-s': 0.5, // 8px
  'x-x-s': 0.25, // 4px
};
