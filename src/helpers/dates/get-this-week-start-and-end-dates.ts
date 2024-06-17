export const getThisWeekStartAndEndDates = () => {
  const now = new Date();
  // Get current day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const today = now.getDay();

  // Calculate the start date of the current week (Monday)
  const startDate = new Date(now);
  // Adjust when today is Sunday
  startDate.setDate(now.getDate() - today + (today === 0 ? -6 : 1));
  // Set time to 12:00 AM
  startDate.setHours(0, 0, 0, 0);

  // Calculate the end date of the current week (Sunday)
  const endDate = new Date(startDate);
  // Add 6 days to get to Sunday of the current week
  endDate.setDate(startDate.getDate() + 6);
  // Set time to 11:59 PM
  endDate.setHours(23, 59, 59, 999);

  return {
    startDate,
    endDate
  };
};
