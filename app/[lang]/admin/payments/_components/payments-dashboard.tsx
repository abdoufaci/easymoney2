"use client";

import { useState } from "react";
import { Search, Check, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PaymentStatus, User, VerificationStatus } from "@prisma/client";
import { format } from "date-fns";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  CourseWithVideos,
  CourseWithVideosProgress,
  PaymentWithUserWithCourses,
} from "@/types/types";
import { useModal } from "@/hooks/useModalStore";
import AdminSearchFilter from "@/components/admin-search-filter";
import qs from "query-string";
import { truncate } from "@/lib/truncate";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { DateFilter } from "@/components/date-filter";

interface Props {
  currentPage: number;
  dict: any;
  payments: PaymentWithUserWithCourses[];
  totalPayments: number;
  paymentsPerPage: number;
  searchParams: Record<string, string | string[] | undefined>;
  prices: string[];
}

export default function PaymentsDashboard({
  currentPage,
  dict,
  payments,
  paymentsPerPage,
  totalPayments,
  searchParams,
  prices,
}: Props) {
  const router = useRouter();
  const { onOpen } = useModal();

  const totalPages = Math.ceil(totalPayments / paymentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const url = qs.stringifyUrl(
        {
          url: "/admin/payments",
          query: {
            page: currentPage + 1,
            search: searchParams.search,
            dateFrom: searchParams.dateFrom,
            dateTo: searchParams.dateTo,
            price: searchParams.price,
            status: searchParams.status,
          },
        },
        { skipNull: true }
      );
      router.push(url);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const url = qs.stringifyUrl(
        {
          url: "/admin/payments",
          query: {
            page: currentPage === 2 ? null : currentPage - 1,
            search: searchParams.search,
            dateFrom: searchParams.dateFrom,
            dateTo: searchParams.dateTo,
            price: searchParams.price,
            status: searchParams.status,
          },
        },
        { skipNull: true }
      );
      router.push(url);
    }
  };

  return (
    <div className="h-screen bg-sidebar rounded-2xl text-white border border-[#FFFFFF14] p-6">
      <div className="">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:!flex-row md:!items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <h1 className="text-xl font-semibold">Payments</h1>
              <AdminSearchFilter dict={dict} url="/admin/payments" />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Select
                onValueChange={(status) => {
                  const url = qs.stringifyUrl(
                    {
                      url: "/admin/payments",
                      query: {
                        page:
                          searchParams.page === "1" ? null : searchParams.page,
                        search: searchParams.search,
                        dateFrom: searchParams.dateFrom,
                        dateTo: searchParams.dateTo,
                        price: searchParams.price,
                        status: status === "default" ? null : status,
                      },
                    },
                    { skipNull: true }
                  );
                  router.push(url);
                }}>
                <SelectTrigger className="border-[#B9BEC7] w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="border-[#B9BEC7]">
                  <SelectItem value={"default"}>Default</SelectItem>
                  <SelectItem value={PaymentStatus.BOTH}>both</SelectItem>
                  <SelectItem value={PaymentStatus.COURSE}>course</SelectItem>
                  <SelectItem value={PaymentStatus.FOLLOWUP}>
                    follow up
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(price) => {
                  const url = qs.stringifyUrl(
                    {
                      url: "/admin/payments",
                      query: {
                        page:
                          searchParams.page === "1" ? null : searchParams.page,
                        search: searchParams.search,
                        dateFrom: searchParams.dateFrom,
                        dateTo: searchParams.dateTo,
                        price: price === "default" ? null : price,
                      },
                    },
                    { skipNull: true }
                  );
                  router.push(url);
                }}>
                <SelectTrigger className="border-[#B9BEC7] w-32">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent className="border-[#B9BEC7]">
                  <SelectItem value={"default"}>Default</SelectItem>
                  {prices.map((price) => (
                    <SelectItem key={price} value={price}>
                      {price} $
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <DateFilter url="/admin/payments" />
            </div>
          </div>
          <div className="rounded-md  overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-transparent">
                  <TableHead className="text-gray-400 font-normal">
                    Payment ID
                  </TableHead>
                  <TableHead className="text-gray-400 font-normal">
                    User
                  </TableHead>
                  <TableHead className="text-gray-400 font-normal">
                    Type
                  </TableHead>
                  <TableHead className="text-gray-400 font-normal">
                    Price
                  </TableHead>
                  <TableHead className="text-gray-400 font-normal">
                    N°Courses
                  </TableHead>
                  <TableHead className="text-gray-400 font-normal">
                    Courses
                  </TableHead>
                  <TableHead className="text-gray-400 font-normal">
                    Date & Time
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow
                    key={payment.id}
                    className="border-gray-800 hover:50 cursor-pointer">
                    <TableCell>{payment.paymentId}</TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            //@ts-ignore
                            src={
                              //@ts-ignore
                              payment?.user?.image?.id
                                ? `https://${
                                    process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME
                                  }/${
                                    //@ts-ignore
                                    payment.user?.image.id
                                  }`
                                : payment?.user?.image || ""
                            }
                            alt={payment?.user?.name || ""}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-gray-700">
                            {payment?.user?.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                          <span className="text-xs">
                            {payment?.user?.studentNumber}
                          </span>
                          <span>{payment?.user?.name}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{payment?.status}</TableCell>
                    <TableCell>{payment?.price} $</TableCell>
                    <TableCell>
                      {payment.status !== "FOLLOWUP"
                        ? payment.courses.length
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {payment.status !== "FOLLOWUP" ? (
                        <HoverCard>
                          <HoverCardTrigger>
                            <Button variant={"link"} className="!p-0">
                              {truncate(payment.courses[0].englishTitle, 10)}
                              {payment.courses[0].englishTitle.length < 10 &&
                                payment.courses.length > 1 &&
                                "..."}
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="p-0 rounded-md w-fit bg-[#FFFFFF47] backdrop-blur-xl">
                            {payment.courses.map((course, idx) => (
                              <div
                                key={course.id}
                                className={cn(
                                  "p-3",
                                  idx !== payment.courses.length - 1 &&
                                    "border-[#D9D9D954] border-b"
                                )}>
                                {course.englishTitle}
                              </div>
                            ))}
                          </HoverCardContent>
                        </HoverCard>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      {format(payment?.createdAt || new Date(), "dd/MM/yyyy")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col md:!flex-row md:!items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              Showing {(currentPage - 1) * paymentsPerPage + 1} to{" "}
              {Math.min(currentPage * paymentsPerPage, totalPayments)} of{" "}
              {totalPayments} entries
            </div>
            <div className="flex flex-wrap items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="border-[#B9BEC7] hover:bg-gray-800">
                Previous
              </Button>
              {Array.from(Array(totalPages).keys()).map((_, idx) => {
                const url = qs.stringifyUrl(
                  {
                    url: "/admin/payments",
                    query: {
                      page: currentPage + 1,
                      search: searchParams.search,
                      dateFrom: searchParams.dateFrom,
                      dateTo: searchParams.dateTo,
                      price: searchParams.price,
                      status: searchParams.status,
                    },
                  },
                  { skipNull: true }
                );
                return (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "",
                      idx + 1 === currentPage
                        ? "bg-teal-600 border-teal-600 hover:bg-teal-700"
                        : "border-[#B9BEC7] hover:bg-gray-800"
                    )}
                    asChild>
                    <Link href={url}>{idx + 1}</Link>
                  </Button>
                );
              })}
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="border-[#B9BEC7] hover:bg-gray-800">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
