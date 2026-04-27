export const getNBADate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);

  const formatter = new Intl.DateTimeFormat('en-CA', { 
    timeZone: 'America/New_York' 
  });
  
  return formatter.format(date);
};