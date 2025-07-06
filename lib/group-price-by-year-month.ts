import { months } from "@/constants/months";
import { GroupedChartData } from "@/types/types";

export function groupPriceByYearAndMonth(
  items: { createdAt: Date; price: string }[]
): GroupedChartData[] {
  return items.reduce((acc: GroupedChartData[], item) => {
    const createdAt = new Date(item.createdAt);
    const year = createdAt.getFullYear();
    const month = createdAt.getMonth();

    let yearGroup: GroupedChartData | undefined = acc.find(
      (group) => group.year === year
    );

    if (!yearGroup) {
      yearGroup = {
        year,
        data: months.map((name) => ({ month: name.label, total: 0 })),
      };
      acc.push(yearGroup!);
    }

    yearGroup.data[month].total += Number(item.price);

    return acc;
  }, []);
}
