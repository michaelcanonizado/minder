export const getLastWeekSundayDate = () => {
  const today = new Date();

  // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const dayOfWeek = today.getDay();

  // Make a copy of today's date
  const prevSunday = new Date(today);

  // Calculate how many days to subtract to get to the previous Sunday
  prevSunday.setDate(prevSunday.getDate() - dayOfWeek);

  // Set time to 11:59:59 PM
  prevSunday.setHours(23, 59, 59, 999);

  return prevSunday;
};
