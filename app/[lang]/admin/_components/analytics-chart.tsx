"use client";

import { ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { GroupedChartData } from "@/types/types";

interface Props {
  payments: GroupedChartData[];
}

export default function AnalyticsChart({ payments }: Props) {
  const [year, setYear] = useState(() => new Date().getFullYear());

  const chart = payments?.find((chart: any) => chart.year === year);

  const total = chart?.data.reduce((acc, item) => acc + item.total, 0) ?? 0;

  return (
    <>
      <div className="max-[460px]:flex-col-reverse flex items-center justify-between  px-4 pt-2">
        <div className="max-[460px]:self-start flex flex-col gap-1">
          <h3 className="font-medium text-[#AEB9E1] text-sm">Total revenue</h3>
          <h1 className="font-semibold text-4xl">
            {total > 1000 ? `${(total / 100).toFixed(2)} K` : total} $
          </h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="max-[460px]:self-end flex items-center justify-between w-[100px] rounded-lg border shadow-sm p-2 focus:outline-none">
            {year}
            <ChevronDown className="size-4 text-[#A7ABAF]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="">
            {payments
              .map((item: any) => item.year)
              .map((value: any) => (
                <DropdownMenuItem
                  key={value}
                  onClick={() => {
                    setYear(value);
                  }}
                  className={`hover:cursor-pointer ${
                    year === value && "bg-muted"
                  }`}>
                  {value}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ChartContainer
        config={
          {
            total: {
              label: "Revenue",
            },
          } as ChartConfig
        }
        className="min-h-[200px] w-full p-4 pt-8 pl-0">
        <AreaChart accessibilityLayer data={chart?.data}>
          <defs>
            <linearGradient id="charts" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#1FB4AB" />
              <stop stopColor="#1FB4AB" />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} horizontal />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Area
            dataKey="total"
            stroke="#1FB4AB"
            fillOpacity={0.2}
            fill="url(#charts)"
          />
        </AreaChart>
      </ChartContainer>
    </>
  );
}
