"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";

export default function ImageUpload({ value, onChange }) {
    const [uploading, setUploading] = useState(false);

    async function handleFileChange(e) {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        );

        try {
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();

            if (data.secure_url) {
                onChange(data.secure_url);
            }
        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div>
            {value ? (
                <div className="relative w-32 h-32">
                    <img
                        src={value}
                        alt="Uploaded"
                        className="w-full h-full object-cover rounded-md border border-line"
                    />
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="absolute -top-2 -right-2 bg-white border border-line rounded-full p-1 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                        <X size={14} />
                    </button>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-32 h-32 border border-dashed border-line rounded-md cursor-pointer hover:bg-white transition-colors">
                    <Upload size={20} className="text-neutral-400 mb-1" />
                    <span className="text-xs text-neutral-500">
                        {uploading ? "Uploading..." : "Choose file"}
                    </span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={uploading}
                    />
                </label>
            )}
        </div>
    );
}