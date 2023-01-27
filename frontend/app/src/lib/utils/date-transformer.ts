import { baseLocale, isLocale } from '$lib/i18n/i18n-util';

const monthsShort = {
  de: 'Jan_Feb_März_Apr_Mai_Juni_Juli_Aug_Sept_Okt_Nov_Dez'.split('_'),
  en: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
};

export const shortDate = (dateString: string, localeString: string) => {
  const locale = isLocale(localeString) ? localeString : baseLocale;
  const date = new Date(dateString);
  return `${date.getDay()} ${monthsShort[locale][date.getMonth()]}`;
};
