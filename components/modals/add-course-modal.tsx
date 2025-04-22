"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import { AddSectionForm } from "../forms/add-section-form";
import { AddCourseForm } from "../forms/add-course-form";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export const AddCourseModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const course = data?.course;
  const [isActive, setIsActive] = useState(course?.isActive || false);

  useEffect(() => {
    if (course) {
      setIsActive(course.isActive);
    }
  }, [course]);

  const isModalOpen = isOpen && (type === "addCourse" || type === "editCourse");

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent
        overlayClassName="bg-black/60 dialogBlur"
        className="bg-gradient-to-b from-[#40414F]/30 to-[#1B1B1F]/30 dialogContentBlur w-full max-w-3xl ">
        <DialogHeader className="py-2">
          <div className="flex items-center gap-4 w-full">
            <DialogTitle className="text-xl font-semibold text-left">
              Adding Course
            </DialogTitle>
            {type === "editCourse" && course && (
              <Button
                onClick={() => setIsActive(!isActive)}
                variant={isActive ? "active" : "hidden"}
                className="rounded-full p-0 px-4 h-6"
                size={"sm"}>
                {isActive ? "Active" : "Hidden"}
              </Button>
            )}
          </div>
        </DialogHeader>
        <ScrollArea className="h-[500px]">
          <AddCourseForm isActive={isActive} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
