import { ExtendedUser } from "@/types/next-auth";
import {
  CourseWithVideos,
  GroupWithMembersWithMessages,
  SectionWithCourses,
  SectionWithCourseWithVideosProgress,
} from "@/types/types";
import { Prisma, User } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "addSection"
  | "addCourse"
  | "editCourse"
  | "addVerificationDocuments"
  | "verifyDocuments"
  | "verifyNowLater"
  | "addGroup"
  | "addFileMessage"
  | "addChatFileMessage"
  | "addDirectChatFileMessage"
  | "imageExpanded"
  | "addGroupMember"
  | "checkoutCart"
  | "addTestemonyGroup"
  | "addTestimony"
  | "editStudent"
  | "deleteStudent";

interface ModalData {
  dict?: any;
  section?: SectionWithCourses;
  course?: CourseWithVideos;
  user?: User | ExtendedUser;
  groupId?: string;
  image?: string;
  students?: User[];
  group?: GroupWithMembersWithMessages | null;
  cartSection?: SectionWithCourseWithVideosProgress;
  isUploadthing?: boolean;
  isVerify?: boolean;
  isEdit?: boolean;
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
