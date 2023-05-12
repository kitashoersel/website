const monthsShort = new Map<string, string[]>([
  ['de', 'Jan_Feb_März_Apr_Mai_Juni_Juli_Aug_Sept_Okt_Nov_Dez'.split('_')],
  ['en', 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_')],
]);

export const shortDate = (dateString: string, locale: string) => {
  const date = new Date(dateString);
  return `${date.getDay()} ${(monthsShort.get(locale) ?? monthsShort.get('de')!)[date.getMonth()]}`;
};
