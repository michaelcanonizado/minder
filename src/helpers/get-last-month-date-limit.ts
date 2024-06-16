export const getLastMonthDateLimit = () => {
  // Create a new date object for the current date
  const currentDate = new Date();

  // Move to the first day of the current month
  const firstDayOfCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  // Move back one day to get the last day of the previous month
  firstDayOfCurrentMonth.setDate(firstDayOfCurrentMonth.getDate() - 1);

  // Set the time to 11:59 PM on that day
  firstDayOfCurrentMonth.setHours(23, 59, 59, 999);

  return firstDayOfCurrentMonth;
};
