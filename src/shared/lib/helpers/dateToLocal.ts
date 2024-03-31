interface IDateToLocalProps {
  date: Date;
  dateOptions?: Intl.DateTimeFormatOptions;
  lang?: 'ru' | 'en-US' | 'en-UK' | string;
}

export const dateToLocal = (props: IDateToLocalProps) => {
  const { date = new Date(), dateOptions, lang = navigator.language } = props;

  // прокинем опции
  const functionDateOptions: Intl.DateTimeFormatOptions = {
    // // 'numeric' - число (8/5/2000)
    // // '2-digit' - двойное число (08/5/2000)
    // day: 'numeric',
    // // 'long' - полная (06.10.2000 г. от Рождества Христова)
    // // 'short' - короткое слово (06.10.2000 н. э.)
    // // 'narrow' - первая буква (06.10.2000 г. н.э.)
    // era: 'long',
    // // 'numeric' - число (7 декабря 2023 г. н. э. в 00)
    // // '2-digit' - двойное число (7 декабря 2023 г. н. э. в 00)
    // hour: 'numeric',
    // // 12-часовой формат
    // hour12: true,
    // // 'numeric' - число (7 декабря 2023 г. н. э. в 00:09)
    // // '2-digit' - двойное число (7 декабря 2023 г. н. э. в 00:09)
    // minute: 'numeric',
    // // 'numeric' - число (8/5/2000)
    // // '2-digit' - двойное число (8/05/2000)
    // // 'long' - слово (August 5,2000)
    // // 'short' - короткое слово (Aug 5,2000)
    // // 'narrow' - первая буква (A 5,2000)
    // month: 'long',
    // // 'numeric' - число (7 декабря 2023 г. н. э. в 00:09:01)
    // // '2-digit' - двойное число (7 декабря 2023 г. н. э. в 00:09:01)
    // second: 'numeric',
    // // 'long' - (06.10.2000 в Индокитай)
    // // 'longGeneric' - (06.10.2000 в Индокитай)
    // // 'longOffset' - (06.10.2000 в GMT+07:00)
    // // 'short' - (06.10.2000 в GMT+7)
    // // 'shortGeneric' - (06.10.2000 в Вьетнам)
    // // 'shortOffset' - (06.10.2000 в GMT+7)
    // timeZone: 'long',
    // // 'long' - полная (Пятница,06.10.2000)
    // // 'short' - короткое слово (Пт,06.10.2000)
    // // 'narrow' - первая буква (П,06.10.2000)
    // weekday: 'long',
    // // 'numeric' - число (8/5/2000)
    // // '2-digit' - двойное число (8/5/00)
    // year: 'numeric',
  };

  const intlDate = new Intl.DateTimeFormat(
    lang,
    dateOptions || functionDateOptions,
  );

  return intlDate.format(date);
};
