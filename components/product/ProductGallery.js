"use client";

import { useState } from "react";

export default function ProductGallery({ mainImage, images = [], name }) {
    const allImages = [mainImage, ...images.map((img) => img.url)];
    const [selected, setSelected] = useState(allImages[0]);

    return (
        <div>
            <div className="aspect-square bg-white border border-line rounded-xl overflow-hidden mb-3">
                <img
                    src={selected}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>

            {allImages.length > 1 && (
                <div className="flex gap-2">
                    {allImages.map((url, index) => (
                        <button
                            key={index}
                            onClick={() => setSelected(url)}
                            className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${selected === url ? "border-forest" : "border-line"
                                }`}
                        >
                            <img
                                src={url}
                                alt={`${name} ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}