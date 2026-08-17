"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteProductButton({ productId }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        const confirmed = confirm("Delete this product? This can't be undone.");
        if (!confirmed) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/products/${productId}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete product");

            router.push("/");
            router.refresh();
        } catch (err) {
            alert(err.message);
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
        >
            {loading ? "Deleting..." : "Delete Product"}
        </button>
    );
}