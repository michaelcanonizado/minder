/**
 * Gets the percentage change between two values
 *
 * @param initialValue Starting Value
 * @param finalValue End Value
 * @returns the percentage change
 */
export const getPercentageChange = (
  initialValue: number,
  finalValue: number
) => {
  const percentageChange = ((finalValue - initialValue) / initialValue) * 100;

  return parseFloat(percentageChange.toFixed(2));
};
