export function getMonthDates(): {
  currentMonth: { firstDay: Date; lastDay: Date };
  previousMonth: { firstDay: Date; lastDay: Date };
} {
  const now = new Date();

  // Current month
  const firstDayCurrent = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayCurrent = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  // Previous month
  const firstDayPrev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastDayPrev = new Date(now.getFullYear(), now.getMonth(), 0);

  return {
    currentMonth: {
      firstDay: firstDayCurrent,
      lastDay: lastDayCurrent,
    },
    previousMonth: {
      firstDay: firstDayPrev,
      lastDay: lastDayPrev,
    },
  };
}
