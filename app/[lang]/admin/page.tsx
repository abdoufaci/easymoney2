import { getGlobalAnalytics } from "@/backend/queries/analytics/get-global-analytics";
import { getPreviousMonthAnalytics } from "@/backend/queries/analytics/get-previous-month-analytics";
import { getThisMonthAnalytics } from "@/backend/queries/analytics/get-this-month-analytics";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import StateCard from "./_components/state-card";
import { CirclePlus, Star, UserRound } from "lucide-react";
import AnalyticsChart from "./_components/analytics-chart";
import UsersByCountry from "./_components/users-by-country";
import UsersByCourse from "./_components/users-by-course";

async function AdminPage() {
  const auth = await currentUser();
  const user = await getUserById(auth?.id || "");

  if (!user?.isActive) {
    redirect("/auth/activate");
  }

  if (user.role === "USER") {
    redirect("/");
  }

  const [thisMonth, lastMonth, global] = await Promise.all([
    getThisMonthAnalytics(),
    getPreviousMonthAnalytics(),
    getGlobalAnalytics(),
  ]);

  return (
    <div className="space-y-7 w-full max-w-screen-2xl mx-auto">
      <div className="space-y-1">
        <h1 className="text-3xl">Welcome back</h1>
        <h3 className="text-sm text-[#AEB9E1]">
          Measure your advertising ROI and report website traffic.
        </h3>
      </div>
      <div className="grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 gap-5">
        <StateCard
          thisMonth={thisMonth.activeUsers}
          lastMonth={lastMonth.activeUsers}>
          <div className="flex items-center gap-2">
            <UserRound className="h-4 w-4 text-[#AEB9E1] fill-[#AEB9E1]" />
            <h1>Monthly users</h1>
          </div>
        </StateCard>
        <StateCard thisMonth={thisMonth.signUps} lastMonth={lastMonth.signUps}>
          <div className="flex items-center gap-2">
            <CirclePlus className="h-4 w-4 fill-[#AEB9E1] text-black" />
            <h1>New sign ups</h1>
          </div>
        </StateCard>
        <StateCard
          thisMonth={thisMonth.students}
          lastMonth={lastMonth.students}>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-[#AEB9E1] fill-[#AEB9E1]" />
            <h1>EM Student</h1>
          </div>
        </StateCard>
      </div>
      <div className="max-[860px]:grid-cols-1 grid grid-cols-8 gap-4">
        <div className="border border-[#343B4F] rounded-2xl min-[860px]:col-span-5 p-5">
          <AnalyticsChart payments={global.groupedPayments} />
        </div>
        <div className="border border-[#343B4F] p-5 rounded-2xl min-[860px]:col-span-3">
          <UsersByCountry users={global.groupedUserByCountries} />
        </div>
      </div>
      <UsersByCourse courses={global.studentsPerCourses} />
    </div>
  );
}

export default AdminPage;
