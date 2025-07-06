"use client";

import Dropzone from "@/components/Dropzone";
import EverythingUploader from "@/components/everything-uploader";
import React from "react";

function UploadPage() {
  return (
    <div>
      {/* <EverythingUploader /> */}
      <Dropzone onDrop={() => {}} imageUrl="/upload.svg" />
    </div>
  );
}

export default UploadPage;
