"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { GroupedUserByCountries } from "@/types/types";

interface Props {
  users: GroupedUserByCountries[];
}

function UsersByCountry({ users }: Props) {
  const total = users.reduce((acc, item) => acc + item._count, 0) ?? 0;

  return (
    <div className="space-y-7">
      <div className="space-y-2">
        <h3 className="text-lg">Users by country</h3>
        <h1 className="font-semibold text-5xl">
          {total > 1000 ? `${(total / 100).toFixed(2)} K` : total}
        </h1>
      </div>
      <div>
        {users
          .sort((a, b) => b._count - a._count)
          .map((student, idx) => {
            const percentage = ((student._count * 100) / total).toFixed(0);
            return (
              <div
                key={idx}
                className="flex flex-col items-start gap-1 w-full p-3">
                <h1 className="text-[#AEB9E1] text-lg">{student.country}</h1>
                <div className="flex items-center gap-3 w-full">
                  <Progress
                    value={Number(percentage)}
                    className={cn("h-1.5 bg-[#0B1739] w-full flex-1")}
                    indicatorColor={
                      idx === 0
                        ? "bg-[#1FB4AB]"
                        : idx === 1
                        ? "bg-[#9A91FB]"
                        : idx === 2
                        ? "bg-[#00C2FF]"
                        : "bg-[#D9E1FA]"
                    }
                  />
                  <h1 className={cn("font-medium text-[#AEB9E1]")}>
                    {percentage} %
                  </h1>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default UsersByCountry;
