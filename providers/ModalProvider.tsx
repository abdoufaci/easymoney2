"use client";

import { AddCourseModal } from "@/components/modals/add-course-modal";
import { AddSectionModal } from "@/components/modals/add-section-modal";
import { AddVerificationDocumentsModal } from "@/components/modals/add-verification-documents-modal";
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
    </>
  );
};
