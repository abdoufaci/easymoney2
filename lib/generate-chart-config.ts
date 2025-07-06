type ChartItem = {
  name: string;
  count: number;
};

type ChartConfig = Record<
  string,
  {
    label: string;
    color: string; // hex code
  }
>;

// Helper to generate random hex color
function getRandomHexColor(
  existing: Set<string>,
  hexList: string[]
): string | null {
  // Filter out already used colors
  const availableColors = hexList.filter((color) => !existing.has(color));

  // If no colors left, return null or throw error
  if (availableColors.length === 0) return null;

  // Pick one at random
  const randomIndex = Math.floor(Math.random() * availableColors.length);
  const color = availableColors[randomIndex];

  existing.add(color);
  return color;
}

// Main function
export function generateChartConfig(data: ChartItem[]): ChartConfig {
  const usedColors = new Set<string>();

  return data.reduce((acc, item) => {
    acc[item.name] = {
      label: item.name,
      color:
        getRandomHexColor(usedColors, [
          "#028CE8",
          "#0A02E8",
          "#0243E8",
          "#02D5E8",
          "#5502E8",
          "#7CAAFB",
          "#00FEF2",
          "#5FBCD6",
          "#9BB0DA",
          "#5848A3",
        ]) ?? "",
    };
    return acc;
  }, {} as ChartConfig);
}
