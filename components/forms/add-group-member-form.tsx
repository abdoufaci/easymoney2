"use client";

import { useAllStudentsQuery } from "@/hooks/use-all-students-query";
import { Loader2, Search } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Input } from "../ui/input";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { useModal } from "@/hooks/useModalStore";
import { Button } from "../ui/button";
import { updateGroupMembers } from "@/backend/mutations/chat/update-group-members";
import { toast } from "sonner";

function AddGroupMemberForm() {
  const { data: modalData, onClose } = useModal();
  const { group } = modalData;

  const { data, isPending, refetch } = useAllStudentsQuery();

  const [transitionPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<User[]>([]);
  const [studentsToAdd, setStudentsToAdd] = useState<User[]>([]);
  const [studentsToRemove, setStudentsToRemove] = useState<User[]>([]);

  useEffect(() => {
    if (data) {
      setStudents(data?.students || []);
    }
  }, [data]);

  useEffect(() => {
    setStudents((prev) =>
      data?.students.filter(
        (item: User) =>
          item.name
            ?.trim()
            .toLocaleLowerCase()
            .includes(searchTerm.trim().toLowerCase()) ||
          item.studentNumber?.trim().includes(searchTerm.trim())
      )
    );
  }, [searchTerm]);

  const onSaveChanges = () => {
    startTransition(async () => {
      updateGroupMembers({
        groupId: group?.id || "",
        studentsToAdd,
        studentsToRemove,
      })
        .then(() => {
          toast.success("Members updated !");
          refetch();
          onClose();
        })
        .catch(() => toast.error("Something went wrong, try again ."));
    });
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full">
        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#B9BEC7] h-4 w-4" />
        <Input
          className="pl-12 border-[#B9BEC7] rounded-full w-full text-sm py-5"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.currentTarget.value);
          }}
        />
      </div>
      {isPending ? (
        <div className="w-full flex items-center justify-center">
          <Loader2 className="text-brand animate-spin h-10 w-10" />
        </div>
      ) : (
        <ScrollArea className="h-[350px]">
          <div className="space-y-1">
            {students?.map((student, idx) => {
              const isChecked =
                (!!group?.members.find((member) => member.id === student.id) ||
                  !!studentsToAdd.find((member) => member.id === student.id)) &&
                !studentsToRemove.find((member) => member.id === student.id);
              return (
                <div
                  key={student.id}
                  className={cn(
                    "pb-1",
                    idx !== students.length - 1 && "border-b"
                  )}>
                  <div
                    onClick={() => {
                      if (isChecked) {
                        if (
                          !!group?.members.find(
                            (item) => item.id === student.id
                          )
                        ) {
                          setStudentsToRemove((prev) => [...prev, student]);
                        }
                        setStudentsToAdd((prev) =>
                          prev.filter((item) => item.id !== student.id)
                        );
                      } else {
                        setStudentsToRemove((prev) =>
                          prev.filter((item) => item.id !== student.id)
                        );
                        if (
                          !group?.members.find((item) => item.id === student.id)
                        ) {
                          setStudentsToAdd((prev) => [...prev, student]);
                        }
                      }
                    }}
                    className={cn(
                      "flex items-center justify-between w-full hover:bg-[#1FB4AB0F] cursor-pointer rounded-full p-4",
                      isChecked && "bg-[#1FB4AB0F]"
                    )}>
                    <div className="flex items-start gap-3 ">
                      <Avatar className="border-2 border-[#1FB4AB70] h-12 w-12">
                        <AvatarImage
                          src={
                            //@ts-ignore
                            student?.image?.url || student.image || ""
                          }
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-brand/10 cursor-pointer">
                          {student?.name?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <h3 className="text-sm ">{student.studentNumber}</h3>
                        <h1 className="font-medium">{student.name}</h1>
                      </div>
                    </div>
                    <Checkbox
                      className="rounded-full h-7 w-7 data-[state=checked]:bg-brand data-[state=checked]:text-white data-[state=checked]:border-brand"
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          if (
                            !!group?.members.find(
                              (item) => item.id === student.id
                            )
                          ) {
                            setStudentsToRemove((prev) => [...prev, student]);
                          }
                          setStudentsToAdd((prev) =>
                            prev.filter((item) => item.id !== student.id)
                          );
                        } else {
                          setStudentsToRemove((prev) =>
                            prev.filter((item) => item.id !== student.id)
                          );
                          setStudentsToAdd((prev) => [...prev, student]);
                        }
                        return true;
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      )}
      <Button
        disabled={
          transitionPending ||
          (!studentsToAdd.length && !studentsToRemove.length)
        }
        onClick={onSaveChanges}
        variant={"white"}
        size={"lg"}
        className="w-full rounded-full">
        Save changes
      </Button>
    </div>
  );
}

export default AddGroupMemberForm;
