export const getThisYearStartAndEndDates = () => {
  const now = new Date();
  // Start will be @ January 1, 12:00:00AM
  const startDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
  // Start will be @ December 31, 11:59:99PM
  const endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

  return {
    startDate: startDate,
    endDate: endDate
  };
};
