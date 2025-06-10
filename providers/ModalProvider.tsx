"use client";

import { AddCourseModal } from "@/components/modals/add-course-modal";
import { AddGroupMemberModal } from "@/components/modals/add-group-member-modal";
import { AddGroupModal } from "@/components/modals/add-group-modal";
import { AddFileMessageModal } from "@/components/modals/add-message-file-modal";
import { AddSectionModal } from "@/components/modals/add-section-modal";
import { AddVerificationDocumentsModal } from "@/components/modals/add-verification-documents-modal";
import { AddVerificationNowLaterModal } from "@/components/modals/add-verification-now-later-modal";
import { ImageExpandedModal } from "@/components/modals/images-modal";
import { VerifyDocumentsModal } from "@/components/modals/verify-documents-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  //code for hydrations error
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  //code for hydrations error

  return (
    <>
      <AddSectionModal />
      <AddCourseModal />
      <AddVerificationDocumentsModal />
      <VerifyDocumentsModal />
      <AddVerificationNowLaterModal />
      <AddGroupModal />
      <AddFileMessageModal />
      <ImageExpandedModal />
      <AddGroupMemberModal />
    </>
  );
};
