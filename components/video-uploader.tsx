"use client";

import MuxPlayer from "@mux/mux-player-react";
import React, { useState } from "react";

export default function VideoUploader() {
  const [selectedFile, setSelectedFile] = useState<File[] | null>(null);
  const [videoUrl, setVideoUrl] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? Array.from(event.target.files) : null);
    setVideoUrl([]);
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile || selectedFile.length === 0) {
      setError("Please select a video file to upload.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      selectedFile.forEach((file) => {
        formData.append("videoFile", file);
      });

      const response = await fetch("/api/upload-video", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setVideoUrl(data.files.map((file: any) => file.id));
        alert("Video uploaded successfully!");
      } else {
        setError(data.message || "Video upload failed.");
      }
    } catch (err) {
      console.error("Client-side error during video upload:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Video to Bunny.net</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="video/*"
          multiple
          onChange={handleFileChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {videoUrl.length > 0 && (
        <div>
          {videoUrl.map((url, index) => (
            <p key={index}>
              Video URL:{" "}
              <iframe
                src={`https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_BUNNY_STREAM_LIBRARY_ID}/${url}`}
                width="640"
                height="360"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
                className="aspect-video"></iframe>
            </p>
          ))}
          {/* <img
            src={imageUrl}
            alt="Uploaded"
            style={{ maxWidth: "300px", maxHeight: "300px" }}
          /> */}
        </div>
      )}
    </div>
  );
}
