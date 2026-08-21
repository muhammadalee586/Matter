"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

export default function DeleteProductButton({ productId, iconOnly = false }) {
    const router = useRouter();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    async function handleDelete() {
        setShowConfirm(false);
        setLoading(true);
        try {
            const res = await fetch(`/api/products/${productId}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to delete product");
            }

            showToast("Product deleted");
            router.push(iconOnly ? "/admin/products" : "/");
            router.refresh();
        } catch (err) {
            showToast(err.message, "error");
            setLoading(false);
        }
    }

    return (
        <>
            <button
                onClick={() => setShowConfirm(true)}
                disabled={loading}
                className={
                    iconOnly
                        ? "text-neutral-400 hover:text-red-500 disabled:opacity-50 transition-colors"
                        : "flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors"
                }
                aria-label={iconOnly ? "Delete product" : undefined}
            >
                <Trash2 size={iconOnly ? 16 : 16} />
                {!iconOnly && (loading ? "Deleting..." : "Delete Product")}
            </button>

            <ConfirmDialog
                open={showConfirm}
                title="Delete this product?"
                message="This action can't be undone. The product will be permanently removed."
                confirmLabel="Delete"
                onConfirm={handleDelete}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    );
}