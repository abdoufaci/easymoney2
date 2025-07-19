"use client";

// components/DirectBunnyUploader.jsx
import React, { useState } from "react";
import axios from "axios"; // Make sure to install: npm install axios
import * as tus from "tus-js-client"; // Make sure to install: npm install tus-js-client
import { createVideosInfos } from "@/backend/mutations/videos/create-video-infos";
import { toast } from "sonner";

export default function DirectBunnyUploader() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false); // New state for overall upload status
  const [tusUpload, setTusUpload] = useState<tus.Upload | null>(null); // To store the tus upload instance

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
    setUploadProgress(0);
    setStatusMessage("");
    setUploadedUrl("");
    setError("");

    if (tusUpload) {
      //@ts-ignore
      tusUpload.abort();
      setTusUpload(null);
    }
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    for (const selectedFile of selectedFiles) {
      if (!selectedFile) {
        setError("Please select a file to upload.");
        return;
      }

      setIsUploading(true);
      setError("");

      try {
        const uploadInfos = await createVideosInfos({
          files: [{ fileName: selectedFile.name, fileType: selectedFile.type }],
        });

        const upload = new tus.Upload(selectedFile, {
          endpoint: "https://video.bunnycdn.com/tusupload",
          retryDelays: [0, 3000, 5000, 10000, 20000],
          //@ts-ignore
          headers: uploadInfos[0].headers,
          metadata: uploadInfos[0].metadata,
          onError: function (tusError) {
            console.log({ tusError });
            setIsUploading(false);
            toast.dismiss("uploadToastId");
            toast.error("Something went wrong .");
          },
          onProgress: function (bytesUploaded, bytesTotal) {
            const percent = Math.round((bytesUploaded / bytesTotal) * 100);
            toast.loading(`Uploading... ${percent}%`, { id: "uploadToastId" });
          },
          onSuccess: function () {
            setStatusMessage("TUS upload complete!");
            setUploadedUrl(uploadInfos[0].publicUrl);
            toast.dismiss("uploadToastId");
            toast.success("Video uploaded successfully!");
            setIsUploading(false);
          },
        });

        upload.start();
        setTusUpload(upload);
      } catch (err) {
        console.error(
          "Direct upload error:",
          //@ts-ignore
          err?.response?.data || err?.message
        );
        toast.error("Something went wrong .");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleCancelUpload = () => {
    if (tusUpload) {
      //@ts-ignore
      tusUpload.abort();
      setTusUpload(null);
      setStatusMessage("Upload cancelled.");
      setIsUploading(false);
      setUploadProgress(0);
    } else {
      setStatusMessage(
        "Upload cannot be cancelled mid-transfer (non-TUS). Resetting state."
      );
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #eee",
        borderRadius: "8px",
        maxWidth: "600px",
        margin: "20px auto",
        fontFamily: "Inter, sans-serif",
      }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        Direct Upload to Bunny.net
      </h2>
      <form
        onSubmit={handleUpload}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="file"
          accept="video/*"
          multiple
          onChange={handleFileChange}
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
        <button
          type="submit"
          disabled={!selectedFiles.length || isUploading}
          style={{
            padding: "12px 20px",
            backgroundColor: isUploading ? "#ccc" : "#FF6600", // Grey out when uploading
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isUploading ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background-color 0.3s ease",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}>
          {isUploading
            ? `Uploading... ${uploadProgress}%`
            : "Upload File Directly"}
        </button>
        {isUploading && (
          <button
            type="button"
            onClick={handleCancelUpload}
            style={{
              padding: "12px 20px",
              backgroundColor: "#dc3545", // Red for cancel
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "background-color 0.3s ease",
              marginTop: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}>
            Cancel Upload
          </button>
        )}
      </form>

      {isUploading && uploadProgress > 0 && uploadProgress < 100 && (
        <div
          style={{
            width: "100%",
            backgroundColor: "#f3f3f3",
            borderRadius: "5px",
            marginTop: "10px",
            overflow: "hidden",
          }}>
          <div
            style={{
              width: `${uploadProgress}%`,
              height: "20px",
              backgroundColor: "#4CAF50",
              borderRadius: "5px",
              textAlign: "center",
              color: "white",
              lineHeight: "20px",
              transition: "width 0.3s ease",
            }}>
            {uploadProgress}%
          </div>
        </div>
      )}
      {error && (
        <p style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
          Error: {error}
        </p>
      )}
      {uploadedUrl && (
        <div
          style={{
            marginTop: "20px",
            borderTop: "1px solid #eee",
            paddingTop: "20px",
          }}>
          <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
            Uploaded URL:
          </p>
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingBottom: "56.25%",
              height: 0,
              marginTop: "10px",
              borderRadius: "5px",
              overflow: "hidden",
            }}>
            <iframe
              src={uploadedUrl}
              title="Bunny.net Video"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
