export const getNBADate = () => {
  const formatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' });
  return formatter.format(new Date());
};