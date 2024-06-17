export const getPercentageChange = (
  initialValue: number,
  finalValue: number
) => {
  const percentageChange = ((finalValue - initialValue) / initialValue) * 100;

  return parseFloat(percentageChange.toFixed(2));
};
