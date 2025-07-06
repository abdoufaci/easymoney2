"use client";

import React, { useState } from "react";

export default function ImageUploader() {
  const [selectedFiles, setSelectedFile] = useState<File[] | null>(null);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? Array.from(event.target.files) : null);
    setImageUrl([]);
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) {
      setError("Please select an image file to upload.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      for (const file of selectedFiles) {
        formData.append("files", file); // Same name as <input name="videos">
      }

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setImageUrl(data.files.map((file: any) => file.id));
        setSelectedFile(null);
        alert("Image uploaded successfully!");
      } else {
        setError(data.message || "Image upload failed.");
      }
    } catch (err) {
      console.error("Client-side error during image upload:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Image to Bunny.net</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl.length > 0 && (
        <div>
          {imageUrl.map((url, index) => (
            <p key={index}>
              Image URL:{" "}
              <a
                href={`https://${process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME}/${url}`}
                target="_blank"
                rel="noopener noreferrer">
                {url}
              </a>
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
