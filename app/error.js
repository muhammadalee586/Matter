"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="max-w-lg mx-auto px-6 py-24 text-center">
            <AlertTriangle size={48} className="mx-auto mb-6 text-red-400" />
            <h1 className="font-display text-3xl mb-2">Something went wrong</h1>
            <p className="text-neutral-500 mb-6">
                An unexpected error occurred. You can try again, or head back home.
            </p>
            <div className="flex items-center justify-center gap-3">
                <button
                    onClick={reset}
                    className="bg-forest text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-forest-light transition-colors"
                >
                    Try again
                </button>
                <Link
                    href="/"
                    className="border border-line px-6 py-3 rounded-lg text-sm font-medium hover:bg-stone transition-colors"
                >
                    Go home
                </Link>
            </div>
        </main>
    );
}