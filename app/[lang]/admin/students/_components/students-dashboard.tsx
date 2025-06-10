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
import { User } from "@prisma/client";
import { format } from "date-fns";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import StudentDetails from "./student-details";
import { CourseWithVideos, CourseWithVideosProgress } from "@/types/types";
import { useModal } from "@/hooks/useModalStore";
import StudentSearch from "./student-search";

interface Props {
  currentPage: number;
  dict: any;
  students: User[];
  totalStudents: number;
  studentsPerPage: number;
  courses: CourseWithVideosProgress[];
  search: string | string[] | undefined;
}

export default function StudentDashboard({
  currentPage,
  dict,
  students,
  studentsPerPage,
  totalStudents,
  courses,
  search,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { onOpen } = useModal();

  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      router.push(
        `${pathname}?page=${currentPage + 1}${
          search ? `&search=${search}` : ""
        }`
      );
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      router.push(
        `${pathname}?page=${currentPage - 1}${
          search ? `&search=${search}` : ""
        }`
      );
    }
  };

  return (
    <div className="h-screen bg-sidebar rounded-2xl text-white border border-[#FFFFFF14] p-6">
      <div className="">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:!flex-row md:!items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <h1 className="text-xl font-semibold">Student</h1>
              <StudentSearch dict={dict} />
            </div>
            {/* <div className="flex flex-wrap items-center gap-4">
              <Select>
                <SelectTrigger className="border-[#B9BEC7] w-28">
                  <SelectValue placeholder="Show" />
                </SelectTrigger>
                <SelectContent className="border-[#B9BEC7]">
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="border-[#B9BEC7] w-28">
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent className="border-[#B9BEC7]">
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="web">Web Development</SelectItem>
                  <SelectItem value="design">UI/UX Design</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="border-[#B9BEC7] w-32">
                  <SelectValue placeholder="Date of Birth" />
                </SelectTrigger>
                <SelectContent className="border-[#B9BEC7]">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="2000-2005">2000-2005</SelectItem>
                  <SelectItem value="1995-2000">1995-2000</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="border-[#B9BEC7] w-28">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="border-[#B9BEC7]">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="not-verified">Not Verified</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
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
                                src={
                                  //@ts-ignore
                                  student?.image?.url || student?.image || ""
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
              {Array.from(Array(totalPages).keys()).map((_, idx) => (
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
                  <Link
                    href={`${pathname}?page=${idx + 1}${
                      search ? `&search=${search}` : ""
                    }`}>
                    {idx + 1}
                  </Link>
                </Button>
              ))}
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
