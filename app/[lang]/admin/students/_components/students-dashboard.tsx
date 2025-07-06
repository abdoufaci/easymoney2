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
import { User, VerificationStatus } from "@prisma/client";
import { format } from "date-fns";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import StudentDetails from "./student-details";
import { CourseWithVideos, CourseWithVideosProgress } from "@/types/types";
import { useModal } from "@/hooks/useModalStore";
import AdminSearchFilter from "@/components/admin-search-filter";
import qs from "query-string";
import { StudentJoinDate } from "./student-join-date";
import { StudentDateOfBirth } from "./student-date-of-birth";

interface Props {
  currentPage: number;
  dict: any;
  students: User[];
  totalStudents: number;
  studentsPerPage: number;
  courses: CourseWithVideosProgress[];
  searchParams: Record<string, string | string[] | undefined>;
  countries: string[];
}

export default function StudentDashboard({
  currentPage,
  dict,
  students,
  studentsPerPage,
  totalStudents,
  courses,
  searchParams,
  countries,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { onOpen } = useModal();

  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const url = qs.stringifyUrl(
        {
          url: "/admin/students",
          query: {
            page: currentPage + 1,
            search: searchParams.search,
            joinDateFrom: searchParams.joinDateFrom,
            joinDateTo: searchParams.joinDateTo,
            dateOfBirthFrom: searchParams.dateOfBirthFrom,
            dateOfBirthTo: searchParams.dateOfBirthTo,
            status: searchParams.status,
            country: searchParams.country,
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
          url: "/admin/students",
          query: {
            page: currentPage === 2 ? null : currentPage - 1,
            search: searchParams.search,
            joinDateFrom: searchParams.joinDateFrom,
            joinDateTo: searchParams.joinDateTo,
            dateOfBirthFrom: searchParams.dateOfBirthFrom,
            dateOfBirthTo: searchParams.dateOfBirthTo,
            status: searchParams.status,
            country: searchParams.country,
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
              <h1 className="text-xl font-semibold">Student</h1>
              <AdminSearchFilter dict={dict} url="/admin/students" />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <StudentJoinDate />
              <StudentDateOfBirth />
              <Select
                onValueChange={(country) => {
                  const url = qs.stringifyUrl(
                    {
                      url: "/admin/students",
                      query: {
                        page:
                          searchParams.page === "1" ? null : searchParams.page,
                        search: searchParams.search,
                        joinDateFrom: searchParams.joinDateFrom,
                        joinDateTo: searchParams.joinDateTo,
                        dateOfBirthFrom: searchParams.dateOfBirthFrom,
                        dateOfBirthTo: searchParams.dateOfBirthTo,
                        status: searchParams.status,
                        country: country === "default" ? null : country,
                      },
                    },
                    { skipNull: true }
                  );
                  router.push(url);
                }}>
                <SelectTrigger className="border-[#B9BEC7] w-32 placeholder:text-white text-white">
                  <SelectValue
                    placeholder="Country"
                    className="text-white placeholder:text-white"
                  />
                </SelectTrigger>
                <SelectContent className="border-[#B9BEC7]">
                  <SelectItem value={"default"}>Default</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                onValueChange={(status) => {
                  const url = qs.stringifyUrl(
                    {
                      url: "/admin/students",
                      query: {
                        page:
                          searchParams.page === "1" ? null : searchParams.page,
                        search: searchParams.search,
                        joinDateFrom: searchParams.joinDateFrom,
                        joinDateTo: searchParams.joinDateTo,
                        dateOfBirthFrom: searchParams.dateOfBirthFrom,
                        dateOfBirthTo: searchParams.dateOfBirthTo,
                        country: searchParams.country,
                        status: status === "default" ? null : status,
                      },
                    },
                    { skipNull: true }
                  );
                  router.push(url);
                }}>
                <SelectTrigger className="border-[#B9BEC7] w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="border-[#B9BEC7]">
                  <SelectItem value={"default"}>Default</SelectItem>
                  <SelectItem value={VerificationStatus.VERIFIED}>
                    Verified
                  </SelectItem>
                  <SelectItem value={VerificationStatus.NOT_VERIFIED}>
                    Not verified
                  </SelectItem>
                  <SelectItem value={VerificationStatus.PENDING}>
                    Pending
                  </SelectItem>
                  <SelectItem value={VerificationStatus.REJECTED}>
                    Rejected
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="rounded-md  overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-transparent">
                  <TableHead className="text-gray-400 font-normal">
                    {dict.general.name}
                  </TableHead>
                  <TableHead className="text-gray-400 font-normal">
                    Email
                  </TableHead>
                  <TableHead className="text-gray-400 font-normal">
                    {dict.general.phoneNumber}
                  </TableHead>
                  <TableHead className="text-gray-400 font-normal">
                    {dict.general.JoinDate}
                  </TableHead>
                  <TableHead className="text-gray-400 font-normal">
                    {dict.general.country}
                  </TableHead>
                  <TableHead className="text-gray-400 font-normal">
                    {dict.general.dateOfBirth}
                  </TableHead>
                  <TableHead className="text-gray-400 font-normal">
                    {dict.general.status}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <Sheet key={student.id}>
                    <SheetTrigger asChild>
                      <TableRow
                        key={student.id}
                        className="border-gray-800 hover:50 cursor-pointer">
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage
                                //@ts-ignore
                                src={
                                  //@ts-ignore
                                  student?.image?.id
                                    ? `https://${
                                        process.env
                                          .NEXT_PUBLIC_BUNNY_CDN_HOSTNAME
                                      }/${
                                        //@ts-ignore
                                        student.image.id
                                      }`
                                    : student?.image || ""
                                }
                                alt={student.name || ""}
                                className="object-cover"
                              />
                              <AvatarFallback className="bg-gray-700">
                                {student.name?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell>
                          {format(student.createdAt, "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell>{student.country}</TableCell>
                        <TableCell>
                          {format(
                            student?.dateOfBirth || new Date(),
                            "dd/MM/yyyy"
                          )}
                        </TableCell>
                        <TableCell>
                          {student.VerificationStatus === "VERIFIED" ? (
                            <Badge
                              className="bg-brand/20 text-brand hover:bg-brand/30 hover:text-brand 
                            py-2 px-3 rounded-full flex items-center gap-2 text-xs">
                              <BadgeCheck className="w-4 h-4" />
                              <h1>Verified</h1>
                            </Badge>
                          ) : student.VerificationStatus === "PENDING" ? (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                onOpen("verifyDocuments", {
                                  user: student,
                                  dict,
                                });
                              }}
                              variant={"brand"}
                              size={"sm"}
                              className="rounded-full w-full">
                              Verify
                            </Button>
                          ) : student.VerificationStatus === "REJECTED" ? (
                            <Badge
                              className="bg-[#F63F4B1F] text-[#F63F4B] hover:bg-[#F63F4B1F] hover:text-[#F63F4B]
                            py-2 px-3 rounded-full flex items-center gap-2 text-xs">
                              <BadgeCheck className="w-4 h-4" />
                              <h1>Rejected</h1>
                            </Badge>
                          ) : (
                            <Badge
                              className="bg-[#BCBDBD1A] text-[#BCBDBD] hover:bg-[#BCBDBD1A] hover:text-[#BCBDBD] 
                            py-2 px-3 rounded-full flex items-center gap-2 text-xs">
                              <h1>Not Verified</h1>
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    </SheetTrigger>
                    <SheetContent>
                      <StudentDetails
                        student={student}
                        dict={dict}
                        courses={courses}
                      />
                    </SheetContent>
                  </Sheet>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col md:!flex-row md:!items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              Showing {(currentPage - 1) * studentsPerPage + 1} to{" "}
              {Math.min(currentPage * studentsPerPage, totalStudents)} of{" "}
              {totalStudents} entries
            </div>
            <div className="flex items-center space-x-2">
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
                    url: "/admin/students",
                    query: {
                      page: idx + 1,
                      search: searchParams.search,
                      joinDateFrom: searchParams.joinDateFrom,
                      joinDateTo: searchParams.joinDateTo,
                      dateOfBirthFrom: searchParams.dateOfBirthFrom,
                      dateOfBirthTo: searchParams.dateOfBirthTo,
                      status: searchParams.status,
                      country: searchParams.country,
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
