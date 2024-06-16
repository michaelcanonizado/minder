export const getLastWeekDateLimit = () => {
  // Get's the Date of last week sunday

  // Create a new date object for the current date
  const currentDate = new Date();

  // Get the current day of the week (0 for Sunday, 1 for Monday, etc.)
  const currentDay = currentDate.getDay();

  // Calculate the date of the previous Sunday
  const diffToLastSunday = currentDay === 0 ? 7 : currentDay;
  const lastSunday = new Date(currentDate);
  lastSunday.setDate(currentDate.getDate() - diffToLastSunday);

  // Set the time to 11:59 PM of the previous Sunday
  lastSunday.setHours(23, 59, 0, 0);

  return lastSunday;
};
