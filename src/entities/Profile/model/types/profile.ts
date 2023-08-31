import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

export interface Profile {
  age?: number;
  avatar?: string;
  city?: string;
  country?: Country;
  currency?: Currency;
  first?: string;
  id?: string;
  lastname?: string;
  username?: string;
}
