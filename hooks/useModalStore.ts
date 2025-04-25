import { ExtendedUser } from "@/types/next-auth";
import { CourseWithVideos, SectionWithCourses } from "@/types/types";
import { Prisma, User } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "addSection"
  | "addCourse"
  | "editCourse"
  | "addVerificationDocuments"
  | "verifyDocuments"
  | "verifyNowLater";

interface ModalData {
  dict?: any;
  section?: SectionWithCourses;
  course?: CourseWithVideos;
  user?: User;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, data: {}, isOpen: false }),
}));
