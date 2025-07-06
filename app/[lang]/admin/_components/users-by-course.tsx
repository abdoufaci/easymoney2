"use client";

import { generateChartConfig } from "@/lib/generate-chart-config";
import { GroupedUserByCourse } from "@/types/types";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  courses: GroupedUserByCourse[];
}

function UsersByCourse({ courses }: Props) {
  const convertedCourses = courses.map((course) => ({
    name: course.englishTitle,
    count: course._count.students,
  }));
  const totalStudents = convertedCourses.reduce(
    (acc, item) => acc + item.count,
    0
  );

  const chartConfig = generateChartConfig(convertedCourses);
  const chartData = [
    Object.assign(
      {},
      ...convertedCourses.map((data) => ({
        [data.name]: data.count,
      }))
    ),
  ];

  return (
    <Card className="bg-transparent rounded-2xl border border-[#343B4F]">
      <CardContent className="">
        <div className=" space-y-2 flex lg:!hidden flex-col items-center justify-center pt-5">
          <h1 className="fill-foreground text-5xl">
            {totalStudents.toLocaleString()}
          </h1>
          <h3 className="fill-muted-foreground text-[#7E89AC] text-lg">
            Courses Enrollement
          </h3>
        </div>
        <ChartContainer
          config={chartConfig}
          className="m-auto w-full hidden lg:!block lg:!max-w-3xl">
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={150}
            outerRadius={190}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        className="space-y-5">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-5xl">
                          {totalStudents.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 16}
                          className="fill-muted-foreground text-[#7E89AC] text-lg">
                          Courses Enrollement
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            {convertedCourses.map((course, idx) => {
              const config = Object.values(chartConfig).find(
                (config) => config.label === course.name
              );
              return (
                <RadialBar
                  key={idx}
                  dataKey={config?.label as string}
                  stackId="a"
                  cornerRadius={5}
                  fill={config?.color}
                  className="stroke-transparent stroke-2"
                />
              );
            })}
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="w-full max-w-lg mx-auto lg:!-mt-44 pt-5 flex flex-col">
        {convertedCourses
          .sort((a, b) => b.count - a.count)
          .map((course, idx) => {
            const config = Object.values(chartConfig).find(
              (config) => config.label === course.name
            );
            return (
              <div
                key={idx}
                className={cn(
                  "flex items-center justify-between w-full py-3",
                  idx !== convertedCourses.length - 1 && "border-b"
                )}>
                <div className="flex items-center gap-4">
                  <div
                    style={{
                      backgroundColor: config?.color,
                    }}
                    className="h-3 w-3 rounded-full"
                  />
                  <h1 className="text-[#AEB9E1] text-sm">{course.name}</h1>
                </div>
                <h1 className="font-medium text-[#D9E1FA]">{course.count}</h1>
              </div>
            );
          })}
      </CardFooter>
    </Card>
  );
}

export default UsersByCourse;
