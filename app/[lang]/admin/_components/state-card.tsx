import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PersentageCalculation } from "@/lib/persentage-calculation";
import { PercentageBadge } from "./percentage-badge";
import React from "react";

interface Props {
  thisMonth: number;
  lastMonth: number;
  children: React.ReactNode;
}

function StateCard({ thisMonth, lastMonth, children }: Props) {
  const percentage = PersentageCalculation({
    lastMonth,
    thisMonth,
  });
  return (
    <Card className="w-full rounded-2xl border border-[#343B4F] -space-y-2 ">
      <CardHeader className="pl-6 p-5 pt-4">{children}</CardHeader>
      <CardContent className="flex items-end gap-3">
        <h1 className="font-semibold text-4xl">
          {thisMonth > 1000 ? `${(thisMonth / 100).toFixed(2)} K` : thisMonth}
        </h1>
        <PercentageBadge percentage={percentage} />
      </CardContent>
    </Card>
  );
}

export default StateCard;
