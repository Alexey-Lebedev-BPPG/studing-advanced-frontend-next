import { ReactNode } from 'react';

export interface ILanguageProviderProps {
  children: ReactNode;
  locale: string;
}

interface City {
  name: string;
  names: string;
}

interface Continent {
  code: string;
  geoname_id: number;
  names: string;
  name: string;
}

interface LanguagesEntity {
  iso_code: string;
  name: string;
  name_native: string;
}

interface Country {
  geoname_id: number;
  iso_code: string;
  names: string;
  name: string;
  name_native: string;
  phone_code: string;
  capital: string;
  currency: string;
  flag: string;
  languages?: LanguagesEntity[] | null;
}

interface Position {
  latitude: number;
  longitude: number;
}

interface DatasourceEntity {
  name: string;
  attribution: string;
  license: string;
}

export interface NewLocation {
  city: City;
  continent: Continent;
  country: Country;
  location: Position;
  subdivisions?: string[] | null;
  state: string;
  datasource?: DatasourceEntity[] | null;
  ip: string;
}
