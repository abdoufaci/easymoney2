import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp } from "lucide-react";

interface PercentageBadgeProps {
  percentage: number;
}

export function PercentageBadge({ percentage }: PercentageBadgeProps) {
  return (
    <Badge
      variant={percentage < 0 ? "faile" : "success"}
      className="flex items-center gap-[3px] text-base">
      <h5>{percentage.toFixed(0)}%</h5>
      {percentage < 0 ? (
        <TrendingDown className="h-2.5 w-2.5" />
      ) : (
        <TrendingUp className="h-2.5 w-2.5" />
      )}
    </Badge>
  );
}
