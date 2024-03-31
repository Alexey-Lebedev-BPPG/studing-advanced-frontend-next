interface IDeclensionOfNounsProps {
  lang?: 'ru' | 'en-US' | 'en-UK' | string;
  number: number;
  numberOptions?: Intl.NumberFormatOptions;
}

export const declensionOfNouns = (props: IDeclensionOfNounsProps) => {
  const { lang, number, numberOptions } = props;

  // for example
  // const defaultOptions: Intl.NumberFormatOptions = {
  //   style: 'unit',
  //   unit: 'meter', // value | value-per-value
  //   unitDisplay: 'long',
  // };

  // Доступные значения для unit
  //  acre
  // bit
  // byte
  // celsius
  // centimeter
  // day
  // degree
  // fahrenheit
  // fluid-ounce
  // foot
  // gallon
  // gigabit
  // gigabyte
  // gram
  // hectare
  // hour
  // inch
  // kilobit
  // kilobyte
  // kilogram
  // kilometer
  // liter
  // megabit
  // megabyte
  // meter
  // microsecond
  // mile
  // mile-scandinavian
  // milliliter
  // millimeter
  // millisecond
  // minute
  // month
  // nanosecond
  // ounce
  // percent
  // petabyte
  // pound
  // second
  // stone
  // terabit
  // terabyte
  // week
  // yard
  // year

  const formatter = Intl.NumberFormat(lang, numberOptions);

  return formatter.format(number);
};
