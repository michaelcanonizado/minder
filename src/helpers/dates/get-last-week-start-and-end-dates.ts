export const getLastWeekStartAndEndDates = () => {
  // Function will get the start and end dates of last week. Start of the week will be: Monday, 12:00AM, and the end of the week will be: Sunday, 11:59PM

  const now = new Date();

  // Get the current day of the week (0 for Sunday, 1 for Monday, etc.)
  const currentDayOfWeek = now.getDay();

  // Calculate the start date of last week
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - currentDayOfWeek - 6);
  startDate.setHours(0, 0, 0, 0); // Set time to 12:00AM

  // Calculate the end date of last week
  const endDate = new Date(now);
  endDate.setDate(now.getDate() - currentDayOfWeek);
  endDate.setHours(23, 59, 59, 999); // Set time to 11:59PM

  // If today is Sunday (currentDayOfWeek === 0), offset the dates
  if (currentDayOfWeek === 0) {
    startDate.setDate(startDate.getDate() - 7);
    endDate.setDate(endDate.getDate() - 7);
  }

  return { startDate, endDate };
};
