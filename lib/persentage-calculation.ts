export const PersentageCalculation = ({
  thisMonth = 0,
  lastMonth = 0,
}: {
  thisMonth?: number;
  lastMonth?: number;
}) => {
  const diffrence = thisMonth - lastMonth;

  const percentage =
    lastMonth === 0 ? diffrence * 100 : (diffrence * 100) / lastMonth;

  return percentage;
};
