import { ExtendedUser } from "@/types/next-auth";
import { CourseWithVideos, SectionWithCourses } from "@/types/types";
import { Prisma } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "addSection"
  | "addCourse"
  | "editCourse"
  | "addVerificationDocuments"
  | "verifyDocuments";

interface ModalData {
  dict?: any;
  section?: SectionWithCourses;
  course?: CourseWithVideos;
  user?: ExtendedUser;
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
