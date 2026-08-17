"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
        stock: "",
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProduct() {
            try {
                const res = await fetch(`/api/products/${id}`);
                if (!res.ok) throw new Error("Failed to load product");
                const data = await res.json();
                setForm({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    image: data.image,
                    category: data.category,
                    stock: data.stock,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setFetching(false);
            }
        }
        loadProduct();
    }, [id]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    price: Number(form.price),
                    stock: Number(form.stock),
                }),
            });

            if (!res.ok) throw new Error("Failed to update product");

            router.push(`/products/${id}`);
            router.refresh();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    if (fetching) {
        return <p className="max-w-lg mx-auto px-6 py-12">Loading...</p>;
    }

    return (
        <main className="max-w-lg mx-auto px-6 py-12">
            <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-neutral-300 rounded-md px-3 py-2"
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
                        className="w-full border border-neutral-300 rounded-md px-3 py-2"
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
                            className="w-full border border-neutral-300 rounded-md px-3 py-2"
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
                            className="w-full border border-neutral-300 rounded-md px-3 py-2"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        required
                        className="w-full border border-neutral-300 rounded-md px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="w-full border border-neutral-300 rounded-md px-3 py-2"
                    />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </main>
    );
}