"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";

export default function NewProductPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: "",
    });
    const [images, setImages] = useState([""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleImageChange(index, value) {
        setImages((prev) => prev.map((img, i) => (i === index ? value : img)));
    }

    function addImageField() {
        setImages((prev) => [...prev, ""]);
    }

    function removeImageField(index) {
        setImages((prev) => prev.filter((_, i) => i !== index));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    price: Number(form.price),
                    stock: Number(form.stock),
                    images: images.filter((url) => url.trim() !== ""),
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to create product");
            }

            router.push("/");
            router.refresh();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="max-w-lg mx-auto px-6 py-16">
            <h1 className="font-display text-3xl mb-8">Add Product</h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white border border-line rounded-xl p-6 md:p-8"
            >
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-line rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full border border-line rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Price</label>
                        <input
                            type="number"
                            step="0.01"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            required
                            className="w-full border border-line rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={form.stock}
                            onChange={handleChange}
                            required
                            className="w-full border border-line rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Main Image</label>
                    <ImageUpload
                        value={form.image}
                        onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Additional Images (optional)
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {images.map((url, index) => (
                            <div key={index} className="relative">
                                <ImageUpload
                                    value={url}
                                    onChange={(newUrl) => handleImageChange(index, newUrl)}
                                />
                                {images.length > 1 && !url && (
                                    <button
                                        type="button"
                                        onClick={() => removeImageField(index)}
                                        className="absolute -top-2 -right-2 bg-white border border-line rounded-full p-1 text-xs hover:bg-red-50 hover:text-red-500 transition-colors"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={addImageField}
                        className="text-sm text-forest underline mt-3"
                    >
                        + Add another image
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="w-full border border-line rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors"
                    />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-forest text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-forest-light transition-colors disabled:opacity-50"
                >
                    {loading ? "Adding..." : "Add Product"}
                </button>
            </form>
        </main>
    );
}