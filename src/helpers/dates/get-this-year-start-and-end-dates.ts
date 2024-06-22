export const getThisYearStartAndEndDates = () => {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
  const endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

  return {
    startDate: startDate,
    endDate: endDate
  };
};
