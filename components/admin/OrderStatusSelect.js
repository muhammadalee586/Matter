"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";

const STATUSES = ["pending", "paid", "shipped", "delivered", "cancelled"];

export default function OrderStatusSelect({ orderId, currentStatus }) {
    const router = useRouter();
    const { showToast } = useToast();
    const [status, setStatus] = useState(currentStatus);
    const [loading, setLoading] = useState(false);

    async function handleChange(e) {
        const newStatus = e.target.value;
        setStatus(newStatus);
        setLoading(true);

        try {
            const res = await fetch(`/api/orders/${orderId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) throw new Error("Failed to update status");

            showToast("Order status updated");
            router.refresh();
        } catch (err) {
            showToast(err.message, "error");
            setStatus(currentStatus);
        } finally {
            setLoading(false);
        }
    }

    return (
        <select
            value={status}
            onChange={handleChange}
            disabled={loading}
            className="text-sm border border-line rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition-colors capitalize disabled:opacity-50"
        >
            {STATUSES.map((s) => (
                <option key={s} value={s} className="capitalize">
                    {s}
                </option>
            ))}
        </select>
    );
}